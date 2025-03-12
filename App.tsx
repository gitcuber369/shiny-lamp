import { View, Text } from "react-native";
import React from "react";
import AppleInvitest from "./components/AppleInvitest";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppleInvitest />
    </GestureHandlerRootView>
  );
};

export default App;
