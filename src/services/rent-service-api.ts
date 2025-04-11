
import {ServiceApi} from "./service-api.ts";
import {getAvailableCountries} from "./api/partner-website-controller.ts";
import {CountryEntry} from "../model/generated";

export class RentServiceApi {

    private static _instance: RentServiceApi;

    public static instance(): RentServiceApi {
        if (this._instance == null) {
            this._instance = new RentServiceApi();
        }
        return this._instance;
    }

    public getAvailableCountries(): Promise<CountryEntry[]> {
        return getAvailableCountries(ServiceApi.instance().stdRequestOptions);
    }

   /* public validateClientData(client: BillClient): Promise<BillClient> {
        return fetch(ServiceApi.instance().apiBaseUrl + "/booking/validate-client-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": ServiceApi.instance().apiKey,
            },
            body: JSON.stringify(client)
        }).then((response: Response) => {
            return response.json();
        });
    }*/
}