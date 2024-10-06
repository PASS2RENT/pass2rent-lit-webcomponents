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
import {BookingPlan} from "./pricing.ts";

export class VehicleCategory {

    private _type: string;

    private _uuid: string;

    private _exactVehicle: boolean;

    private _vehicle: VehicleInfo;

    private _bookingPlan? :BookingPlan;

    constructor(type: string, uuid: string, exactVehicle: boolean, vehicle: VehicleInfo) {
        this._type = type;
        this._uuid = uuid;
        this._exactVehicle = exactVehicle;
        this._vehicle = vehicle;
    }

    get type(): string {
        return this._type;
    }

    get uuid(): string {
        return this._uuid;
    }

    get exactVehicle(): boolean {
        return this._exactVehicle;
    }

    get vehicle(): VehicleInfo {
        return this._vehicle;
    }

    get bookingPlan(): BookingPlan | undefined {
        return this._bookingPlan;
    }
}