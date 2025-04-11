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
import {customElement, state} from "lit/decorators.js";
import {css, html} from "lit";
import {msg} from "@lit/localize";
import '@vaadin/button';
import '@vaadin/form-layout';
import '@vaadin/checkbox';
import '@vaadin/combo-box';
import '@vaadin/date-time-picker';
import '@vaadin/email-field';
import '@vaadin/radio-group';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import '@mapbox/search-js-web';
import {MapboxAddressMinimap, MapboxSearchBox} from "@mapbox/search-js-web";
import {ShortBookingForm} from "./short-booking-form.ts";
import {RadioGroupValueChangedEvent} from "@vaadin/radio-group";
import '@power-elements/stripe-elements';

import {RentServiceApi} from "../services/rent-service-api.ts";

import './phone-field.ts';
import {CountryEntry} from "../model/generated";

@customElement('booking-form')
export class BookingForm extends ShortBookingForm {

    @state()
    private _countries: CountryEntry[] = [];

    render() {
        let searchOptions = {  language: 'en',  country: 'LT' };

        return html`
          <div class="booking-title">${ msg('Booking') }</div>
          <vaadin-form-layout>
              <vaadin-date-time-picker label="${msg('Pickup date')}"></vaadin-date-time-picker>
              <vaadin-date-time-picker label="${msg('Return date')}"></vaadin-date-time-picker>
              <vaadin-radio-group colspan="2" label="${msg('Pickup and return location')}" theme="vertical" @value-changed="${this.locationTypeChanged}">
                  <vaadin-radio-button value="agency" label="${msg('Pickup and return location : K. Petrausko g.26')}" checked>
                  </vaadin-radio-button>
                  <vaadin-radio-button value="delivery" label="${msg('Custom address')}"></vaadin-radio-button>
              </vaadin-radio-group>
              <div class="custom-location">
                  <label slot="label">${msg('Pickup location')}</label>
                  <mapbox-search-box
                          id="pickup-location-search"
                          .options="${searchOptions}"
                      access-token="pk.eyJ1Ijoib2RpZmlzbHQiLCJhIjoiY2xkdDJ3NW1vMDVsOTNucW1wZWg4cHh4ZyJ9.0NL2Y3d7jWTAfsI0o4q6mQ"
                      proximity="0,0">
                  </mapbox-search-box>
                  <div style="width:100%; height: 200px;" id="pickup-location-minimap-container" class="hidden">
                      <mapbox-address-minimap
                              id="pickup-location-minimap"
                              access-token="pk.eyJ1Ijoib2RpZmlzbHQiLCJhIjoiY2xkdDJ3NW1vMDVsOTNucW1wZWg4cHh4ZyJ9.0NL2Y3d7jWTAfsI0o4q6mQ">
                          
                      </mapbox-address-minimap>
                  </div>
              </div>
              
              <div class="custom-location">
                  <label slot="label">${msg('Return location')}</label>
                  <mapbox-search-box
                          id="dropoff-location-search"
                          .options="${searchOptions}"
                          access-token="pk.eyJ1Ijoib2RpZmlzbHQiLCJhIjoiY2xkdDJ3NW1vMDVsOTNucW1wZWg4cHh4ZyJ9.0NL2Y3d7jWTAfsI0o4q6mQ"
                          proximity="0,0">
                  </mapbox-search-box>
                  <div style="width:100%; height: 200px;" id="dropoff-location-minimap-container" class="hidden">
                      <mapbox-address-minimap
                              id="dropoff-location-minimap"
                              access-token="pk.eyJ1Ijoib2RpZmlzbHQiLCJhIjoiY2xkdDJ3NW1vMDVsOTNucW1wZWg4cHh4ZyJ9.0NL2Y3d7jWTAfsI0o4q6mQ">
    
                      </mapbox-address-minimap>
                  </div>
              </div>

              <h3 colspan="2">${msg('Contact information')}</h3>
              <vaadin-text-field label="${msg('Firstname')}" placeholder="${msg('Firstname')}" clear-button-visible>
              </vaadin-text-field>

              <vaadin-text-field label="${msg('Lastname')}" placeholder="${msg('Lastname')}" clear-button-visible>
              </vaadin-text-field>
              
              <phone-field></phone-field>
              
              <vaadin-email-field label="${msg('Email address')}" placeholder="${msg('Email address')}"></vaadin-email-field>
              
              <h3 colspan="2">${msg('Billing Address')}</h3>

              <vaadin-radio-group colspan="2" theme="vertical" @value-changed="${this.clientTypeChanged}">
                  <vaadin-radio-button value="individual" label="${msg('I\'m an individiual')}" checked>
                  </vaadin-radio-button>
                  <vaadin-radio-button value="company" label="${msg('Renting for a company')}"></vaadin-radio-button>
              </vaadin-radio-group>

              <vaadin-text-field class="company-field hidden" label="${msg('Company name')}" placeholder="${msg('Company name')}" clear-button-visible>
              </vaadin-text-field>

              <vaadin-text-field  class="company-field hidden" label="${msg('VAT Number')}" placeholder="${msg('VAT Number')}" clear-button-visible>
              </vaadin-text-field>
              
              <vaadin-text-field colspan="2"  label="${msg('Address Line 1')}" placeholder="${msg('Address Line 1')}" clear-button-visible>
              </vaadin-text-field>

              <vaadin-text-field colspan="2"  label="${msg('Address Line 2')}" placeholder="${msg('Address Line 2')}" clear-button-visible>
              </vaadin-text-field>

              <vaadin-text-field label="${msg('Postal code')}" placeholder="${msg('Postal code')}" clear-button-visible>
              </vaadin-text-field>

              <vaadin-text-field label="${msg('City')}" placeholder="${msg('City')}" clear-button-visible>
              </vaadin-text-field>

              <vaadin-combo-box
                      label="${msg('Country')}"
                      item-label-path="name"
                      item-value-path="code"
                      .items="${this._countries}"
              ></vaadin-combo-box>
              
              <div class="agreement" colspan="2">
                  <vaadin-checkbox>
                  </vaadin-checkbox>
                  <span>I have read and accept the <a href="https://google.com" target="_blank">terms and conditions of the booking</a>,
                          <a href="https://google.com" target="_blank">legal notice</a> and 
                          <a href="https://google.com" target="_blank">privacy policy</a></span>
              </div>


              <div colspan="2">
                  <h3>${msg('Payment')}</h3>
                  <stripe-elements publishable-key="pk_test_dBNPBEPyJVMJHzM8PuYPOm7J"
                                   show-error></stripe-elements>
              </div>

              <div colspan="2">
                  <div style="text-align: center;">
                    <vaadin-button theme="primary" @click="${this.book}">${msg('Book')}</vaadin-button>
                  </div>
              </div>
          </vaadin-form-layout>
        `;
    }

