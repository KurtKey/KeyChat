import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);


  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

const adminAddChat = () => {
  if(auth?.currentUser?.email==="ad@g.ma")
  navigation.navigate("AddChat");
  else
  Alert.alert("Permission denied","Only Admin can create chats");
}

  useEffect(() => {
    console.log("rerendring from Home to reset chats")
    const unsubscribe = db
      .collection("chats")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        ));
    return unsubscribe;
  }, []);

  // try to optimise photoURL!!!
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "KeyChat",
      headerStyle: { backgroundColor: "#B09955" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20, marginRight: 10 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 15,
          }}
        >
          <TouchableOpacity
            onPress={adminAddChat}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name='people' size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='logout' size={24} color="black" onPress={signOutUser} />
          </TouchableOpacity>
        </View>
      ),

    });
  }, [navigation]);


  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat} />
        ))}

      </ScrollView>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: "100%"
  }
})