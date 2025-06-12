import { initializeApp, getApp } from '@react-native-firebase/app';
import { recordError } from '@react-native-firebase/crashlytics';



const firebaseConfigDev = {
    apiKey: Platform.OS === 'ios' ? "AIzaSyD1hV6StKfwgv1qj9FoC4QGdIJNDSkTdEY" : "AIzaSyBb3IDGSe6ezydPnOILnugOnrTBgToVxoM",
    authDomain: "aswaaqloyalty.firebaseapp.com",
    projectId: "com.gmg.loyalty.dev",
    databaseURL: "",
    messagingSenderId: "",
    storageBucket: "",
    appId: Platform.OS === 'ios' ? "com.gmg.loyalty.dev" : "com.gmg.loyalty.dev",
    measurementId: "G-measurement-id",
};

export const initializeFirebase = async () => {
    let app;
    try {
        app = getApp();
    }
    catch (error) {
        app = initializeApp(firebaseConfigDev);
    }
    console.log('projectId ',app?._options?.projectId);
}

export const triggerCrash = () => {
    throw new Error("Crash For Test");
};

export const errorRecorder = (error) => {
    console.log('Error Message Record');
    recordError(error);
};