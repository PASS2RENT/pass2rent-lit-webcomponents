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
import {Equipment} from "./equipment.ts";

export class VehicleInfo {

    private readonly _uuid: string;

    private readonly _shortDisplayName: string;

    private readonly _plateNumber?: string;

    private readonly _airConditioning: boolean = true;

    private readonly _seatsNumber?: number;

    private readonly _doorsNumber?: number;

    private readonly _contactless: boolean = false;

    private readonly _transmission?: Transmission ;

    private _equipmentsList?: Equipment[];

    constructor(vehicleInfoId: string, label: string) {
        this._uuid = vehicleInfoId;
        this._shortDisplayName = label;
    }

    get uuid(): string {
        return this._uuid;
    }

    get shortDisplayName(): string {
        return this._shortDisplayName;
    }

    get plateNumber(): string | undefined {
        return this._plateNumber;
    }

    get airConditioning(): boolean {
        return this._airConditioning;
    }

    get seatsNumber(): number | undefined {
        return this._seatsNumber;
    }

    get doorsNumber(): number | undefined {
        return this._doorsNumber;
    }

    get contactless(): boolean {
        return this._contactless;
    }

    set equipmentsList(value: Equipment[]) {
        this._equipmentsList = value;
    }

    get equipmentsList(): Equipment[] | undefined {
        return this._equipmentsList;
    }

    get transmission(): Transmission | undefined {
        return this._transmission;
    }
}

export enum Transmission {

    /**
     * Manual drive
     */
    M,

    /**
     * Manual, 4WD
     */
    N,

    /**
     * Manual, AWD
     */
    C,

    /**
     * Auto drive
     */
    A,

    /**
     * Auto, 4WD
     */
    B,

    /**
     * Auto, AWD
     */
    D,
}