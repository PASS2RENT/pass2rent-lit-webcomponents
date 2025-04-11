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
import {Dialog, DialogOpenedChangedEvent} from "@vaadin/dialog";
import {dialogFooterRenderer, dialogRenderer} from "@vaadin/dialog/lit";
import {msg} from "@lit/localize";

import '@vaadin/dialog'
import './vehicle-category-detail.ts'
import './components/short-booking-form.ts'
import './components/booking-form.ts'
import {VehicleCategoryBookingPublicImpl} from "./model/vehicleCategoryBookingPublicImpl.ts";
import {VehicleCategoryBookingPublic} from "./model/generated";

@customElement('vehicle-category-detail-dialog')
export class VehicleCategoryDetailDialog extends LitElement {

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

    @state()
    private _dialogOpened = false;

    @state()
    private _showFormSummary = false;

    @state()
    private _bookingForm = false;

    render() {
        return html`
                  <vaadin-dialog id="main-dialog"
        header-title="${ this.vehicleCategory.vehicle.shortDisplayName}"
        
        .opened="${this._dialogOpened}"
        @opened-changed="${(event: DialogOpenedChangedEvent) => {
            this._dialogOpened = event.detail.value;
        }}"
        ${dialogRenderer(() => {
            if (!this._bookingForm) {
                return html`
                    <vehicle-category-detail .vehicleCategory="${this.vehicleCategory}"></vehicle-category-detail>
                    ${!this._showFormSummary ?
                            html `<booking-form .vehicleCategory="${this.vehicleCategory}"></booking-form>` : ''}
                    `
            } else {
                return html`
                    <booking-form .vehicleCategory="${this.vehicleCategory}"></booking-form>`;
            }
        }, [])}
        ${dialogFooterRenderer(
                () => {
                        if (!this._bookingForm && this._showFormSummary) {
                            return html`
                            <div style="display: flex; flex-direction: row; align-items: end; gap: 12px;">
                              <short-booking-form></short-booking-form>
                              <vaadin-button theme="primary" @click="${this.book}" style="margin-right: auto;">
                                Book now...
                              </vaadin-button>
                            </div>` 
                        } else {
                            return html``;
                        }
                    },
                []
        )}>
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

    public book() {
        let dialog: Dialog | null = this.renderRoot.querySelector('#main-dialog');
        if (dialog) {
            dialog.opened = false;
            this._bookingForm = true;
            dialog.opened = true;
        }
    }

    public close() {
        this._dialogOpened = false;
    }
}