import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import Chat__header from '../compoments/chatMessage/Chat__header';
import Chat__footer from '../compoments/chatMessage/Chat__footer';
import Chat__main from "../compoments/chatMessage/Chat__main";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Audio } from 'expo-av';
import io from "socket.io-client";

const ChatMessage = () => {
  const [user, setUser] = useState()
  // const [name, setName] = useState()
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  const [messages, setMessages] = useState([
    { text: 'Hello! How are you?', sender: 'user', date: '2024-07-10' },
    { text: 'I am fine, thank you!', sender: 'other', date: null },
    { text: 'What about you?', sender: 'user', date: null },
    { text: 'I am doing great, thanks!', sender: 'other', date: '2024-07-11' },

  ]);
  const [allMessage, setAllMessage] = useState([]);
  const provenance = true;
  const socket = io('https://chagona.onrender.com');

  useEffect(() => {


      const fetchData = async()=>{
        const jsonValue = await AsyncStorage.getItem('userEcomme');
          const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
          setUser(userData);
          // console.log(userData)
          // setName(userData.name)
        if (userData) {
          axios
            .get(`https://chagona.onrender.com/getUserMessagesByClefUser/${userData.id}`)
            .then((response) => {
              setAllMessage(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

            axios
        .put(`https://chagona.onrender.com/lecturUserMessage`, { userKey: userData.id })
        .then((resp) => {
          // console.log(resp);
        })
        .catch((erro) => {
          console.log(erro);
        });
        }
      }
       fetchData()



  },[]);


  async function startRecording() {
    console.log('one')
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {}
  }

  async function stopRecording() {
    console.log('off')
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(allRecordings);
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }
  async function loadAndPlaySound(uri) {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.error('Erreur lors de la lecture du son:', error);
    }
  }


  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <Button onPress={() => {loadAndPlaySound(recordingLine.file);console.log(recordingLine)}} title="Play"></Button>
        </View>
      );
    });
  }

  function clearRecordings() {
    setRecordings([])
  }

  useEffect(() => {


      const fetchData = async()=>{
        const jsonValue = await AsyncStorage.getItem('userEcomme');
          const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
          setUser(userData);
          // console.log(userData)
          // setName(userData.name)
        if (userData) {
          axios
            .get(`https://chagona.onrender.com/getUserMessagesByClefUser/${userData.id}`)
            .then((response) => {
              setAllMessage(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

            axios
        .put(`https://chagona.onrender.com/lecturUserMessage`, { userKey: userData.id })
        .then((resp) => {
          // console.log(resp);
        })
        .catch((erro) => {
          console.log(erro);
        });
        }
      }
      socket.on("new_message_user", fetchData);

    return () => {
      // Nettoyer l'écouteur du socket lors du démontage du composant
      socket.off("new_message_user");
    };

    console.log("oui")

  },[socket]);



  const sendMessage = (allMessages, sender) => {
    const newMessage = {
      text: messageText,
      sender: sender,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };
    setMessages([...messages, newMessage]);
  };




  const envoyer = (message) => {
    if (message.length <= 0) {
      return;
    }
    axios
      .post(`https://chagona.onrender.com/createUserMessage`, {
        message: message,
        clefUser: user.id,
        provenance: provenance,
      })
      .then((res) => {
        // alert(res.data);
        socket.emit("new_message_u", {
          data: {
            message: message,
            clefUser: user.id,
            provenance: provenance,
          },
        });
        // setMessage("");
        axios
          .get(`https://chagona.onrender.com/getUserMessagesByClefUser/${user.id}`)
          .then((re) => {
            setAllMessage(re.data);
          })
          .catch((erro) => {
            console.log(erro);
          });
      })
      .catch((error) => console.log(error));
  };






  return (
    <View style={styles.container} >
      <Chat__header />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contenu}>
        <Chat__main messages={allMessage} getRecordingLines={getRecordingLines} clearRecordings={clearRecordings} />
      </ScrollView>
      <Chat__footer onSendMessage={envoyer} startRecording={startRecording} stopRecording={stopRecording} />
    </View>
  );
}

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
  },
  contenu: {
    marginBottom: 100,
  },
});
