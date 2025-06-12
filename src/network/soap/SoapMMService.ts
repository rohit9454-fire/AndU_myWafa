import {CREATE_CUSTOMER_SOAP_ACTION, GET_MM_CARD} from '@constants/Contants';
import {MMCard, User} from './Interface';
import {createCustomerMMRequest, getMMCardRequest} from './SoapMMAPIRequest';
import {Alert} from 'react-native';
import {SoapMMClient} from './SoapMMClient';
import {parseSoapResponse} from './SoapResponseParser';
import { errorRecorder } from '@services/utils/firebase';

// CreateCustomer API for MM-API-SOAP
export const createCustomerMMService = async (user: User) => {
  try {
    const soapRequest = createCustomerMMRequest(user);
    const soapAction = CREATE_CUSTOMER_SOAP_ACTION;
    const response = await SoapMMClient(soapRequest, soapAction);
    const parsedResponse = await parseSoapResponse(response);
    return parsedResponse;
  } catch (error: any) {
    errorRecorder(error);
    Alert.alert('Error in MM-API-SOAP Registration', error);
  }
};

// GetMMCard API for Login or check user Exist or Not
export const getMMCardService = async (card: MMCard) => {
  try {
    const soapRequest = getMMCardRequest(card);
    const soapAction = GET_MM_CARD;
    const response = await SoapMMClient(soapRequest, soapAction);
    const parsedResponse = await parseSoapResponse(response);
    return parsedResponse;
  } catch (error: any) {
    errorRecorder(error);
    Alert.alert('Error in Get MM Card', error);
    throw error;
  }
};
