import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { setupLocalization } from "./CometChat/utils/utils.ts";
import { CometChatProvider } from "./CometChat/context/CometChatContext";

export const COMETCHAT_CONSTANTS = {
  APP_ID: "2778696c201acebc",
  REGION: "US",
  AUTH_KEY: "f16ac72e35f89c4ca0af946efe8e9c0e17416e45",
};

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

  CometChatUIKit.init(uiKitSettings)?.then(() => {
    setupLocalization();
  
    const UID = "cometchat-uid-1"; // Replace with your actual UID
  
    CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
      if (!user) {
        CometChatUIKit.login(UID)
          .then((loggedUser: CometChat.User) => {
            console.log("Login Successful:", loggedUser);
            // Mount your app
            ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
              <CometChatProvider>
                <App />
              </CometChatProvider>
            );
          })
          .catch((error) => console.error("Login Failed:", error));
      } else {
        // User already logged in, mount app directly
        console.log("User already logged in:", user);
        ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
          <CometChatProvider>
            <App />
          </CometChatProvider>
        );
      }
    });
  });