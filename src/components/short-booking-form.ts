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
import {customElement} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {msg} from "@lit/localize";
import '@vaadin/form-layout'
import '@vaadin/date-time-picker'

@customElement('short-booking-form')
export class ShortBookingForm extends LitElement {

    render() {

        return html`
          <vaadin-form-layout>
              <vaadin-date-time-picker label="${msg('Pickup date')}"></vaadin-date-time-picker>
              <vaadin-date-time-picker label="${msg('Return date')}"></vaadin-date-time-picker>
              
          </vaadin-form-layout>
        `;
    }

    static styles = css`
        
        .booking-title {
            margin-top: 18px;
            font-size: 18px;
            font-weight: bold;
            display: block;
        }
        
    `
}