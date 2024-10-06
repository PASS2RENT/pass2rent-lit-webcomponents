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
import {customElement, property, state} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {VehicleCategory} from "./model/vehicle-category.ts";
import {VehicleInfo} from "./model/vehicle-info.ts";
import {DialogOpenedChangedEvent} from "@vaadin/dialog";
import {dialogRenderer} from "@vaadin/dialog/lit";
import {msg} from "@lit/localize";

import '@vaadin/dialog'
import './vehicle-category-detail.ts'

@customElement('vehicle-category-detail-dialog')
export class VehicleCategoryDetailDialog extends LitElement {

    @property({ type: VehicleCategory})
    vehicleCategory: VehicleCategory = new VehicleCategory(
        ".VehicleAsCategory",
        "342dc365-bbbd-408b-b4e2-5c39ea2604a6",
        true,
        new VehicleInfo("342dc365-bbbd-408b-b4e2-5c39ea2604a6", "Kia Ceed"));

    @state()
    private _dialogOpened = false;

    render() {
        return html`
                  <vaadin-dialog
        header-title="${ this.vehicleCategory.vehicle.shortDisplayName}"
        .opened="${this._dialogOpened}"
        @opened-changed="${(event: DialogOpenedChangedEvent) => {
            this._dialogOpened = event.detail.value;
        }}"
        ${dialogRenderer(() => html`<vehicle-category-detail .vehicleCategory="${this.vehicleCategory}"></vehicle-category-detail>`, [])}>
      </vaadin-dialog>
      <vaadin-button @click="${this.open}">${ msg('Show more...') }</vaadin-button>
        `
    }

    static styles = css`
        vaadin-button {
            cursor: pointer;
        }

        
    `

    public open() {
        console.log("Button clicked !!!")
        this._dialogOpened = true;
    }

    public close() {
        this._dialogOpened = false;
    }
}