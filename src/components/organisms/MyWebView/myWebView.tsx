import React, { useRef, useState } from "react"
import { Platform } from "react-native";
import WebView from "react-native-webview"

export const MyWebView = ({ link }: { link: string }) => {
  const [loader, setLoader] = useState<boolean>(true);
  const script = `
  setTimeout(function() {
    var element = document.querySelector('[data-elementor-type="header"]');
    if (element) {
        element.style.display = "none";
        window.ReactNativeWebView.postMessage("Header hidden successfully");
      } else {
        window.ReactNativeWebView.postMessage("Header element not found");
      }
  }, 800);
  true;
`;
  const androidScript = `
  (function() {
    var style = document.createElement('style');
    style.innerHTML = '[data-elementor-type="header"] { display: none !important; }';
    document.head.appendChild(style);
 
    function hideHeader() {
      var element = document.querySelector('[data-elementor-type="header"]');
      if (element) {
        element.style.display = "none";
        console.log("Header hidden successfully");
      } else {
        setTimeout(hideHeader, 500);
      }
    }
    setTimeout(hideHeader, 500);
  })();
  true;
`;

  return (<WebView
    source={{ uri: link }}
    injectedJavaScript={Platform.OS === 'android' ? androidScript : script}
    injectedJavaScriptBeforeContentLoaded={Platform.OS === 'android' ? androidScript : script}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={loader}
    onMessage={(event) => {
      console.log("WebView Message:", event.nativeEvent.data);
      setLoader(false)
    }}
  />
  )
}