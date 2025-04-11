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
import {AxiosRequestConfig} from "axios";

export class ServiceApi {

    private static _instance: ServiceApi;

    private _apiBaseUrl: string;

    private _apiKey: string;

    constructor(apiBaseUrl: string, apiKey: string) {
        this._apiBaseUrl = apiBaseUrl;
        this._apiKey = apiKey;
    }

    public static initService(apiBaseUrl: string, apiKey: string) {
        ServiceApi._instance = new ServiceApi(apiBaseUrl, apiKey);
    }

    public static instance() {
        if (this._instance == undefined) {
            throw new Error("The service is not intialized....");
        }
        return ServiceApi._instance;
    }

    get stdRequestOptions(): AxiosRequestConfig {
        return {
            baseURL: this._apiBaseUrl,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "api-key": this._apiKey
            }
        };
    }

    get apiBaseUrl(): string {
        return this._apiBaseUrl;
    }

    get apiKey(): string {
        return this._apiKey;
    }
}