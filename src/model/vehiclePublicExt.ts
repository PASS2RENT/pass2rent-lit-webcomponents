import {VehiclePublic} from "./generated";
import {Equipment} from "./equipment.ts";

export interface VehiclePublicExt extends VehiclePublic {

    equipmentsList?: Equipment[];
}