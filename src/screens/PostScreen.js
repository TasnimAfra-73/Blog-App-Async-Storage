import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import CommentCard from "./../components/CommentCard";
import HeaderHome from "../components/HeaderHome";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
// import * as firebase from "firebase";
// import "firebase/firestore";
import dayjs from "dayjs";

const PostScreen = (props) => {
  console.log(props);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    // firebase
    //   .firestore()
    //   .collection("posts")
    //   .orderBy("created_at", "desc")
    //   .onSnapshot((querySnapshot) => {
    //     let temp_posts = [];
    //     querySnapshot.forEach((doc) => {
    //       temp_posts.push({
    //         data: doc.data(),
    //       });
    //     });
    //     setPosts(temp_posts);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     alert(error);
    //   });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
            <Text h4Style={{ padding: 10 }} h4>
              Tasnim
          {props.author}
        </Text>
      </View>
      <Text
        style={{
          paddingVertical: 10,
          fontStyle: "italic"
        }}
      >
        {dayjs(props.date).format('[Posted on] DD MMM, YYYY')}
      </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
          
        {/* {props.body} */}
      </Text>
      <Card.Divider />
          <Text>{` 10 Likes, 1 Comments`}</Text>
          <Card.Divider />
           <Card>
        <Input
          placeholder='Write Something!'
          leftIcon={<Entypo name='pencil' size={24} color='black' />}
          // onChangeText={currentInput => {
          //   storeData('comment', currentInput)
          // }}
        />
        <Button title='Comment' />
          </Card>
                    <ActivityIndicator size="large" color="red" animating={loading} />


           <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <CommentCard
                name={item.userHandle}
                date={item.createdAt}
                body={item.body}
              />
            )
          }}
          keyExtractor={item => item.createdAt}
        />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default PostScreen;