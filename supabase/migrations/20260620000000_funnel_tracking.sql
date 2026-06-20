-- Funnel tracking: record when a lead books each of the two funnel calls.
-- The lead funnel is: contact → Puppy Match Call → application → refundable
-- deposit → private puppy video call. These timestamps let the breeder see
-- where each lead is in that flow.
alter table public.wws_leads
  add column if not exists match_call_booked_at timestamptz,
  add column if not exists video_call_booked_at timestamptz;
