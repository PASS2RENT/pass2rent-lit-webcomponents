API calls :
https://dev.to/collinkleest/optimizing-api-calls-in-web-components-14kn

For localization :
https://lit.dev/docs/localization/overview/#config-file


To Use stripe web component :
https://github.com/bennypowers/stripe-elements

https://www.freecodecamp.org/news/how-to-create-and-publish-your-first-npm-package/

Stripe doc : https://docs.stripe.com/js

https://docs.mapbox.com/mapbox-search-js/guides/
https://docs.mapbox.com/mapbox-search-js/guides/search/web/


https://ec.europa.eu/taxation_customs/vies/#/technical-information
https://ec.europa.eu/taxation_customs/vies/services/checkVatService.wsdl
Request :
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
<soapenv:Header/>
<soapenv:Body>
<urn:checkVat>
<urn:countryCode>LT</urn:countryCode>
<urn:vatNumber>100007475019</urn:vatNumber>
</urn:checkVat>
</soapenv:Body>
</soapenv:Envelope>
Response :
<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
<env:Header/>
<env:Body>
<ns2:checkVatResponse xmlns:ns2="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
<ns2:countryCode>LT</ns2:countryCode>
<ns2:vatNumber>100007475019</ns2:vatNumber>
<ns2:requestDate>2024-11-18+01:00</ns2:requestDate>
<ns2:valid>true</ns2:valid>
<ns2:name>UAB "ORIXEL"</ns2:name>
<ns2:address>A. Juozapavičiaus g. 9-3, Vilniaus m., Vilniaus m. sav.</ns2:address>
</ns2:checkVatResponse>
</env:Body>
</env:Envelope>
https://ec.europa.eu/taxation_customs/vies/rest-api/ms/LT/vat/LT100007475019