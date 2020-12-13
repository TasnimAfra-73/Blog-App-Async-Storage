import React from "react";
import { View, StyleSheet, Image, Button } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "./../components/HeaderHome";
const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
            
          />
          <Image
        style={styles.logo}
        source={require("./../../assets/Profile.jpg")}
      />
          <Text style={styles.textStyle}>Tasnim</Text>
          <Button
            title= "Delete Profile"
          
          />
      <Text style={styles.textStyle}>Born on: 5th July 1998</Text>
      <Text style={styles.textStyle}>Address: Dhanmondi</Text>
      <Text style={styles.textStyle}>Works at: mainlycoding.com</Text>


        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
 textStyle: {
    fontSize: 23,
    color: "black",
    paddingTop: 20,
  },
  viewStyle:{ alignItems: "center" },
  logo: {
    // paddingTop:60,
    width: 150,
    height: 200,
  },
});

export default ProfileScreen;