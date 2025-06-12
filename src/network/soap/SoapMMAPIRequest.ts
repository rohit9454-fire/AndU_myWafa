import {MMCard, User} from './Interface';

// General function to create XML request for any MM SOAP API
export const createMMSoapRequest = (
  operation: string,
  params: Record<string, string | number | boolean>
) => {
  // Building XML dynamically using provided operation and parameters
  let bodyContent = Object.entries(params)
    .map(([key, value]) => `<web:${key}>${value}</web:${key}>`)
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                     xmlns:web="urn:microsoft-dynamics-schemas/codeunit/MMAPISOAP">
      <soapenv:Header/>
      <soapenv:Body>
         <web:${operation}>
            ${bodyContent}
         </web:${operation}>
      </soapenv:Body>
   </soapenv:Envelope>`;
};

// Specific function for CreateCustomer Request of MM-API-SOAP
export const createCustomerMMRequest = (user: User) => {
  const {mobileNo, firstName, lastName, email, gender} = user;
  return createMMSoapRequest('CreateCustomerAPI', {
    mobileNo,
    firstName,
    lastName,
    email,
    gender,
  });
};

// Specific function for GetMMCard Request of MM-API-SOAP

export const getMMCardRequest = (cardDetails: MMCard) => {
  const {
    mMCard,
    loyType,
    getBalanceOnlyFlag,
    firstName,
    lastName,
    countryCode,
    currCode,
  } = cardDetails;

  return createMMSoapRequest('GetMMCardv1', {
    mMCard,
    loyType,
    getBalanceOnlyFlag,
    countryCode,
    currCode,
    firstName,
    lastName,
  });
};
