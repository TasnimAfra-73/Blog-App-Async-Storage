import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Card, Button, Text, Avatar, Input } from 'react-native-elements'
import CommentCard from '../components/CommentCard'
import HeaderHome from '../components/HeaderHome'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { AuthContext } from '../providers/AuthProvider'
import dayjs from 'dayjs'
import { getDataJSON, storeDataJSON } from '../functions/AsyncStorageFunctions'

const CommentScreen = props => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [input, setInput] = useState('')

  const loadComments = async () => {
    let commentData = []
    setLoading(true)
    let comments = await getDataJSON('comments')
    if (comments) {
      comments.forEach(comment => {
        if (comment.postId == props.route.params.date) {
          commentData.push(comment)
        }
      })
      setComments(commentData.reverse())
    }
    setLoading(false)
  }

  useEffect(() => {
    loadComments()
  }, [refresh])

  return (
    <AuthContext.Consumer>
      {auth => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer()
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Avatar
              containerStyle={{ backgroundColor: '#ffab91' }}
              rounded
              icon={{ name: 'user', type: 'font-awesome', color: 'black' }}
              activeOpacity={1}
            />
            <Text h4Style={{ padding: 10 }} h4>
              {props.route.params.author}
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 10,
              fontStyle: 'italic',
            }}
          >
            {dayjs(props.date).format('[Posted on] DD MMM, YYYY')}
          </Text>
          <Text
            style={{
              paddingVertical: 10,
            }}
          >
            {props.route.params.body}
          </Text>
          <Card.Divider />
          <Text>{` 10 Likes, 1 Comments`}</Text>
          <Card.Divider />
          <Card>
            <Input
              placeholder='Write a comment!'
              leftIcon={<Entypo name='pencil' size={24} color='black' />}
              onChangeText={currentInput => {
                setInput(currentInput)
              }}
            />
            <Button
              title='Comment'
              type='outline'
              onPress={async () => {
                setLoading(true)
                let comments = await getDataJSON('comments')
                if (comments) {
                  storeDataJSON('comments', [
                    ...comments,
                    {
                      postId: props.route.params.date,
                      userId: auth.CurrentUser.uid,
                      body: input,
                      author: auth.CurrentUser.Name,
                      created_at: new Date().toISOString(),
                    },
                  ])
                } else {
                  storeDataJSON('comments', [
                    {
                      postId: props.route.params.date,
                      userId: auth.CurrentUser.uid,
                      body: input,
                      author: auth.CurrentUser.Name,
                      created_at: new Date().toISOString(),
                    },
                  ])
                }
                setRefresh(!refresh)
                setLoading(false)
              }}
            />
          </Card>
          <ActivityIndicator size='large' color='red' animating={loading} />

          <FlatList
            data={comments}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <CommentCard
                  name={item.author}
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

export default CommentScreen