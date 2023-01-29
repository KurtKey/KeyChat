import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Icon, Input } from 'react-native-elements';
import { db } from '../firebase';

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats"
    })
  }, [navigation])
const createChat = async () => {
  await db.collection('chats').add({
    chatName: input,
  })
  .then(() => {
    navigation.goBack();
  })
  .catch((error)=> alert(error));
};
  return (
    <View>
      <Input
      placeholder='Enter a chat name'
      value={input}
      onChangeText={(text) => setInput(text)}
      onSubmitEditing={createChat} 
      leftIcon={
        <Icon name='wechat' type='antdesign' size={24} color="black" />
      }
      />
      <Button onPress={createChat} title='Create new Chat'/>
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "white",
    height: "100%",
  }
})