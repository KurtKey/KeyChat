import { SnapshotViewIOS, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
    .collection('chats')
    .doc(id)
    .collection("messages")
    .orderBy('timestamp', "desc")
    .onSnapshot((snapshot) => 
    setChatMessages(snapshot.docs.map((doc) => doc.data()))
    );

return unsubscribe;
  });

  return (
    <ListItem 
    key={id}
    onPress={() => enterChat(id,chatName)}  bottomDivider >
      <Avatar
        rounded
        source={{
          uri:  chatMessages?.[0]?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail"> {/*  ellipsizeMode is for ... if text is long */}
         {chatMessages?.[0]?.displayName} :  {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>

    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})