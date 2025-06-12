export type RootDrawerParamList = {
  Home: undefined;
  FindUs: undefined;
  Suggestion: undefined;
  FrequentlyAskQuestions: undefined;
  TermCondition: undefined;
  SettingsNav: undefined;
  About: undefined;
  HomeTabs: undefined;
  Login: undefined;
  PrivacyPolicy:undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

export type StackParamList = {
  Splash: undefined;
  Language: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Main: undefined;
  Drawer: undefined;
  CommunicationPreference: undefined;
  Otp: {
    fromScreen: 'Login' | 'Register';
    userDetails?: {
      mobileNo: string;
      firstName: string;
      lastName: string;
      email: string;
      gender: number;
    };
    cardDetails?: {
      mMCard: string;
      loyType: number;
      getBalanceOnlyFlag: boolean;
      currCode: string;
      countryCode: string;
      firstName: string;
      lastName: string;
    };
  };
};

export type SettingsNavList = {
  Settings: undefined;
  LanguageSettings: undefined;
  CommunicationPreference: undefined;
};

export type HomeNavList = {
  HomeScreen: undefined;
  myAccount: undefined;
  myPoints: undefined;
  history: undefined;
  ProfileUpdate: undefined;
};

export type ProfileNavList = {
  ProfileScreen: undefined;
  ProfileUpdate: undefined;
};
