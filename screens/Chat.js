import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native';
import { SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { db, auth } from '../firebase'
import firebase from 'firebase/compat/app';


const Chat = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const nameOfTheChat =route.params.chatName;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        rounded
                        source={{
                            uri:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        }}
                    />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
                    >
                        {nameOfTheChat}
                    </Text>
                </View>
            ),
            // headerLeft: () => (
            //       <TouchableOpacity 
            //       style={{ marginLeft: 10 }} 
            //       onPress={navigation.goBack}
            //       activeOpacity={0.5}
            //       >
            //         <AntDesign name='arrowleft' size={24} color='white' />
            //       </TouchableOpacity>
            //   ),

            // headerRight: () => (
            //     <View
            //         style={{
            //             flexDirection: "row",
            //             justifyContent: "space-between",
            //             width: 80,
            //             marginRight: 20,
            //         }}
            //     >
            //         <TouchableOpacity>
            //             <FontAwesome name="video-camera" size={24} color="white" />
            //         </TouchableOpacity>
            //         <TouchableOpacity>
            //             <Ionicons name="call" size={24} color="white" />
            //         </TouchableOpacity>
            //     </View>
            // ),
        });
    },[]);

    const sendMessage = () => {
        Keyboard.dismiss();
        console.log("sending a message!!");
        db.collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            })
            setInput("");
    };


    useEffect(() => {
        console.log("rerending from Chat to set the messages")
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ));

        return unsubscribe;
    },[])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}  >
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView >
                            {messages.map(({ id, data }) =>
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            rounded
                                            //for this to work on the web :
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: - 15,
                                                right: -5,
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            rounded
                                            //for this to work on the web :
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: - 15,
                                                left: -5,
                                            }}
                                            bottom={-15}
                                            left={-5}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            )}
                        </ScrollView>
                        <View style={styles.footer} >
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                placeholder="Message"
                                style={styles.textInput}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons 
                                name="send" 
                                size={24} 
                                color="#B09955" 
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: 'relative',

    },
    sender: {
        padding: 15,
        backgroundColor: "#B09955",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: 'relative',

    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
    },
    senderName: {
        color: "white",
        fontSize: 9,
        paddingRight: 10,
        left: 10,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
})