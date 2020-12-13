import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
// import * as firebase from "firebase";
// import "firebase/firestore";
import Loading from "./../components/Loading";
import { getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";

const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    let users = await getDataJSON('users')
    if (Name && SID && Email && Password) {
      if (users) {
        storeDataJSON('users', [
          ...users,
          {
            Name,
            SID,
            Email,
            Password,
          },
        ])
        setIsLoading(false)
        props.navigation.navigate('SignIn')
      } else {
        
        storeDataJSON('users', [
          {
            Name,
            SID,
            Email,
            Password,
          },
        ])
        setIsLoading(false)
        props.navigation.navigate('SignIn')
      }
    }
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.viewStyle}>
        <Card>
          <Card.Title>Welcome to My Blog!</Card.Title>
          <Card.Divider />
          <Input
            leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
            placeholder="Name"
            onChangeText={function (currentInput) {
              setName(currentInput);
            }}
          />
          <Input
            leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
            placeholder="Student ID"
            onChangeText={function (currentInput) {
              setSID(currentInput);
            }}
          />
          <Input
            leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
            placeholder="E-mail Address"
            onChangeText={function (currentInput) {
              setEmail(currentInput);
            }}
          />

          <Input
            placeholder="Password"
            leftIcon={<Feather name="key" size={24} color="black" />}
            secureTextEntry={true}
            onChangeText={function (currentInput) {
              setPassword(currentInput);
            }}
          />

          <Button
            icon={<AntDesign name="user" size={24} color="white" />}
            title="  Sign Up!"
            type="solid"
          onPress={() => {
                  setIsLoading(true);
                  handleSubmit()
            }}
          />
          <Button
            type="clear"
            icon={<AntDesign name="login" size={24} color="dodgerblue" />}
            title="  Already have an account?"
            onPress={function () {
              props.navigation.navigate("SignIn");
            }}
          />
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
  },
});
export default SignUpScreen;