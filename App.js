import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { genreList } from "./genres";
import { themeList } from "./themes";
import { characterList } from "./characters";
import { wordCounts } from "./wordcounts";
import bannerImg from "./diceV3Banner4.jpg";

export default function App() {
  const [generatedGenre, setGeneratedGenre] = useState(null);
  const [generatedTheme, setGeneratedTheme] = useState(null);
  const [generatedCharacter, setGeneratedCharacter] = useState(null);
  const [generatedWordCount, setGeneratedWordCount] = useState(null);
  const [generatedTimeLimit, setGeneratedTimeLimit] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        "Gotham-Book": {
          uri: require("./assets/fonts/Gotham-Book.otf"),
        },
        "Gotham-Black": {
          uri: require("./assets/fonts/Gotham-Black.otf"),
        },
        "Gotham-Bold": {
          uri: require("./assets/fonts/Gotham-Bold.otf"),
        },
        "Gotham-Bold-Italic": {
          uri: require("./assets/fonts/GothamBoldItalic.ttf"),
        },
        "Jazz-Dark": {
          uri: require("./assets/fonts/jazz-dark.ttf"),
        },
      });
      setFontsLoaded(true);
    } catch (e) {}
  };

  function doGenre() {
    const newGenre = genreList[doRandom(0, genreList.length)];
    if (generatedGenre != null) {
      setGeneratedGenre(null);
      setGeneratedGenre(newGenre);
    } else {
      setGeneratedGenre(newGenre);
    }
  }

  function doTheme() {
    const newTheme = themeList[doRandom(0, themeList.length)];
    if (generatedTheme != null) {
      setGeneratedTheme(null);
      setGeneratedTheme(newTheme);
    } else {
      setGeneratedTheme(newTheme);
    }
  }

  function doCharacter() {
    const newCharacter = characterList[doRandom(0, characterList.length)];
    if (generatedCharacter != null) {
      setGeneratedCharacter(null);
      setGeneratedCharacter(newCharacter);
    } else {
      setGeneratedCharacter(newCharacter);
    }
  }

  function doWordCount() {
    const newWordCount = wordCounts[doRandom(0, wordCounts.length)];
    if (generatedWordCount != null) {
      setGeneratedWordCount(null);
      setGeneratedWordCount(newWordCount);
    } else {
      setGeneratedWordCount(newWordCount);
    }

    switch (newWordCount) {
      case "100":
        setGeneratedTimeLimit("24 Hours");
        break;
      case "250":
        setGeneratedTimeLimit("24 Hours");
        break;
      case "500":
        setGeneratedTimeLimit("48 Hours");
        break;
      case "1000":
        setGeneratedTimeLimit("4 Days");
        break;
      case "2500":
        setGeneratedTimeLimit("8 Days");
        break;
      case "5000":
        setGeneratedTimeLimit("2 Weeks");
        break;
      case "10,000":
        setGeneratedTimeLimit("1 Month");
        break;
      default:
        setGeneratedTimeLimit(null);
    }
  }

  function doAlert() {
    alert("test!");
  }

  function doRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  if (fontsLoaded == true) {
    return (
      <View style={styles.container}>
        <Image style={styles.bannerImg} source={bannerImg}></Image>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Story Dice</Text>
        </View>
        <View style={styles.bodyView}>
          <Pressable style={styles.button} onPress={() => doGenre()}>
            <Text style={styles.heading}>Genre:</Text>
            <Text style={styles.generatedString}>{generatedGenre}</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => doTheme()}>
            <Text style={styles.heading}>Theme:</Text>
            <Text style={styles.generatedString}>{generatedTheme}</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => doCharacter()}>
            <Text style={styles.heading}>Character:</Text>
            <Text style={styles.generatedString}>{generatedCharacter}</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => doWordCount()}>
            <Text style={styles.heading}>Word Count:</Text>
            <Text style={styles.generatedString}>{generatedWordCount}</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => doWordCount()}>
            <Text style={styles.heading}>Time Limit:</Text>
            <Text style={styles.generatedString}>{generatedTimeLimit}</Text>
          </Pressable>
        </View>

        <View style={styles.bottomButtonRow}>
          <Pressable
            style={styles.bottomButton}
            onPress={() => {
              doGenre();
              doTheme();
              doCharacter();
              doWordCount();
            }}
          >
            <Text style={styles.bottomText}>Generate All</Text>
          </Pressable>

          <Pressable
            style={styles.bottomButton}
            onPress={() => {
              setGeneratedCharacter(null);
              setGeneratedTheme(null);
              setGeneratedGenre(null);
              setGeneratedWordCount(null);
              setGeneratedTimeLimit(null);
            }}
          >
            <Text style={styles.bottomText}>Clear All</Text>
          </Pressable>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <Apploading
        startAsync={loadFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bannerImg: {
    zIndex: -1,
    position: "absolute",
    top: 0,
    left: 0,
  },

  bodyView: {
    marginTop: 10,
    marginBottom: 60,
  },

  bottomButton: {
    backgroundColor: "#rgba(40,40,63,0.6)",
    height: 45,
    width: 275,
    paddingTop: 10,
    borderRadius: 5,
    marginBottom: 5,
  },

  bottomButtonRow: {
    position: "absolute",
    bottom: 30,
  },

  bottomText: {
    fontFamily: "Gotham-Bold",
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },

  button: {
    backgroundColor: "#rgba(77, 123, 209,0.1)",
    minWidth: 100,
    width: 275,
    height: 70,
    borderRadius: 5,
    paddingTop: 5,
    marginBottom: 5,
  },

  generatedString: {
    textAlign: "center",
    fontFamily: "Gotham-Book",
    fontSize: 15,
    marginLeft: 5,
    marginRight:5,
  },

  heading: {
    fontFamily: "Gotham-Bold",
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },

  title: {
    fontFamily: "Gotham-Black",
    fontSize: 50,
    color: "white",
  },

  titleBar: {
    position: "absolute",
    top: 40,
  },
});
