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
import {ServiceApi} from "./service-api.ts";
import {VehicleCategory} from "../model/vehicle-category.ts";
import {Equipment, EquipmentType} from "../model/equipment.ts";
import {VehicleInfo} from "../model/vehicle-info.ts";

export class VehicleCategoryServiceApi {

    private static _instance: VehicleCategoryServiceApi;

    public static instance(): VehicleCategoryServiceApi {
        if (this._instance == null) {
            this._instance = new VehicleCategoryServiceApi();
        }
        return this._instance;
    }

    /**
     * Get the list of all bookable categories (or vehicle)
     */
    public getBookableCategories(): Promise<VehicleCategory[]> {
        return fetch(ServiceApi.instance().apiBaseUrl + "/booking/vehicle-categories", {
            headers: {
                "Content-Type": "application/json",
                "api-key": ServiceApi.instance().apiKey
            }
        }).then((response: Response) => {
            return response.json();
        }).then((vehicleCategories: VehicleCategory[]) => {
            return vehicleCategories.map((vehicleCategory) => {
                vehicleCategory.vehicle.equipmentsList = this.getEquiments(vehicleCategory.vehicle);
                return vehicleCategory;
            });
        });
    }

    private getEquiments(vehicleInfo: VehicleInfo): Equipment[] {
        let equipments: Equipment[] = new Array<Equipment>();
        if (vehicleInfo.transmission != null) {
            equipments.push(new Equipment(EquipmentType.TRANSMISSION,
                vehicleInfo.transmission.toString()));
        }
        if (vehicleInfo.doorsNumber != undefined && vehicleInfo.doorsNumber > 0) {
            equipments.push(new Equipment(EquipmentType.DOORS_NUMBER,
                vehicleInfo.doorsNumber.toString()));
        }
        if (vehicleInfo.seatsNumber != undefined) {
            equipments.push(new Equipment(
                EquipmentType.SEATS_NB, vehicleInfo.seatsNumber.toString()));
        }
        if (vehicleInfo.airConditioning != null && vehicleInfo.airConditioning) {
            equipments.push(new Equipment(
                EquipmentType.AIR_CONDITIONING, true.toString()));
        }
        /*if (vehicleInfo.includedDistance != null ||
            (noLimitDistance != null && noLimitDistance!)) {
            String distance = includedDistance != null
                ? includedDistance.toString()
                : Equipment.noLimitDistanceValue.toString();
            equipments.add(
                Equipment(type: EquipmentType.INCLUDED_DISTANCE, value: distance));
        }*/
        return equipments;
    }

    public getVehicleImagePath(vehicleUuid: string): string {
        return `${ServiceApi.instance().apiBaseUrl}/vehicle/${vehicleUuid}/vehicle`;
    }
}