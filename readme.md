# 📚 Integration References & External Services

This project integrates several external APIs and services.
Below is a curated list of useful documentation links, best practices, and examples for partners or contributors extending the PASS2RENT Lit components.

---

## 🔌 API Calls & Web Component Best Practices

Optimize API requests inside Web Components by following these guidelines:

**Efficient API request patterns:**
[https://dev.to/collinkleest/optimizing-api-calls-in-web-components-14kn](https://dev.to/collinkleest/optimizing-api-calls-in-web-components-14kn)

Topics covered:

* Avoid duplicate API calls across component lifecycles
* Debouncing input-driven requests
* Caching strategies for repeated calls
* Fetch controller cancellation
* Event-driven data loading

---

## 🌍 Localization (i18n)

PASS2RENT components rely on **Lit localization utilities**.

Official Lit localization guide:
[https://lit.dev/docs/localization/overview/#config-file](https://lit.dev/docs/localization/overview/#config-file)

This includes:

* `lit-localize.json` configuration
* Message extraction
* Runtime locale switching
* Bundled vs. runtime translation options

---

## 💳 Stripe Integration

PASS2RENT uses Stripe for payments, and partners may want to customize the payment UI or integrate additional Stripe elements.

### Stripe Web Component

Highly recommended Stripe + Lit Web Component utilities:
[https://github.com/bennypowers/stripe-elements](https://github.com/bennypowers/stripe-elements)

Useful for embedding:

* Payment forms
* Elements styling
* Stripe Elements controller

### Stripe JS SDK

Official Stripe JavaScript documentation:
[https://docs.stripe.com/js](https://docs.stripe.com/js)

Covers:

* `stripe.confirmPayment()`
* Payment intent setup
* Error handling
* PCI compliance guidelines

---

## 🗺️ Mapbox Search Integration

PASS2RENT booking flow may optionally include address search or place selection.

Mapbox Search JS Guides:

* Overview: [https://docs.mapbox.com/mapbox-search-js/guides/](https://docs.mapbox.com/mapbox-search-js/guides/)
* Web Integration Guide: [https://docs.mapbox.com/mapbox-search-js/guides/search/web/](https://docs.mapbox.com/mapbox-search-js/guides/search/web/)

These provide:

* Autocomplete address search
* Reverse geocoding
* Drop-in components
* Rate-limit & access token best practices

---

## 🧾 VAT Validation (EU VIES)

Some business flows (B2B rentals, invoicing, compliance) may require validation of EU VAT numbers.

Official VIES resources:

* Technical Documentation:
  [https://ec.europa.eu/taxation_customs/vies/#/technical-information](https://ec.europa.eu/taxation_customs/vies/#/technical-information)

* SOAP WSDL:
  [https://ec.europa.eu/taxation_customs/vies/services/checkVatService.wsdl](https://ec.europa.eu/taxation_customs/vies/services/checkVatService.wsdl)

* REST API example:
  [https://ec.europa.eu/taxation_customs/vies/rest-api/ms/LT/vat/LT100007475019](https://ec.europa.eu/taxation_customs/vies/rest-api/ms/LT/vat/LT100007475019)

### SOAP Request Example

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:urn="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
  <soapenv:Header/>
  <soapenv:Body>
    <urn:checkVat>
      <urn:countryCode>LT</urn:countryCode>
      <urn:vatNumber>100007475019</urn:vatNumber>
    </urn:checkVat>
  </soapenv:Body>
</soapenv:Envelope>
```

### SOAP Response Example

```xml
<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
  <env:Header/>
  <env:Body>
    <ns2:checkVatResponse 
      xmlns:ns2="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
      <ns2:countryCode>LT</ns2:countryCode>
      <ns2:vatNumber>100005451818</ns2:vatNumber>
      <ns2:requestDate>2024-11-18+01:00</ns2:requestDate>
      <ns2:valid>true</ns2:valid>
      <ns2:name>UAB "ODIFIS"</ns2:name>
      <ns2:address>
        Ausros g. 56-3, LT-28147 Utena
      </ns2:address>
    </ns2:checkVatResponse>
  </env:Body>
</env:Envelope>
```

These examples help developers understand the format and what data can be parsed to validate companies during rental workflow.

---

## 📦 Publishing to NPM (for contributors)

Guide for creating or updating the npm package:
[https://www.freecodecamp.org/news/how-to-create-and-publish-your-first-npm-package/](https://www.freecodecamp.org/news/how-to-create-and-publish-your-first-npm-package/)

Includes:

* Versioning
* `package.json` configuration
* Publishing workflow
* Handling npm access tokens
