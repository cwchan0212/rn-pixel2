import { StatusBar } from "expo-status-bar";
import { PixelRatio, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import databaseSingleton from "./config/Database";
import Pixel from "./components/Pixel";

// https://r12a.github.io/uniview/?charlist=1

export default function App() {
  const [column, setColumn] = useState("");
  const [row, setRow] = useState("");
  const db = databaseSingleton.getDatabaseInstance();

  const _setupDb = async () => {
    try {
      const query = "DROP TABLE IF EXISTS pixel;";
      const values = [];
      const cmdResult = await databaseSingleton.onExecQueryCommand(query, values);
      console.log("drop: success ->", cmdResult);
    } catch (error) {
      console.log("drop: ", error);
    }

    try {
      const query1 = `
        CREATE TABLE IF NOT EXISTS pixel (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          unicode INTEGER,
          column INTEGER,  
          row INTEGER,
          line1 INTEGER,
          line2 INTEGER,
          line3 INTEGER,
          line4 INTEGER,
          line5 INTEGER,
          line6 INTEGER,
          line7 INTEGER,
          line8 INTEGER,
          line9 INTEGER,
          line10 INTEGER,
          line11 INTEGER
        );      
      `;
      const values1 = [];
      const cmdResult1 = await databaseSingleton.onExecQueryCommand(query1, values1);
      console.log("Table created successfully.", cmdResult1);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    // _setupDb()
  }, [])
  

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: 'center' }}>
        <Text style={styles.label}>Column: </Text>
        <TextInput style={styles.inputText} placeholder="column..." onChangeText={(text) => setColumn(Number(text))} value={column.toString()}></TextInput>
        <Text style={styles.label}>Row: </Text>
        <TextInput style={styles.inputText} placeholder="row..." onChangeText={(text) => setRow(Number(text))} value={row.toString()}></TextInput>
      </View>
      <Pixel  />




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

  label: {
    fontSize: 16,
    borderWidth: 0,
    marginTop: 12,    
  },

  inputText: {
    fontSize: 16,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    width: 45,
  },



});
