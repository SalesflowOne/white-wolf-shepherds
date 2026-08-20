import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NativeCalendarPicker from "@/components/NativeCalendarPicker";
import ApplicationForm, {
  emptyApplicationValues,
  fetchAvailablePuppies,
  validateApplication,
  type ApplicationFormValues,
  type AvailablePuppy,
} from "@/components/funnel/ApplicationForm";
import {
  getLeadProgress,
  persistFunnelState,
  readFunnelState,
  saveApplicationDraft,
  submitApplicationDetails,
} from "@/lib/wws-funnel";
import { confirmAndTrackDeposit } from "@/lib/deposit-tracking";

const RESERVATION_LINK = import.meta.env.VITE_PUBLIC_STRIPE_RESERVATION_LINK as string | undefined;
const TOTAL_STEPS = 3;

export const Route = createFileRoute("/portal/onboarding")({
  component: OnboardingPage,
  head: () => ({
    meta: [{ title: "Complete Your Application — White Wolf Shepherds" }],
  }),
});

function stepFromStage(stage: string | null): number {
  if (!stage || stage === "new_inquiry") return 1;
  if (stage === "match_call_booked") return 2;
  if (stage === "application_complete") return 3;
  if (["under_review", "placement_approved", "deposit_paid", "reserved"].includes(stage ?? ""))
    return 4;
  return 1;
}

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [puppies, setPuppies] = useState<AvailablePuppy[]>([]);
  const [appValues, setAppValues] = useState<ApplicationFormValues>(emptyApplicationValues());
  const [appErrors, setAppErrors] = useState<string[]>([]);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const patchApp = useCallback((patch: Partial<ApplicationFormValues>) => {
    setAppValues((prev) => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => {
    fetchAvailablePuppies().then(setPuppies);
  }, []);

  useEffect(() => {
    async function init() {
      const stored = readFunnelState();
      if (!stored?.leadId) {
        navigate({ to: "/apply" });
        return;
      }
      setLeadId(stored.leadId);
      setContact({ name: stored.name, email: stored.email, phone: stored.phone });

      try {
        const { lead } = await getLeadProgress({ leadId: stored.leadId });
        const draft = lead.application_draft as Partial<ApplicationFormValues> | null;
        if (draft) setAppValues((prev) => ({ ...prev, ...draft }));
        setStep(stepFromStage(lead.stage));
        if (lead.deposit_status === "paid") {
          void confirmAndTrackDeposit();
        }
      } catch {
        setStep(1);
      }
    }
    init();
  }, [navigate]);

  // Autosave draft every 3s after changes
  useEffect(() => {
    if (!leadId || step !== 2) return;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      saveApplicationDraft({ leadId, draft: appValues }).catch(() => {});
    }, 3000);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [appValues, leadId, step]);

  async function sendMagicLink() {
    if (!contact.email) return;
    const redirectTo = `${window.location.origin}/portal/onboarding`;
    const { error } = await supabase.auth.signInWithOtp({
      email: contact.email.toLowerCase(),
      options: { emailRedirectTo: redirectTo },
    });
    if (!error) setMagicLinkSent(true);
  }

  useEffect(() => {
    sendMagicLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact.email]);

  function depositHref(): string {
    if (!RESERVATION_LINK || !leadId) return "#";
    try {
      const url = new URL(RESERVATION_LINK);
      url.searchParams.set("client_reference_id", leadId);
      if (contact.email) url.searchParams.set("prefilled_email", contact.email.toLowerCase());
      return url.toString();
    } catch {
      return RESERVATION_LINK;
    }
  }

  async function handleApplicationSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateApplication(appValues);
    if (errs.length) {
      setAppErrors(errs);
      return;
    }
    if (!leadId) return;
    setBusy(true);
    try {
      await submitApplicationDetails({
        leadId,
        preferredSex: appValues.preferredSex,
        timeline: appValues.timeline as "ready_now" | "1_3_months" | "future",
        hasOwnedLargeDog: appValues.hasOwnedLargeDog === "yes",
        readyForDeposit: appValues.readyForDeposit as "yes" | "no" | "info",
        householdType: appValues.householdType,
        hasFencedYard: appValues.hasFencedYard as "yes" | "no" | "in_progress",
        familySize: typeof appValues.familySize === "number" ? appValues.familySize : 1,
        childrenAges: appValues.childrenAges.trim() || null,
        otherPets: appValues.otherPets.trim() || null,
        preferredPuppyId: appValues.preferredPuppyId || null,
        reasonForBreed: appValues.reasonForBreed.trim(),
        additionalNotes: appValues.additionalNotes.trim() || null,
        source: appValues.source,
      });
      setStep(3);
      window.scrollTo(0, 0);
    } catch (err) {
      setAppErrors([err instanceof Error ? err.message : "Submission failed"]);
    } finally {
      setBusy(false);
    }
  }

  const stepTitle =
    step === 1
      ? "Book Your Family Fit Call"
      : step === 2
        ? "Your Application"
        : step === 3
          ? "Reserve Your Spot"
          : "You're all set";

  const stepSubtitle =
    step === 1
      ? "A short, friendly call so we can get to know you and answer your questions."
      : step === 2
        ? "Tell us about your home — your progress saves automatically."
        : step === 3
          ? "Place your $500 deposit to hold your spot. Refundable if not approved; non-refundable once approved."
          : "We'll review your application within 24–48 hours.";

  if (step === 4) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="bg-gradient-frost pt-28 pb-20 lg:pt-36">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground">Deposit received</h1>
            <p className="mt-3 text-muted-foreground">
              Your application is under review. We'll notify you by email once we've made a
              decision.
            </p>
            <Link
              to="/portal/me"
              className="mt-8 inline-block rounded-xl bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground"
            >
              Go to My Portal →
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-frost pt-28 pb-20 lg:pt-36">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
              {stepTitle}
            </h1>
            <p className="mt-3 text-muted-foreground">{stepSubtitle}</p>
            {magicLinkSent && (
              <p className="mt-2 text-xs text-accent">
                We sent a magic link to {contact.email} — use it anytime to return to your portal.
              </p>
            )}
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-accent">
                Step {step} of {TOTAL_STEPS}
              </span>
              <span className="text-muted-foreground">
                {step === 1 ? "Family Fit Call" : step === 2 ? "Application" : "Deposit"}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-card p-8 shadow-card sm:p-10">
            {step === 1 && leadId && (
              <NativeCalendarPicker
                calendarType="family_fit"
                leadId={leadId}
                name={contact.name}
                email={contact.email}
                phone={contact.phone}
                title="Family Fit Call — pick a time"
                onBooked={() => {
                  setStep(2);
                  window.scrollTo(0, 0);
                }}
              />
            )}

            {step === 2 && (
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <ApplicationForm
                  values={appValues}
                  onChange={patchApp}
                  puppies={puppies}
                  errors={appErrors}
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground disabled:opacity-50"
                >
                  {busy ? "Submitting..." : "Submit Application →"}
                </button>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center">
                <p className="text-muted-foreground">
                  Your{" "}
                  <span className="font-semibold text-foreground">$500 deposit is refundable</span>{" "}
                  if we aren't able to approve you for placement. Once approved, your deposit locks
                  in and adoption begins.
                </p>
                <ul className="mx-auto max-w-sm space-y-2 text-left text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span> Refundable if not approved
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span> Holds your spot while we review
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span> Unlocks your Meet the Puppies call after
                    approval
                  </li>
                </ul>
                <a
                  href={depositHref()}
                  className="block w-full rounded-xl bg-accent py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground hover:brightness-110"
                >
                  Place $500 Deposit →
                </a>
                <Link to="/portal/me" className="text-xs text-accent underline">
                  Return to portal
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
