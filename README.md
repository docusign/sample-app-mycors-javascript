# CORS Sample Application: React

## Introduction

The CORS Sample App is a Docusign sample application that shows how to construct Single Page Applications (SPAs) that leverage Docusign support for Cross-Origin Resource Sharing (CORS). This sample application is created using React.js. You can find a live instance running at [https://cors.sampleapps.docusign.com/](https://cors.sampleapps.docusign.com/).

The CORS Sample App demonstrates the following:

1. **Authentication** with Docusign via [Implicit Grant](https://developers.docusign.com/platform/auth/implicit/).
2. **Send Insurance Card:**
   This example uses the Docusign [eSignature REST API](https://developers.docusign.com/docs/esign-rest-api/) to request a signature by email with [Document Generation](https://developers.docusign.com/docs/esign-rest-api/how-to/request-signature-email-document-generation/) using a predefined template in docx format.
3. **Know Your Customer:**
   This example uses the Docusign [eSignature REST API](https://developers.docusign.com/docs/esign-rest-api/) to request a signature through your application using [Embedded Signing](https://developers.docusign.com/docs/esign-rest-api/how-to/request-signature-in-app-embedded/).

## Prerequisites

- Create a Docusign [Developer Account](https://www.docusign.com/developers/sandbox).
- Create an application on the [Apps and Keys](https://admindemo.docusign.com/authenticate?goTo=appsAndKeys) page.
- Set Authentication Method for your application to Implicit Grant. Under User Application: Is your application able to securely store a client secret, select No.

- Add redirect URIs:
  - `{ PROTOCOL }://{ DOMAIN }/`
  - `{ PROTOCOL }://{ DOMAIN }/oauth-response-handler/`
  - `{ PROTOCOL }://{ DOMAIN }/ds-response-handler/`
- Update CORS Configuration:

  - Origin URLs: `{ PROTOCOL }://{ DOMAIN }`
  - Allowed HTTP Methods: GET, POST, PUT

- Installed and configured [Node.js](https://nodejs.org/en/download)
- Installed and configured [Docker](https://www.docker.com/)

### Variables configuration

Create a copy of the file .env.example, save the copy as .env, and fill in the data:

- REACT_APP_OAUTH_CLIENT_ID - integration key of the application created in section "Create an application on the Apps and Keys page" above (GUID)
- REACT_APP_OAUTH_RETURN_URL - internal redirection URL that is used during the authentication
- REACT_APP_DS_RETURN_URL - internal redirection URL that is used during the enbedded signing process

## Local installation instructions (without Docker)

1. Clone the git repository to your local machine.
2. Open a terminal in /sample-app-mycors-javascript directory.
3. Install required application packages runing the following command in the terminal:
   ```
   npm install
   ```
4. Start the application runing the following command in the terminal:

   ```
   npm start
   ```

5. Open a browser to [localhost:3000](http://localhost:3000) (if the page is not openned automatically after step #4).

## Local installation instructions (using Docker)

1. Clone the git repository to your local machine.
2. Open a terminal in /sample-app-mycors-javascript directory.
3. Build the docker image runing the following command in the terminal:
   ```
   docker build -t docusign_sample_mycors .
   ```
4. Start the application (run the Docker container) with the following command in the terminal:

   ```
   docker run -p 80:80 -d docusign_sample_mycors
   ```

5. Open a browser to [localhost](http://localhost)

## License information

This repository uses the MIT License. See the [LICENSE](./LICENSE) file for more information.
