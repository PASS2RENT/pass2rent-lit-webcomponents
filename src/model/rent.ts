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
import {VehicleInfo} from "./vehicle-info.ts";
import {Address} from "./address.ts";

export class Rent {

    private _vehicle: VehicleInfo;

    private _exactModel: boolean;

    private _startDate: Date;

    private _expectedEndDate: Date;

    private _address?: Address;

    constructor(vehicle: VehicleInfo, exactModel: boolean, startDate: Date, expectedEndDate: Date) {
        this._vehicle = vehicle;
        this._exactModel = exactModel;
        this._startDate = startDate;
        this._expectedEndDate = expectedEndDate;
    }

    get vehicle(): VehicleInfo {
        return this._vehicle;
    }

    set vehicle(value: VehicleInfo) {
        this._vehicle = value;
    }

    get exactModel(): boolean {
        return this._exactModel;
    }

    set exactModel(value: boolean) {
        this._exactModel = value;
    }

    get startDate(): Date {
        return this._startDate;
    }

    set startDate(value: Date) {
        this._startDate = value;
    }

    get expectedEndDate(): Date {
        return this._expectedEndDate;
    }

    set expectedEndDate(value: Date) {
        this._expectedEndDate = value;
    }

    get address(): Address | undefined {
        return this._address;
    }

    set address(value: Address) {
        this._address = value;
    }
}