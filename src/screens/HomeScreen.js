import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Card, Button, Text, Avatar, Input } from 'react-native-elements'
import PostCard from './../components/PostCard'
import HeaderHome from '../components/HeaderHome'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { AuthContext } from '../providers/AuthProvider'
import { useNetInfo } from '@react-native-community/netinfo'
import { getDataJSON, storeDataJSON } from '../functions/AsyncStorageFunctions'

const HomeScreen = props => {
  const netinfo = useNetInfo()
  if (netinfo.type != 'unknown' && !netinfo.isInternetReachable) {
    alert('No Internet!')
  }
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const loadPosts = async () => {
    setLoading(true)
    let posts = await getDataJSON('posts')
    setPosts(posts)
    setLoading(false)
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <AuthContext.Consumer>
      {auth => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer()
            }}
          />
          <Card>
            <Input
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name='pencil' size={24} color='black' />}
              onChangeText={currentText => {
                setInput(currentText)
              }}
            />
            <Button
              title='Post'
              type='outline'
              onPress={async () => {
                setLoading(true)
                let posts = await getDataJSON('posts')
                if (posts) {
                  storeDataJSON('posts', [
                    ...posts,
                    {
                      userId: auth.CurrentUser.uid,
                      body: input,
                      author: auth.CurrentUser.Name,
                      created_at: new Date().toISOString(),
                      likes: [],
                      comments: [],
                    },
                  ])
                  posts = await getDataJSON('posts')
                  setPosts(posts)
                } else {
                  storeDataJSON('posts', [
                    {
                      userId: auth.CurrentUser.uid,
                      body: input,
                      author: auth.CurrentUser.Name,
                      created_at: new Date().toISOString(),
                      likes: [],
                      comments: [],
                    },
                  ])
                   posts = await getDataJSON('posts')
                   setPosts(posts)
                }
                setLoading(false)
              }}
            />
          </Card>
          <ActivityIndicator size='large' color='red' animating={loading} />

          <FlatList
            data={posts}
            renderItem={({ item }) => {
              return (
                <PostCard
                  author={item.name}
                  date={item.created_at}
                  body={item.body}
                  navigation={props.navigation}
                />
              )
            }}
          />
        </View>
      )}
    </AuthContext.Consumer>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: 'blue',
  },
  viewStyle: {
    flex: 1,
  },
})

export default HomeScreen