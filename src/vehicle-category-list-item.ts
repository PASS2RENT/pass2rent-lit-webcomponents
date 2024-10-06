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
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { VehicleInfo } from "./model/vehicle-info.ts";
import { VehicleCategoryServiceApi } from "./services/vehicle-category-service-api.ts";
import { VehicleCategory } from "./model/vehicle-category.ts";

import './components/equipment-item.ts'
import './components/booking-plan-summary.ts'
import './vehicle-category-detail-dialog.ts'

/**
 * This is the root default element for the booking system.
 *
 */
@customElement('vehicle-category-list-item')
export class VehicleCategoryListItem extends LitElement {

    @property({ type: VehicleCategory})
    vehicleCategory: VehicleCategory = new VehicleCategory(
        ".VehicleAsCategory",
        "342dc365-bbbd-408b-b4e2-5c39ea2604a6",
        true,
        new VehicleInfo("342dc365-bbbd-408b-b4e2-5c39ea2604a6", "Kia Ceed"));

    render() {
        return html`
      <div class="model" style="background-image: url(${VehicleCategoryServiceApi.instance().getVehicleImagePath(
          this.vehicleCategory.vehicle.uuid)})">
        <div class="label">${this.vehicleCategory.vehicle.shortDisplayName}</div>
        <ul class="equipments">
            ${this.vehicleCategory.vehicle.equipmentsList?.map((equipment) => {
                return html`<li><equipment-item .equipment="${equipment}" format="small"></equipment-item></li>`
            })}
        </ul>
            ${this.vehicleCategory.bookingPlan != undefined ? 
                html `<div><booking-plan-summary .bookingPlan="${this.vehicleCategory.bookingPlan}" format="small"></booking-plan-summary></div>` : 
                ''}
          <div class="action-wrapper"><vehicle-category-detail-dialog .vehicleCategory="${this.vehicleCategory}"></vehicle-category-detail-dialog></div>
      </div>
      <!--<div class="overlay"></div>-->
    `
    }

    static styles = css`
    :host {
        position: relative;
    }
    .model {
        min-height: 200px;
        background-size: contain;
        background-position: top -30px right -70px;
        background-repeat: no-repeat;
        border-radius: 10px;
        padding: 12px;
        background-color: #ffffff;
        
    }
    .model .label {
        font-weight: bold;
        font-size: 18px;
    }
    .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        border-radius: 10px;

    }
    .overlay:hover {
        opacity: 0.10;
        background-color: #030039;
    }
    ul.equipments {
        list-style: none;
        padding: 0;
        margin-top: 12px;
        display: block;
    }
    ul.equipments li {
        padding: 0;
        margin: 0;
    }
    .action-wrapper {
        margin-top: 18px;
        text-align: center;
    }
  `
}