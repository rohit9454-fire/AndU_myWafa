import {User} from './Interface';

// General function to create XML request for any SOAP API
export const createSoapRequest = (
  operation: string,
  params: Record<string, string | number>
) => {
  // Building XML dynamically using provided operation and parameters
  let bodyContent = Object.entries(params)
    .map(([key, value]) => `<web:${key}>${value}</web:${key}>`)
    .join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                     xmlns:web="urn:microsoft-dynamics-schemas/codeunit/WafaloyaltyAPI">
      <soapenv:Header/>
      <soapenv:Body>
         <web:${operation}>
            ${bodyContent}
         </web:${operation}>
      </soapenv:Body>
   </soapenv:Envelope>`;
};

// Specific function for CreateCustomer Request
export const createCustomerRequest = (user: User) => {
  const {mobileNo, firstName, lastName, email, gender} = user;
  return createSoapRequest('createCustomer', {
    mobileNo,
    firstName,
    lastName,
    email,
    gender,
  });
};

// fetch Customer Request
export const getCustomerRequest = (mobileNo: string) => {
  return createSoapRequest('getCustomer', {
    mobileNo,
  });
};

// fetch Customer Points
export const getPointsRequest = (mobileNo: string) => {
  return createSoapRequest('getPoints', {
    mobileNo,
  });
};

// fetch Customer Points History
export const getPointsHistoryRequest = (mobileNo: string) => {
  return createSoapRequest('getPointsHistory', {
    mobileNo,
  });
};

// fetch Transaction History
export const getTransactionsHistoryRequest = (mobileNo: string) => {
  return createSoapRequest('gettransactionHistory', {
    mobileNo,
  });
};

// fetch Points Ledger List
export const getPointsLedgerListRequest = (mobileNo: string) => {
  return createSoapRequest('getPointsLedgerlist', {
    mobileNo,
  });
};
