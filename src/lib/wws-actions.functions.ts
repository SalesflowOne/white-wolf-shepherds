import { createServerFn } from "@tanstack/react-start";
import {
  getProfileRoleHandler,
  markMatchCallBookedHandler,
  markVideoCallBookedHandler,
  startLeadHandler,
  submitApplicationDetailsHandler,
} from "./wws-actions.server";
import { contactInput, detailsInput, leadIdInput, profileRoleInput } from "./wws-actions.schemas";

export const startLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactInput.parse(data))
  .handler(async ({ data }) => startLeadHandler(data));

export const markMatchCallBooked = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadIdInput.parse(data))
  .handler(async ({ data }) => markMatchCallBookedHandler(data));

export const markVideoCallBooked = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadIdInput.parse(data))
  .handler(async ({ data }) => markVideoCallBookedHandler(data));

export const submitApplicationDetails = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => detailsInput.parse(data))
  .handler(async ({ data }) => submitApplicationDetailsHandler(data));

export const getProfileRole = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => profileRoleInput.parse(data))
  .handler(async ({ data }) => getProfileRoleHandler(data));
