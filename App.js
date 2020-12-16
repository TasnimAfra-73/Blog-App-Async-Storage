import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./src/navigation/AuthStack";
import AppDrawerScreen from "./src/navigation/AppDrawer";
import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
//import * as firebase from "firebase";

// const firebaseConfig = {
//     apiKey: "AIzaSyD6GXGq119po9uSzvAihSloFqRedtofCzE",
//     authDomain: "blogapp-6f007.firebaseapp.com",
//     databaseURL: "https://blogapp-6f007.firebaseio.com",
//     projectId: "blogapp-6f007",
//     storageBucket: "blogapp-6f007.appspot.com",
//     messagingSenderId: "62127598850",
//     appId: "1:62127598850:web:7e4d86ad7840c3167da61b"
//   };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

function App() {
  return (

    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {/* <AppDrawerScreen /> */}
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
