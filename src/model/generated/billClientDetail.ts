/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * PASS2RENT widgets
 * For partner reservation website
 * OpenAPI spec version: v0.0.1
 */
import type { Address } from "./address";

export interface BillClientDetail {
  uuid?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  companyName?: string;
  companyCode?: string;
  companyVatCode?: string;
  address?: Address;
}
