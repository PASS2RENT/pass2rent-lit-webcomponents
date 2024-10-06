/*
 * Copyright 2022-2024 UAB Odifis (PASS2RENT).
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
export class BookingPlan {

    private readonly _currency: string;

    private readonly _cancelationFee?: number;

    private readonly _freeCancelationLimit?: number;

    private readonly _freeCancelationLimitUnit?: Period;

    private readonly _excessAmount: number;

    private readonly _securityDeposit: number;

    private readonly _vatRate: number;

    private readonly _priceItems: TimeDependantPriceOption[];

    constructor(currency: string, excessAmount: number, securityDeposit: number, vatRate: number,
                priceItems: TimeDependantPriceOption[]) {
        this._currency = currency;
        this._excessAmount = excessAmount;
        this._securityDeposit = securityDeposit;
        this._vatRate = vatRate;
        this._priceItems = priceItems;
    }

    get currency(): string {
        return this._currency;
    }

    get cancelationFee(): number | undefined {
        return this._cancelationFee;
    }

    get freeCancelationLimit(): number | undefined {
        return this._freeCancelationLimit;
    }

    get freeCancelationLimitUnit(): Period | undefined {
        return this._freeCancelationLimitUnit;
    }

    get vatRate(): number {
        return this._vatRate;
    }

    get priceItems(): TimeDependantPriceOption[] {
        return this._priceItems;
    }

    get excessAmount(): number {
        return this._excessAmount;
    }

    get securityDeposit(): number {
        return this._securityDeposit;
    }

}

export class BookingOption {

    private readonly _name: string;

    private readonly _type: BookingOptionType;

    private readonly _multiple: boolean;

    private readonly _priceItems: AbstractPriceOption[];

    constructor(name: string, type: BookingOptionType, multiple: boolean, priceItems: [AbstractPriceOption]) {
        this._name = name;
        this._type = type;
        this._multiple = multiple;
        this._priceItems = priceItems;
    }

    get type(): BookingOptionType {
        return this._type;
    }

    get priceItems(): AbstractPriceOption[] {
        return this._priceItems;
    }

    get name(): string {
        return this._name;
    }

    get multiple(): boolean {
        return this._multiple;
    }
}

class AbstractPriceOption {

    private readonly _pricePerUnit: number; // One time or per unit

    private readonly _discountPrices?: DiscountPrice[];

    private readonly _type: string;

    constructor(pricePerUnit: number, type: string) {
        this._type = type;
        this._pricePerUnit = pricePerUnit;
        this._type = type;
    }

    get pricePerUnit(): number {
        return this._pricePerUnit;
    }

    get discountPrices(): DiscountPrice[] | undefined {
        return this._discountPrices;
    }

    get type(): string {
        return this._type;
    }
}

export class TimeDependantPriceOption extends AbstractPriceOption {

    private readonly _minRentDuration: number;

    private readonly _maxRentDuration: number;

    private readonly _rentDurationUnit: Period;


    constructor(price: number, type: string, minRentDuration: number, maxRentDuration: number, rentDurationUnit: Period) {
        super(price, type);
        this._minRentDuration = minRentDuration;
        this._maxRentDuration = maxRentDuration;
        this._rentDurationUnit = rentDurationUnit;
    }

    get minRentDuration(): number {
        return this._minRentDuration;
    }

    get maxRentDuration(): number {
        return this._maxRentDuration;
    }

    get rentDurationUnit(): Period {
        return this._rentDurationUnit;
    }
}

/*class OneTimePriceOption extends AbstractPriceOption {

}*/

/**
 * Check the date formate... https://medium.com/@dorontohar/a-simple-type-safe-http-client-wrapper-edb7df9317db
 */
export class DiscountPrice {

    private readonly _operationLabel: string;

    private readonly _applicableFrom: Date;

    private readonly _applicableTo: Date;

    private readonly _currentDate: Date;

    private readonly _pricePerUnit: number;

    constructor(operationLabel: string, applicableFrom: Date, applicableTo: Date, currentDate: Date, pricePerUnit: number) {
        this._operationLabel = operationLabel;
        this._applicableFrom = applicableFrom;
        this._applicableTo = applicableTo;
        this._pricePerUnit = pricePerUnit;
        this._currentDate = currentDate;
    }

    get operationLabel(): string {
        return this._operationLabel;
    }

    get applicableFrom(): Date {
        return this._applicableFrom;
    }

    get applicableTo(): Date {
        return this._applicableTo;
    }

    get pricePerUnit(): number {
        return this._pricePerUnit;
    }

    get currentDate(): Date {
        return this._currentDate;
    }

}

export enum Period {
    MINUTES = "MINUTES",
    HOURS = "HOURS",
    DAYS = "DAYS",
}

export enum BookingOptionType {
    EXCESS_PROTECTION,
    ADDITIONAL_DRIVER,
    SEAT
}