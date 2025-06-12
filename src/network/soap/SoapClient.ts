import axios from 'axios';
import {encode} from 'base-64';
import {UAT_URL, BASE_URL_PATH} from '@constants/Contants';

export const SoapClient = async (soapRequest: any, soapAction: any) => {
  try {
    const response = await axios.post(UAT_URL + BASE_URL_PATH, soapRequest, {
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: soapAction,
        Authorization: 'Basic ' + encode('Admin:Pass@135'), // Use base-64 encoding
      },
    });
    return response; // Return raw XML response
  } catch (error) {
    throw console.log('Error calling SOAP service:', error);
  }
};
