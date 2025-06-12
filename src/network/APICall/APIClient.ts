import api from "@network/APICall/interceptor";
import { ConsentData } from "@network/soap/Interface";

export const PC_AUTH_HEADER = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
}

export const PC_CONSENT_HEADER = (token: string) => ({
  headers: {
    "identifier": "001UE00000GRJJxYAP",
    "Authorization": `Bearer ${token}`, // Dynamically inject token
    "Content-type": "application/json",
  },
});

export const PC_SUBMIT_CONSENT_HEADER = {
  "Content-Type" : "application/json"
}

export interface PostRequestPayload {
  number: string;
  hash: string;
  otp?: string;
}

export interface PCAuth {  
    grant_type: string
    client_id: string,
    client_secret: string,
}

export const getAPIClient = async (url: string, headers?: Record<string, any>) => {
  try {
    const res = await api.get(url, headers);
    return res.data;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error; // Re-throwing to handle errors in calling functions
  }
};


export const postAPIClient = async <T>(url: string, params: PostRequestPayload | PCAuth | ConsentData, config?: Record<string, any>): Promise<T> => {
  try {
    const response = await api.post<T>(url, params, config);
    return response.data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error; // Re-throwing for handling in calling functions
  }
};
