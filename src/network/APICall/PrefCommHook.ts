import { useEffect, useState } from 'react';
import { getAPIClient, PC_AUTH_HEADER, PC_CONSENT_HEADER, PCAuth, postAPIClient } from './APIClient';
import { AUTH_COMM_PREF, PC_CONSENT } from '@constants/Contants';
import { useEncryptedConfig } from '@services/utils/LocalStore/ConfigeStore';

export const useFetchPrefComm = () => {

    const { configData } = useEncryptedConfig();

    const PC_AUTH_PARAM: PCAuth = {
        grant_type: 'client_credentials',
        client_id: configData?.onetrust_consent_info?.client_id,
        client_secret: configData?.onetrust_consent_info?.client_secret,
    }

    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [apiError, setApiError] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {

                // Step 1: Fetch Auth Token
                const authResponse: any = await postAPIClient(AUTH_COMM_PREF, PC_AUTH_PARAM, PC_AUTH_HEADER);

                // Step 2: Now fetch consent using the auth token
                const token: string = authResponse?.access_token;
                if (token) {
                    const header = await PC_CONSENT_HEADER(token)
                    try {
                        const consentResponse = await getAPIClient(PC_CONSENT, header);
                        setData(consentResponse)
                    } catch (error: any) {
                        setApiError(error)
                    }
                }
            } catch (error) {
                setError(error);
                console.error('Error in auth or consent fetch:', error);
            }
        };
        fetchData();
    }, [])

    return { data, error, apiError };
}