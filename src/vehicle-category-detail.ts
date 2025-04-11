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
import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {VehicleCategoryServiceApi} from "./services/vehicle-category-service-api.ts";
import {VehicleCategoryBookingPublicImpl} from "./model/vehicleCategoryBookingPublicImpl.ts";
import {VehicleCategoryBookingPublic} from "./model/generated";
import {VehiclePublicExt} from "./model/vehiclePublicExt.ts";

@customElement('vehicle-category-detail')
export class VehicleCategoryDetail extends LitElement {

    @property({ type: VehicleCategoryBookingPublicImpl})
    vehicleCategory: VehicleCategoryBookingPublic = ({
        uuid : "342dc365-bbbd-408b-b4e2-5c39ea2604a6",
        isExactVehicle: true,
        vehicle: {
            uuid: "342dc365-bbbd-408b-b4e2-5c39ea2604a6",
            manufacturer: "KIA",
            model: "Ceed",
            shortDisplayName: "Kia Ceed",
        },
        name: "Kia Ceed",
    });

    render() {
        return html

            `
      <div class="model">
          <img src="${VehicleCategoryServiceApi.instance().getVehicleImagePath(
                  this.vehicleCategory.vehicle.uuid!)}" class="vehicle-picture"/>
          <ul class="equipments full">
              ${(this.vehicleCategory.vehicle as VehiclePublicExt).equipmentsList?.map((equipment) => {
                  return html`<li><equipment-item .equipment="${equipment}" format="full"></equipment-item></li>`
              })}
          </ul>
          ${this.vehicleCategory.bookingPlan != undefined ?
                  html `<div><booking-plan-summary .bookingPlan="${this.vehicleCategory.bookingPlan}" format="full"></booking-plan-summary></div>` :
                  ''}
      </div>
          `
    }

    static styles = css`
        .model {
            max-width: 1024px;
        }
        
        .model > img {
            max-width: 640px;
            display: block;
            margin: auto;
        }
        ul.equipments {
            list-style: none;
            padding: 0;
            margin-top: 12px;
            display: block;
        }
        ul.equipments.full {
            display: flex;
            flex-direction: row;
            gap: 8px;
            overflow-x: auto;
            margin-left: -24px;
            margin-right: -24px;
            padding-left: 24px;
            padding-right: 24px;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        ul.equipments.full::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        ul.equipments.full {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
    `
}