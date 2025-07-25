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
  APP_ID: "277818a1105e198a",
  REGION: "US",
  AUTH_KEY: "4fae68863cb699ed154ed213d2ca38566f111434",
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