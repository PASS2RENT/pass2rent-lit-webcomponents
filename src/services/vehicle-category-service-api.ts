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
import {Equipment, EquipmentType} from "../model/equipment.ts";
import {VehicleCategoryBookingPublic, VehiclePublic} from "../model/generated";
import {VehiclePublicExt} from "../model/vehiclePublicExt.ts";
import {getBookableCategories} from "./api/partner-website-controller.ts";

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
    public getBookableCategories(): Promise<VehicleCategoryBookingPublic[]> {
        return getBookableCategories(ServiceApi.instance().stdRequestOptions)
            .then( (response) => {
            return response.data.map((vehicleCategory) => {
                if (vehicleCategory.vehicle) {
                    (vehicleCategory.vehicle as VehiclePublicExt).equipmentsList = this.getEquiments(vehicleCategory.vehicle);
                }
                return vehicleCategory;
            });
        });
    }

    private getEquiments(vehicleInfo: VehiclePublic): Equipment[] {
        let equipments: Equipment[] = new Array<Equipment>();
        if (vehicleInfo != null) {
            if (vehicleInfo.transmission != undefined) {
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
            if (vehicleInfo.airConditioning != undefined && vehicleInfo.airConditioning) {
                equipments.push(new Equipment(
                    EquipmentType.AIR_CONDITIONING, true.toString()));
            }
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
        return `${ServiceApi.instance().apiBaseUrl}/api/vehicle/${vehicleUuid}/vehicle`;
    }
}