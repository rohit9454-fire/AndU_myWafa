import {MM_BASE_URL_PATH, UAT_URL} from '@constants/Contants';
import axios from 'axios';
import {encode} from 'base-64';

export const SoapMMClient = async (soapRequest: any, soapAction: any) => {
  try {
    const response = await axios.post(UAT_URL+ MM_BASE_URL_PATH, soapRequest, {
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: soapAction,
        Authorization: 'Basic ' + encode('Admin:Pass@135'), // Use base-64 encoding
      },
    });
    return response; // Return raw XML response
  } catch (error) {
    throw console.log('Error calling MM SOAP service:', error);
  }
};
