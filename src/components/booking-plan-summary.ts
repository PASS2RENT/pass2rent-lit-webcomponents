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
import {BookingPlan, DiscountPrice, Period, TimeDependantPriceOption} from "../model/pricing.ts";
import {msg, str} from "@lit/localize";

@customElement('booking-plan-summary')
export class BookingPlanSummary extends LitElement {

    @property({ type: BookingPlan })
    bookingPlan: BookingPlan = new BookingPlan("EUR", 800, 500, 0.21, new Array<TimeDependantPriceOption>());

    @property({ type: String })
    format: String = "full";

    render() {
        // This is the component for the list of categories version....

        let index: number = 0;
        return html`
            <div class="wrapper ${this.format}">
                ${this.format === 'small' ? '' : html`<div class="pricing-title">${ msg('Pricing') }</div>`}
                <ul>
                ${this.bookingPlan.priceItems.map((priceItem: TimeDependantPriceOption) => {
                    if (this.format === 'small' && index === (this.bookingPlan.priceItems!.length - 1) || this.format === 'full') {
                        // For each option, we display at first the normal price
                        let discountDisplayed: boolean = false;
                        let hasDiscount: boolean = priceItem.discountPrices != undefined && priceItem.discountPrices?.length > 0;
                        return html`
                            <li class="price-item ${hasDiscount ? 'has-discount' : ''}">
                                <div class="normal-price">
                                    ${this.format === 'small' ? html`<span class="prefix">${ msg('From') }</span>` : 
                                            html`<span class="prefix">${msg(str`${priceItem.minRentDuration}-${priceItem.maxRentDuration} ${this.getPeriodLabel(priceItem.rentDurationUnit, true)} : `)}</span>` }
                                    <span class="price">${msg(str`${priceItem.pricePerUnit} ${this.formatCurrency(this.bookingPlan.currency)}/${this.getPeriodLabel(priceItem.rentDurationUnit, false)}`)}</span>
                                </div>
                                ${priceItem.discountPrices?.map((discountPrice: DiscountPrice) => {
                                    // We're displaying the first discount price.
                                    // If it's the compact version, we're displaying only the last
                                    if (!discountDisplayed && new Date(discountPrice.applicableTo) > new Date(discountPrice.currentDate)) {
                                        discountDisplayed = true;
                                        return html`
                                            <div class="discount-price">
                                                <span class="price">${msg(str`${discountPrice.pricePerUnit} ${this.formatCurrency(this.bookingPlan.currency)}/${this.getPeriodLabel(priceItem.rentDurationUnit, false)}`)}</span>
                                                <span class="applicable-time">${this.getDiscountDateLabels(discountPrice)}</span>
                                            </div>`
                                    }
                                })}
                            </li>`
                    }
                    index++;
                })}
                </ul>
            </div>
        `;
    }

    static styles = css`
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
    `

    private getPeriodLabel(period: Period, plurial: boolean):string {
        switch (period) {
            case Period.DAYS:
                return plurial ? msg('days') : msg('day');
            case Period.HOURS:
                return plurial ? msg('hours') : msg('hour');
            case Period.MINUTES:
                return plurial ? msg('minutes') : msg('minute');
        }
    }

    private formatCurrency(currencyCode: string): string {
        switch (currencyCode) {
            case 'EUR':
                return '€';
            default:
                return currencyCode;
        }
    }

    private formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            year: '2-digit',
            month: 'numeric',
            day: 'numeric'
        };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    private getDiscountDateLabels(discountPrice: DiscountPrice):string {
        let toDate: string = this.formatDate(discountPrice.applicableTo);
        if (new Date(discountPrice.applicableFrom) < new Date(discountPrice.currentDate)) {
            // The discount price already started : we're displaying only the end date
            return msg(str`until ${toDate}`);
        } else {
            // The discount price is not applicable yet : we're displaying the from and the to date.
            let fromDate: string = this.formatDate(discountPrice.applicableFrom);
            return msg(str`From ${fromDate} to ${toDate}`);
        }
    }
}