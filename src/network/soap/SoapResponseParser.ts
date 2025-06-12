import {parseString} from 'xml2js';

// Function to parse SOAP response XML and extract relevant data
export const parseSoapResponse = (xmlResponse: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Parsing the XML response to JSON using xml2js
    parseString(xmlResponse.data, (err: any, result: any) => {
      if (err) {
        // Rejecting the promise with an error if XML parsing fails
        reject('Error parsing XML response');
      } else {
        try {
          // Using optional chaining to avoid errors when data is missing
          if (result) {
            // Resolve with the extracted value if present
            resolve(result);
          } else {
            // Reject with a custom error message if return_value is missing
            reject('Return value is missing from response');
          }
        } catch (error) {
          // Handling any unexpected errors during extraction
          reject('Error extracting data from response');
        }
      }
    });
  });
};
