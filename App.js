import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { supabase } from "./utils/superbase";

// npx expo install @react-native-google-signin/google-signin
// npx expo install expo-dev-client

export default function App() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
  const [idToken,setIdToken]=useState('');

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        "951418236283-uh1bheqso7sdgame19a1vtjho42sva42.apps.googleusercontent.com",
      androidClientId:
        "951418236283-jvadas08fqd4sngkjmehss99js145u5o.apps.googleusercontent.com",
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  });

  const signIn = async () => {
    console.log("Pressed sign in");

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setIdToken(userInfo.idToken)
      console.log(userInfo.idToken)
      const {data,error} = await supabase.auth.signInWithIdToken({'provider':'google','token':userInfo.idToken})
      console.log(error,data)
      setError();
    } catch (e) {
      console.log(e)
      setError(e);
    }
  };

  const logout = () => {
    setUserInfo(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(error)}</Text>
      {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
      {userInfo && <Text>{JSON.stringify(userInfo.idToken)}</Text>}
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
