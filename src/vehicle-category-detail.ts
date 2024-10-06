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
import {VehicleCategory} from "./model/vehicle-category.ts";
import {VehicleInfo} from "./model/vehicle-info.ts";
import {VehicleCategoryServiceApi} from "./services/vehicle-category-service-api.ts";

@customElement('vehicle-category-detail')
export class VehicleCategoryDetail extends LitElement {

    @property({ type: VehicleCategory})
    vehicleCategory: VehicleCategory = new VehicleCategory(
        ".VehicleAsCategory",
        "342dc365-bbbd-408b-b4e2-5c39ea2604a6",
        true,
        new VehicleInfo("342dc365-bbbd-408b-b4e2-5c39ea2604a6", "Kia Ceed"));

    render() {
        return html

            `
      <div class="model">
          <img src="${VehicleCategoryServiceApi.instance().getVehicleImagePath(
                  this.vehicleCategory.vehicle.uuid)}"/>
          <ul class="equipments full">
              ${this.vehicleCategory.vehicle.equipmentsList?.map((equipment) => {
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
        .model > img {
            width: 100%;
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