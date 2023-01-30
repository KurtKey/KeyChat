import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

useLayoutEffect(() => {
navigation.setOptions({
  headerBackTitle: "Back to Login",
});
},[navigation]);

  const register = () => { 
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
      authUser.user.updateProfile({
        displayName: name,
        photoURL:
         imageUrl || 
         "https://www.shareicon.net/data/128x128/2016/08/05/806962_user_512x512.png"
      });
    })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView 
    behavior='padding' 
    enabled 
    style={styles.container}
    >
      
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a KeyChat account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full Name'
          cursorColor={"#B09955"}
          autoFocus
          type="text"
          value={name}
          onChangeText={text => setName(text)} />
        <Input
          placeholder='Email'
          cursorColor={"#B09955"}
          type="email"
          value={email}
          onChangeText={text => setEmail(text)} />
        <Input
          placeholder='Password'
          cursorColor={"#B09955"}
          type="password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)} />
        <Input
          placeholder='Profile Picture URL (optional)'
          cursorColor={"#B09955"}
          type="text"
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        type="outLine"
        titleStyle={{ color: '#fff' }}
        onPress={register}
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
    backgroundColor: "#B09955",
  },
})