export const PASSWORD_POLICY = [
  ' Have at least one capital letter',
  ' Have at least one small letter',
  ' Have at least one number',
  ' Have at least one special character',
  ' Password length should be 8-12 characters',
];

export const STORE_LIST = [
  {
    "sap_store_code": "A001",
    "store_name": "ASWAAQ HYPER - NADD AL HAMAR",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A002",
    "store_name": "ASWAAQ HYPER - AL MIZHAR",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A003",
    "store_name": "ASWAAQ HYPER - UMM SUQEIM",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A004",
    "store_name": "ASWAAQ HYPER - AL WARQA",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A101",
    "store_name": "ASWAAQ SUPER - AL BARSHA",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A102",
    "store_name": "ASWAAQ SUPER - NAD AL SHEBA",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A103",
    "store_name": "ASWAAQ SUPER - AL QUOZ",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A104",
    "store_name": "ASWAAQ SUPER - DEIRA WATERFRONT",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A201",
    "store_name": "ASWAAQ EXPRESS - AL SOFOUH",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A203",
    "store_name": "ASWAAQ EXPRESS - AL BADAA",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A204",
    "store_name": "ASWAAQ EXPRESS - THE GREENS",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A205",
    "store_name": "ASWAAQ EXPRESS - HATTA",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A207",
    "store_name": "ASWAAQ EXPRESS - JUMEIRAH VILLAGE CIRCLE",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A208",
    "store_name": "ASWAAQ EXPRESS - AL BARSHA MART",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A209",
    "store_name": "ASWAAQ EXPRESS - AL WARQAA MART",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A210",
    "store_name": "ASWAAQ EXPRESS - THE MALL JUMEIRAH",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A212",
    "store_name": "ASWAAQ EXPRESS - AL QUSAIS",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A213",
    "store_name": "ASWAAQ EXPRESS - AJMAN HAMDIYA",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A214",
    "store_name": "ASWAAQ EXPRESS - JVC AMSA",
    "store_name_ar": ""
  },
  {
    "sap_store_code": "A215",
    "store_name": "ASWAAQ EXPRESS - DUBAI METRO",
    "store_name_ar": ""
  }
]


export const APP_CONSTANTS = {
  UAE_COUNTRY_CODE: '971',
  OTP_TIMER:30,
  VALIDATE_OTP: 'validate-otp',
  SEND_OTP: 'send-otp',
};

export const channels = [
  'Select All Channels',
  'SMS',
  'Email',
  'WhatsApp',
];

export const channelsAr = [
  'اختر جميع القنوات',
  'رسائل نصية',
  'بريد إلكتروني',
  'واتساب',
];

export const LOCAL_STORAGE_KEY ={
  OTP_VERIFY_KEY: 'otpValidation',
  LANG_BOOLEAN_KEY:'isLangSelect',
  CONFIG_KEY:'config',
  USER_DATA:'userData',
  PC_AUTH_TOKEN: "pcAuthToken",
  PC_CONSENT_RESPONSE: "pcConsentResponse",
  TRANSACTION_DATA:'TransactionDetails'
}

export const secretKey = "djVyS2J1eFFFK1JUNzRJbWRPRFRNdz09"; // Base64 encoded key
export const salt = "ASWAAQ_OTP_SALT_2024";
export const ECOMM_BASE_URL = 'https://ecom-omnilink-test-api-gateway.gmg.com/omni-link/wafa-otp/';
export const IOS_APP_STORE_URL = 'https://itunes.apple.com/in/lookup?bundleId=com.ssports.ios';
export const UAT_URL = 'http://20.203.120.135:8047/GMGUAT/WS/GMGGroup/Codeunit/';
export const REST_UAT_URL = 'http://loyalty.gmg.com:444/api/values/point_detail?mphone=';

export const BASE_URL_PATH = 'WafaloyaltyAPI';
export const ACTION_URL = 'urn:microsoft-dynamics-schemas/codeunit/';
export const CREATE_CUSTOMER_SOAP_ACTION = ACTION_URL + BASE_URL_PATH + ':createCustomer';
export const GET_CUSTOMER_SOAP_ACTION = ACTION_URL + BASE_URL_PATH + ':getCustomer';
export const GET_POINTS_SOAP_ACTION = ACTION_URL + BASE_URL_PATH + ':getPoints';
export const GET_POINTS_HISTORY_SOAP_ACTION = ACTION_URL + BASE_URL_PATH + ':getPointsHistory_Result';
export const GET_TRANSACTION_HISTORY_SOAP_ACTION = ACTION_URL + BASE_URL_PATH + ':gettransactionHistory_Result';``
export const GET_POINTS_LEDGER_SOAP_ACTION = ACTION_URL  +BASE_URL_PATH + ':getPointsLedgerlist_Result';

// Communication Preferences
export const AUTH_COMM_PREF = 'https://uat-de.onetrust.com/api/access/v1/oauth/token';
export const PC_CONSENT = 'https://uat-de.onetrust.com/rest/api/preferences/v3/datasubjects/profile';
export const PC_SUBMIT_CONSENT = 'https://privacyportaluatde.onetrust.com/request/v1/consentreceipts';

// MM-API-SOAP
export const MM_BASE_URL_PATH = 'MMAPISOAP';
export const GET_MM_CARD = ACTION_URL + MM_BASE_URL_PATH +':GetMMCard_Result';
