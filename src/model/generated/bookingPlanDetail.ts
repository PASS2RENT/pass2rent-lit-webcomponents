/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * PASS2RENT widgets
 * For partner reservation website
 * OpenAPI spec version: v0.0.1
 */
import type { BookingPlanDetailCurrency } from "./bookingPlanDetailCurrency";
import type { ChronoUnit } from "./chronoUnit";
import type { BookingOptionDetail } from "./bookingOptionDetail";

export interface BookingPlanDetail {
  currency?: BookingPlanDetailCurrency;
  name?: string;
  cancelationFee?: number;
  freeCancellationLimit?: number;
  freeCancellationLimitUnit?: ChronoUnit;
  excessAmount?: number;
  bookingOptions?: BookingOptionDetail[];
}
