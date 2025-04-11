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
import {msg} from "@lit/localize";

import './booking-options-element.ts';
import '@vaadin/form-layout';
import '@vaadin/radio-group';
import '@vaadin/checkbox';
import '@vaadin/select';
import {BookingPlanDetailImpl} from "../model/bookingPlanDetailImpl.ts";
import {BookingPlanDetail} from "../model/generated";

@customElement('booking-plan-summary')
export class BookingPlanSummary extends LitElement {

    @property({ type: BookingPlanDetailImpl })
    bookingPlan: BookingPlanDetail = {
        currency: {
            currencyCode: 'EUR',
        },
        excessAmount: 800,
        cancelationFee: 500,
        freeCancellationLimit: 3,
        freeCancellationLimitUnit: "Days",
        bookingOptions: [
            {
                type: "EXCESS_PROTECTION",
            }
        ]
    }

    @property({ type: String })
    format: String = "full";

    @state()
    private items = [
        {
            label: '0',
            value: '0',
        },
        {
            label: '1',
            value: '1',
        },
        {
            label: '2',
            value: '2',
        }
    ];

    render() {

        return html`
            <div class="wrapper ${this.format}">
                ${      // The title is not rendered in the small version
                this.format === 'small' ? '' : html`<h3>${ msg('Pricing') }</h3>`}

                ${ this.format !== 'small' ? html`
                <h3>${ msg('Options') }</h3>
                <div class="option-item">
                    <vaadin-select class="option-value" .items="${this.items}"
                                           .value="${this.items[0].value}"></vaadin-select><span>${msg('Child seats (9-18kg)')}</span>
                </div>
                <div class="option-item">
                    <vaadin-select class="option-value" .items="${this.items}"
                                          .value="${this.items[0].value}"></vaadin-select><span>${msg('Booster seats (18-45kg)')}</span>
                </div>
                <h3>${ msg('Insurance') }</h3>
                <vaadin-form-layout>
                    <vaadin-radio-group theme="vertical"  colspan="2" @value-changed="${this.updatePrice}">
                        <vaadin-radio-button label="${msg('Insurance policy excess amount : 800€')}" checked>
                        </vaadin-radio-button>
                        <vaadin-radio-button label="${msg('Insurance policy excess amount : 0€')}"></vaadin-radio-button>
                    </vaadin-radio-group>
                   <!-- <vaadin-checkbox label="${msg('Broken glass insurance.')}"  checked></vaadin-checkbox>-->
                </vaadin-form-layout>
                `: '' }
            </div>
        `;
    }

    private updatePrice(): void {

    }

    static styles = css`
        .option-item {
            display: flex;
            flex-direction: row;
            gap: 12px;
            align-items: center;
        }
        .option-value {
            max-width: 64px;
        }
        .wrapper {
            
        }
        .wrapper.small {
            
        }
        .wrapper.full {

        }
        .wrapper ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .wrapper ul li {
            padding: 0;
            margin: 0;
        }
        .pricing-title {
            font-size: 18px;
            font-weight: bold;
        }
        .wrapper .normal-price, .wrapper .discount-price {
            display: inline-block;
        }
        .wrapper .normal-price {
            margin-right: 8px;
        }
        .wrapper .price-item.has-discount .normal-price .price {
            text-decoration: line-through;
        }
        .wrapper .price-item.has-discount .discount-price .price {
            color: #FF005C;
            font-weight: bold;
            font-size: 18px;
        }
        .wrapper .price-item.has-discount .discount-price .applicable-time {
            font-size: 10px;
            font-weight: 600;
        }
        .wrapper.full .price-item {
            background-color: #F7F6F9;
            margin-bottom: 6px;
            border-radius: 6px;
            padding-left: 8px;
            padding-right: 8px;
        }
        .wrapper .cancellation-policy, .wrapper .excess-deposit {
            font-size: 12px;
        }
    `

}