import { z } from "zod";

export const contactInput = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  source: z.string().optional().nullable(),
  referralCode: z.string().optional().nullable(),
  waitlist: z.boolean().optional(),
});

export const leadIdInput = z.object({ leadId: z.string().uuid() });

export const detailsInput = z.object({
  leadId: z.string().uuid(),
  preferredSex: z.enum(["male", "female", "either"]),
  timeline: z.enum(["ready_now", "1_3_months", "future"]),
  hasOwnedLargeDog: z.boolean(),
  readyForDeposit: z.enum(["yes", "no", "info"]),
  householdType: z.string().min(1),
  hasFencedYard: z.enum(["yes", "no", "in_progress"]),
  familySize: z.number().int().min(1),
  childrenAges: z.string().optional().nullable(),
  otherPets: z.string().optional().nullable(),
  preferredPuppyId: z.string().uuid().optional().nullable(),
  reasonForBreed: z.string().min(50),
  additionalNotes: z.string().optional().nullable(),
  source: z.string().min(1),
});

export const profileRoleInput = z.object({ userId: z.string().uuid() });