    private book(): void {

    }

    firstUpdated() {
        //map
        this.initLocationSelectionMaps('#pickup-location-search', '#pickup-location-minimap');
        this.initLocationSelectionMaps('#dropoff-location-search', '#dropoff-location-minimap');
        // Get the list of countries
        RentServiceApi.instance().getAvailableCountries().then((countries: CountryEntry[]) => {
            this._countries = countries;
            this.requestUpdate();
        });
    }

    private initLocationSelectionMaps(searchBoxSelector: string, minimapSelector: string): void {
        let search: MapboxSearchBox | null = this.renderRoot.querySelector(searchBoxSelector);
        let minimap: MapboxAddressMinimap | null = this.renderRoot.querySelector(minimapSelector);
        if (search && minimap) {
            let mapContainer: Element | null = this.renderRoot.querySelector(minimapSelector + '-container');
            search.addEventListener('retrieve', (event) => {
                const featureCollection = event.detail;
                if (!featureCollection || !featureCollection.features.length) {
                    //minimap.feature = featureCollection.features;
                    if (mapContainer) {
                       mapContainer.classList.add('hidden');
                    }
                    return;
                } else {
                    if (mapContainer) {
                       mapContainer.classList.remove('hidden');
                    }
                }

                const feature = featureCollection.features[0];
                minimap.feature = feature;
            });
        } else {
            console.log("No minimap or search found.... " + searchBoxSelector + ";" + minimapSelector);
        }
    }

    public locationTypeChanged(valueChangedEvent: RadioGroupValueChangedEvent): void {
        let customLocationVisible: boolean = (valueChangedEvent.detail.value === 'delivery');
        this.renderRoot.querySelectorAll(".custom-location").forEach((item: Element) => {
            if (customLocationVisible) {
               item.classList.remove('hidden');
            } else {
               item.classList.add('hidden');
            }
        });
    }

    public clientTypeChanged(valueChangedEvent: RadioGroupValueChangedEvent): void {
        let companyFieldsVisible: boolean = (valueChangedEvent.detail.value === 'company');
        this.renderRoot.querySelectorAll(".company-field").forEach((item: Element) => {
            if (companyFieldsVisible) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    static styles = css`
        :host, vaadin-form-layout {
            max-width: 1024px;
        }
        
        .hidden {
            height: 0px !important;
            margin: 0px !important;
            padding: 0px !important;
            overflow-y: hidden;
        }

        .booking-title {
            margin-top: 18px;
            font-size: 18px;
            font-weight: bold;
            display: block;
        }
        
        .agreement {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;
        }
    `
}