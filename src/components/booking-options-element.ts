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
import {html, LitElement} from "lit";
import {BookingOptionDetail} from "../model/generated";

@customElement('booking-options-element')
export class BookingOptionsElement extends LitElement {

    @property()
    bookingOptions: BookingOptionDetail[] = new Array<BookingOptionDetail>();

    render() {
        return html`
        `;
    }

    /*private getOptionLabel(bookinOptionTye: BookingOptionType): string {
        switch (bookinOptionTye) {
            case BookingOptionType.ADDITIONAL_DRIVER:
                return msg('Additional driver')
            case BookingOptionType.EXCESS_PROTECTION:
                return msg('Excess protection')
        }
        return '';
    }*/
}