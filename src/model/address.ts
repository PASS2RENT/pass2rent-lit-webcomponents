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
import {GeoPoint} from "./geoPoint.ts";

export class Address {

    private _locationName?: string;

    private _addressLine1?: string;
    private _addressLine2?: string;
    private _locality?: string;
    private _postalCode?: string;
    private _countryCode?: string;
    private _gpsLocation?: GeoPoint;
    private _instructions?: string;

    get locationName(): string | undefined {
        return this._locationName;
    }

    set locationName(value: string) {
        this._locationName = value;
    }

    get addressLine1(): string | undefined {
        return this._addressLine1;
    }

    set addressLine1(value: string) {
        this._addressLine1 = value;
    }

    get addressLine2(): string | undefined {
        return this._addressLine2;
    }

    set addressLine2(value: string) {
        this._addressLine2 = value;
    }

    get locality(): string | undefined {
        return this._locality;
    }

    set locality(value: string) {
        this._locality = value;
    }

    get postalCode(): string | undefined {
        return this._postalCode;
    }

    set postalCode(value: string) {
        this._postalCode = value;
    }

    get countryCode(): string | undefined {
        return this._countryCode;
    }

    set countryCode(value: string) {
        this._countryCode = value;
    }

    get gpsLocation(): GeoPoint | undefined {
        return this._gpsLocation;
    }

    set gpsLocation(value: GeoPoint) {
        this._gpsLocation = value;
    }

    get instructions(): string | undefined {
        return this._instructions;
    }

    set instructions(value: string) {
        this._instructions = value;
    }
}