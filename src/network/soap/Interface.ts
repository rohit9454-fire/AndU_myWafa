export interface User {
  mobileNo: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: number;
}

export interface UserDetails {
  AccountNo: string;
  Name: string;
  mobile: string;
}

export interface AccountPoints {
  AccountNo: string;
  'Total points available': string;
  'Total points earned': string;
  'Total points expired': string;
  'total points redeemed': string;
}

export interface KeyData {
  key: string;
  value: string;
}
export interface MyPointsProps {
  AccountNo: string;
  'Total points available': string;
  'Total points earned': string;
  'Total points expired': string;
  'total points redeemed': string;
}

export interface PointsData {
  AccountNo: string;
  'Order Id': string;
  "Entry Type": string;
  Date: string;
  Points: number;
  "Store Code": string;
  "Gross Amount": number;
}

export interface MMCard {
  mMCard: string;
  loyType: number;
  getBalanceOnlyFlag: boolean;
  currCode: string;
  countryCode: string;
  firstName: string;
  lastName: string;
}

export interface MMCardResponse {
  IsSuccess: string;
  conversionfactor: string;
  loyaltyType: string;
  memberAddress: string;
  memberAddress1: string;
  memberAnniversary: string;
  memberCard: string;
  memberCountry: string;
  memberEmail: string;
  memberMarital: string;
  memberName: string;
  memberPointBalance: string;
  membercity: string;
  memberdob: string;
  membergender: string;
  memberphone: string;
  memberpostcode: string;
  newMember: string;
}

export interface HistoryItem {
  Date: string;
  "Net Amount": number;
  "VAT Amount": number;
  "Gross Amount": number;
  "Points": number;
  "Entry Type": string;
  "Store Code": string;
  'Order Id': string;
  'Vat Amount': string;
}

export interface ConsentData {
  dsDataElements: DsDataElements;
  identifier: string;
  purposes: Purpose[];
  requestInformation: string;
}

export interface DsDataElements {
  Source: string;
  Name: string;
  Email: string;
  Brand: string;
  "WhatsApp Number": string;
  Mobile: string;
}

export interface Purpose {
  TransactionType: string;
  Id: string;
  CustomPreferences: CustomPreference[];
}

export interface CustomPreference {
  Options: string[]; // array of Ids (UUIDs)
  Id: string;
}

export interface OneTrustConsentInfo {
  client_id: string;
  client_secret: string;
  purpose_ID: string;
  custom_preference_ID: string;
  options: string[];
  consentOptions: ConsentOption[];
  requestInformation: string;
}

export interface ConsentOption {
  consentId: string;
  name: string;
  nameArabic: string;
}

