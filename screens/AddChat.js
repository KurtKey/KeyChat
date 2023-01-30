import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Icon, Input } from 'react-native-elements';
import { db } from '../firebase';

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");

  // try to delete it it may be just a khodra fo9 t3am
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
      cursorColor={"#B09955"}
      value={input}
      onChangeText={(text) => setInput(text)}
      onSubmitEditing={createChat} 
      leftIcon={
        <Icon name='wechat' type='antdesign' size={24} color="black" />
      }
      />
      <Button 
      containerStyle={styles.button}
      type="outLine"
      titleStyle={{ color: '#fff' }}
      onPress={createChat} 
      title='Create new Chat'/>
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "white",
    height: "100%",
  },
  button: {
    backgroundColor: "#B09955",
  },
})