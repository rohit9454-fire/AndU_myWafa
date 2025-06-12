import {
  CREATE_CUSTOMER_SOAP_ACTION,
  GET_CUSTOMER_SOAP_ACTION,
  GET_POINTS_HISTORY_SOAP_ACTION,
  GET_POINTS_LEDGER_SOAP_ACTION,
  GET_POINTS_SOAP_ACTION,
  GET_TRANSACTION_HISTORY_SOAP_ACTION,
} from '@constants/Contants';
import {SoapClient} from '@network/soap/SoapClient';
import {
  createCustomerRequest,
  getCustomerRequest,
  getPointsHistoryRequest,
  getPointsLedgerListRequest,
  getPointsRequest,
  getTransactionsHistoryRequest,
} from '@network/soap/SoapRequests';
import {parseSoapResponse} from '@network/soap/SoapResponseParser';
import {User} from './Interface';
import {Alert} from 'react-native';
import { errorRecorder } from '@services/utils/firebase';

// Full service call for CreateCustomer
export const createCustomerService = async (user: User) => {
  try {
    const soapRequest = createCustomerRequest(user);
    const soapAction = CREATE_CUSTOMER_SOAP_ACTION;
    const response = await SoapClient(soapRequest, soapAction);
    const parsedResponse = await parseSoapResponse(response);
    return parsedResponse;
  } catch (error: any) {
    Alert.alert('Error in Registration', error);
  }
};

// Get Points Request
export const getPointsService = async (mobileNumber: string) => {
  const mobileNo = mobileNumber;
  try {
    const soapRequest = getPointsRequest(mobileNo);
    const soapAction = GET_POINTS_SOAP_ACTION;
    if(soapRequest){
      const response = await SoapClient(soapRequest, soapAction);
      const parsedResponse = await parseSoapResponse(response);
      return parsedResponse;
    }
  } catch (error: any) {
    errorRecorder(error);
    Alert.alert('Error in GetPoints', error);
  }
};

// Get PointsHistory Request
export const getPointsHistoryService = async (mobileNumber: string) => {
  const mobileNo = mobileNumber;
  try {
    const soapRequest = getPointsHistoryRequest(mobileNo);
    const soapAction = GET_POINTS_HISTORY_SOAP_ACTION;
    const response = await SoapClient(soapRequest, soapAction);
    const parsedResponse = await parseSoapResponse(response);
    return parsedResponse;
  } catch (error: any) {
    errorRecorder(error);
    Alert.alert('Error in GetPointsHistory', error);
    throw error;
  }
};

// Get Transaction History Request
export const getTransactionHistoryService = async (mobileNumber: string) => {
  const mobileNo = mobileNumber;
  try {
    const soapRequest = getTransactionsHistoryRequest(mobileNo);
    const soapAction = GET_TRANSACTION_HISTORY_SOAP_ACTION;
    const response = await SoapClient(soapRequest, soapAction);
    const parsedResponse = await parseSoapResponse(response);
    return parsedResponse;
  } catch (error) {
    errorRecorder(error);
    console.error('Error in Transaction History:', error);
    throw error;
  }
};

// Get Points Ledger List Request
export const getPointsLedgerService = async (mobileNumber: string) => {
  const mobileNo = mobileNumber;
  try {
    const soapRequest = getPointsLedgerListRequest(mobileNo);
    const soapAction = GET_POINTS_LEDGER_SOAP_ACTION;
    const response = await SoapClient(soapRequest, soapAction);
    const parsedResponse = await parseSoapResponse(response);
    return parsedResponse;
  } catch (error) {
    errorRecorder(error);
    console.error('Error in Transaction History:', error);
    throw error;
  }
};

export const getResponseResult = async (res: any) => {
  const soapBody = res['Soap:Envelope']?.['Soap:Body'];
  if (!soapBody) {
    return [];
  }
  for (const methodResult of soapBody) {
    for (const key in methodResult) {
      const methodData = methodResult[key];
      if (Array.isArray(methodData)) {
        const returnValue = methodData[0]?.return_value;
        if (returnValue) {
          try {
            const parsedResponse = JSON.parse(returnValue[0]);
            if (parsedResponse && typeof parsedResponse === 'object') {
              return parsedResponse;
            } else {
              return returnValue[0];
            }
          } catch (error) {
            console.error('Failed to parse JSON:', error);
            return returnValue[0];
          }
        }
      }
    }
  }
  return [];
};
