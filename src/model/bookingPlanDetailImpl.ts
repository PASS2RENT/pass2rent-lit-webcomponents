import {BookingPlanDetail, type BookingPlanDetailCurrency} from "./generated";

export class BookingPlanDetailImpl implements BookingPlanDetail {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public currency: BookingPlanDetailCurrency;
    public bookingOptionType: string;
    public bookingOptionLabel: string;

    constructor(id: string, name: string, description: string, price: number, currency: BookingPlanDetailCurrency,
                bookingOptionType: string, bookingOptionLabel: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.bookingOptionType = bookingOptionType;
        this.bookingOptionLabel = bookingOptionLabel;
    }
}