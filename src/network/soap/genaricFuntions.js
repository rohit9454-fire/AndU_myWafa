/* eslint-disable no-useless-escape */
import axios from "axios";
export const parseMalformedJSON = inputString => {
  try {
    const fixedString = inputString
      .replace(/}\"\"/g, '","')
      .replace(/\"\s*\"/g, '","')
      .replace(/({|,)\s*([^:"]+)\s*:/g, '$1"$2":');
    const jsonObject = JSON.parse(fixedString);
    return jsonObject;
  } catch (error) {
    console.error('Error parsing JSON at 11:', error);
    return null; // Return null if parsing fails
  }
};

export const parseMalJSON = input => {
  try {
    input = input.replace(/]}$/, '');
    const fixedStr = input.replace(/""/g, '", "');
    const jsonData = JSON.parse(fixedStr);
    return jsonData;
  } catch (error) {
    console.error('Invalid JSON string:', error.message);
    return null;
  }
};

export const KeyValueConvertor = data => {
  try {
    const keyValuePairs = Object.entries(data).map(([key, value]) => ({
      key,
      value,
    }));
    return keyValuePairs;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null; // Return null if parsing fails
  }
};