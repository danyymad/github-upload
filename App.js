import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

const Stack = createStackNavigator();

var firebaseConfig = {
	 apiKey: "AIzaSyDBW3qZbOR8arax8_IQNE5E3zQ7gKNvLEc",
	 authDomain: "smart-apps-gx.firebaseapp.com",
	 databaseURL: "https://smart-apps-gx.firebaseio.com",
	 projectId: "smart-apps-gx",
	 storageBucket: "smart-apps-gx.appspot.com",
	 messagingSenderId: "511801507018",
	 appId: "1:511801507018:web:6451f1ea470e75e58e8833",
	 measurementId: "G-22EC6WNGL6"
 };
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();

const dbh = firebase.firestore();




export default function App(props) {
  const isLoadingComplete = useCachedResources();
 // writeUserData(123,'Georgina','Madrid Carlos','geomadrid@outlook.com',52)
  var red = dbh.collection("usuarios").doc("mario");

  red.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
