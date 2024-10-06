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
import {customElement, property} from 'lit/decorators.js'

import './vehicle-category-list-item.ts'
import '@vaadin/form-layout'
import '@vaadin/date-time-picker'
import {msg} from "@lit/localize";
import {PropertyDeclaration} from "@lit/reactive-element";
import {ServiceApi} from "./services/service-api.ts";
import {VehicleCategoryServiceApi} from "./services/vehicle-category-service-api.ts";
import {VehicleCategory} from "./model/vehicle-category.ts";

/**
 * This is the root default element for the booking system.
 *
 */
@customElement('pass2rent-booking-element')
export class BookingElement extends LitElement {

    @property({ type: String })
    apiUrl: string = "https://api.pass2rent.io";

    @property({ type: String })
    apiKey:string = "";

    _vehicleCategories?: VehicleCategory[];

    render() {
        return html`
      <vaadin-form-layout>
        <vaadin-date-time-picker label="${msg('Pickup date')}"></vaadin-date-time-picker>
        <vaadin-date-time-picker label="${msg('Return date')}"></vaadin-date-time-picker>
      </vaadin-form-layout>
      
      <div class="result-list">
          ${this._vehicleCategories?.map((vehicleCategory) => {
              console.log(`Vehicle : ${vehicleCategory.uuid}`)
            return html`<vehicle-category-list-item .vehicleCategory="${vehicleCategory}"></vehicle-category-list-item>`;
        })}
      </div>
    `
    }

    /**
     * We're initializing the service when all the required properties are set in the properties of the object...
     * @protected
     */
    requestUpdate(name?: PropertyKey, oldValue?: unknown, options?: PropertyDeclaration): void {
        //super.updated(changedProperties);
        super.requestUpdate(name, oldValue, options);
        if (this.apiUrl && this.apiKey) {
            console.log("Initializing the services...")
            ServiceApi.initService(this.apiUrl, this.apiKey);
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        console.log("Call service")
        VehicleCategoryServiceApi.instance().getBookableCategories().then((categories) => {
            this._vehicleCategories = categories;
            this.requestUpdate();
        });
    }

    static styles = css`
    :host {
        width: 100%;
        margin: 0 auto;
        color: #030039;
        font-family: Open Sans, Arial, sans-serif;
        font-size: 14px;
    }
        
    vaadin-form-layout {
        max-width: 1366px;
        margin: auto;
    }
        
    .result-list {
        display: grid;
        gap: 12px;
        align-items: stretch;
        padding: 12px;
    }

    @media (min-width:481px) and  (max-width:1024px) {
        .result-list {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (min-width:1025px) {
        .result-list {
            grid-template-columns: repeat(3, 1fr);
        }
    }
        
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'pass2rent-booking-element': BookingElement
    }
}
