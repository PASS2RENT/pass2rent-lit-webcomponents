import {BookingPlanDetail, VehicleCategoryBookingPublic, type VehiclePublic} from "./generated";

export class VehicleCategoryBookingPublicImpl implements VehicleCategoryBookingPublic {
    uuid?: string;
    isExactVehicle?: boolean;
    vehicle?: VehiclePublic;
    bookingPlan?: BookingPlanDetail;
}