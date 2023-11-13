import { PixelRatio, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import databaseSingleton from "../config/Database";

const Pixel = ({ column, row }) => {
  const [dotArray, setDotArray] = useState([]);
  const [rowSums, setRowSums] = useState([]);
  const [unicode, setUniCode] = useState("");

  const defaultRow = 11; // Default value for row
  const defaultColumn = 7; // Default value for column
  const defaultRowSums = [62, 65, 65, 65, 65, 65, 127, 65, 65, 65, 65];
  const defaultBinaryArray = defaultRowSums.map((num) => num.toString(2).padStart(defaultColumn, '0').split('').map(Number));

  // column = column !== "" ? column : defaultColumn;
  // row = row !== "" ? row: defaultRow

  const newRow = row !== "" ? row : defaultRow;
  const newColumn = column !== "" ? column : defaultColumn;

  const initialArray = (newColumn, newRow) => {
    const newDotArray = Array(newRow)
      .fill(1)
      .map(() => Array(newColumn).fill(1));
    return newDotArray;
  };

  useEffect(() => {
    if (!column && !row) {
      setDotArray(defaultBinaryArray);
    } else {
      const newDotArray = initialArray(newColumn, newRow);
      setDotArray(newDotArray);
    }

    

    
  }, [column, row]);

  useEffect(() => {
    const integers = dotArray.map((rowArray, index) => {
      const binaryString = rowArray.join("");
      // console.log("binary", binaryString)
      return parseInt(binaryString, 2);
    });
    setRowSums(integers);
  }, [dotArray]);

  console.log("rowSums", rowSums);

  const toggleDot = (rowIndex, columnIndex) => {
    const newDotArray = [...dotArray];
    newDotArray[rowIndex][columnIndex] = newDotArray[rowIndex][columnIndex] === 0 ? 1 : 0;
    setDotArray(newDotArray);
  };

  const handleReset = (newColumn, newRow) => {
    // const newDotArray = initialArray(newColumn, newRow);
    setDotArray(defaultBinaryArray)
    // setDotArray(newDotArray);
  };

  const handlePixelData = () => {
    console.log(unicode, column, row, rowSums);
  };

  return (
    <>
      <View style={styles.columnPixel}>
        {dotArray.map((rowArray, rowIndex) => (
          <View style={styles.rowPixel} key={rowIndex}>
            {rowArray.map((num, columnIndex) => (
              <TouchableOpacity key={columnIndex} onPress={() => toggleDot(rowIndex, columnIndex)}>
                <View style={num === 1 ? styles.pixelOn : styles.pixelOff}>
                  <Image style={styles.dot} source={num === 1 ? require("../assets/images/dot-green.png") : require("../assets/images/dot-white.png")} />
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ marginLeft: 10 }}>
              <Text>{rowSums[rowIndex]}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={styles.inputLabel}>Unicode: </Text>
        <TextInput style={styles.inputText} onChangeText={(text) => setUniCode(text)}>{unicode}</TextInput>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => handlePixelData()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>SAVE</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleReset(11, 11)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>RESET</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rowPixel: {
    flexDirection: "row",
  },

  columnPixel: {
    flexDirection: "column",
  },

  cellInput: {
    marginRight: 70,
    borderWidth: 1,
    width: 30,
    textAlign: "center",
  },
  pixelOn: {
    width: 25,
    height: 25,
  },
  pixelOff: {
    width: 25,
    height: 25,
    backgroundColor: "transparent",
  },
  dot: {
    width: 25,
    height: 25,
  },

  inputLabel: {
    fontSize: 16,
    marginTop: 2,
  },

  inputText: {
    fontSize: 16,
    borderWidth: 1,
    marginLeft: 10,
    width: 100,
    paddingLeft: 10,
    paddingRight: 10,
  },

  button: {
    backgroundColor: "blue",
    width: 100,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    padding: 5,
  },

});

export default Pixel;
