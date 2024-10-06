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
import {html, css, LitElement} from "lit";
import {Equipment, EquipmentType} from "../model/equipment.ts";

import ac from '../assets/equipments/img_equipment_ac.svg';
import doors from '../assets/equipments/img_equipment_doors.svg';
import fuel from '../assets/equipments/img_equipment_fuel.svg';
import gps from '../assets/equipments/img_equipment_gps.svg';
import includedDistance from '../assets/equipments/img_equipment_included_distance.svg';
import seats from '../assets/equipments/img_equipment_seats.svg';
import transmission from '../assets/equipments/img_equipment_transmission.svg';
import {msg, str} from "@lit/localize";

@customElement('equipment-item')
export class EquipmentItem extends LitElement {

    @property({ type: Equipment })
    equipment: Equipment = new Equipment(EquipmentType.AIR_CONDITIONING, "true");

    @property({ type: String })
    format: String = "full";

    render() {
        // This is the component for the list of categories version....
        return html`
            <div class="wrapper ${this.format}">
                <span class="icon-container">
                    <img alt="${EquipmentItem.getTypeLabel(this.equipment)}" src="${EquipmentItem.getIconFromType(this.equipment.type)}" class="small-icon"/>
                </span>                    
                <span class="label">${EquipmentItem.getTypeLabel(this.equipment)}</span>
            </div>
        `;
    }

    static styles = css`
        .wrapper {
            display: flex;
            align-items: center;
        }
        .wrapper.small {
            margin-bottom: 4px;
        }
        .wrapper.full {
            flex-direction: column;
            background-color: #F7F6F9;
            border-radius: 8px;
            overflow-x: auto;
            text-align: center;
            padding: 16px;
        }
        .wrapper.full span {
            display: block;
        }
        .wrapper.full span.label {
            white-space: nowrap;
        }
        .wrapper .icon-container {
            width: 32px;
        }
    `

    public static getTypeLabel(equipment: Equipment): string {
        switch (equipment.type) {
            case EquipmentType.AIR_CONDITIONING:
                return msg('Air conditioning');
            case EquipmentType.DOORS_NUMBER:
                return msg(str`${equipment.value} doors`);
            case EquipmentType.FUEL:
                /** N{Unspecified fuel, no A/C} R{Unspecified fuel, A/C} D{Diesel, A/C} Q{Diesel, no A/C} H{Hybrid, A/C}
                 * I{Hybrid, no A/C} E{Electric, A/C} C{Electric, no A/C} L{LPG/Gas, A/C} S{LPG/Gas, no A/C} A{Hydrogen, A/C}
                 * B{Hydrogen, no A/C} M{Multi fuel, A/C} F{Multi fuel, no A/C} V{Petrol, A/C} Z{Petrol, no A/C} U{Ethanol, A/C} X{Ethanol, no A/C} other{???}} */
                switch (equipment.value) {
                    case 'R':
                        return msg('Unspecified Fuel');
                    case 'D':
                    case 'Q':
                        return msg('Diesel');
                    case 'H':
                    case 'I':
                        return msg('Hybrid');
                    case 'E':
                    case 'C':
                        return msg('Electric');
                    case 'L':
                    case 'S':
                        return msg('LPG/Gas');
                    case 'A':
                    case 'B':
                        return msg('Hydrogen');
                    case 'M':
                    case 'F':
                        return msg('Multi fuel');
                    case 'V':
                    case 'Z':
                        return msg('Petrol');
                    case 'U':
                    case 'X':
                        return msg('Ethanol');
                    default:
                        return msg('Other');
                }
            case EquipmentType.GPS:
                return msg('GPS');
            case EquipmentType.INCLUDED_DISTANCE:
                if (Number(equipment.value) >= 0) {
                    return msg(str`${equipment.value} km`);
                } else {
                    return msg('unlimited distance');
                }
            case EquipmentType.SEATS_NB:
                return msg(str`${equipment.value} seats`)
            case EquipmentType.TRANSMISSION:
                /**
                 * M{Manual drive} N{Manual, 4WD} C{Manual, AWD} A{Auto drive} B{Auto, 4WD} D{Auto, AWD}
                 */
                switch (equipment.value) {
                    case 'M':
                        return msg('Manual drive');
                    case 'N':
                        return msg('Manual, 4WD');
                    case 'C':
                        return msg('Manual, AWD');
                    case 'A':
                        return msg('Auto drive');
                    case 'B':
                        return msg('Auto, 4WD');
                    case 'D':
                        return msg('Auto, AWD');
                }
                return transmission;
        }
        return "";
    }

    public static getIconFromType(type: EquipmentType): string | undefined {
        switch (type) {
            case EquipmentType.AIR_CONDITIONING:
                return ac;
            case EquipmentType.DOORS_NUMBER:
                return doors;
            case EquipmentType.FUEL:
                return fuel;
            case EquipmentType.GPS:
                return gps;
            case EquipmentType.INCLUDED_DISTANCE:
                return includedDistance;
            case EquipmentType.SEATS_NB:
                return seats;
            case EquipmentType.TRANSMISSION:
                return transmission;
        }
        return undefined;
    }
}