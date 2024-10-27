import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator, Platform } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import Chat__header from '../compoments/chatMessage/Chat__header';
import Chat__footer from '../compoments/chatMessage/Chat__footer';
import Chat__main from "../compoments/chatMessage/Chat__main";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { API_URL } from "@env";
import { Audio } from 'expo-av';
import io from "socket.io-client";

const API_URL = 'https://secoure.onrender.com'
// Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ChatMessage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [messages, setMessages] = useState([
    { text: 'Hello! How are you?', sender: 'user', date: '2024-07-10' },
    { text: 'I am fine, thank you!', sender: 'other', date: null },
    { text: 'What about you?', sender: 'user', date: null },
    { text: 'I am doing great, thanks!', sender: 'other', date: '2024-07-11' },
  ]);
  const [allMessage, setAllMessage] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();
  const provenance = true;
  const socket = io(`${API_URL}`);

  // Fonction pour enregistrer le token de notification
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Impossible d\'obtenir la permission pour les notifications push!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })).data;
    } else {
      alert('Les notifications push nécessitent un appareil physique');
    }

    return token;
  }

  // Configuration initiale des notifications et chargement des données
  useEffect(() => {
    const setupInitial = async () => {
      // Configuration des notifications
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);

      // Chargement des données utilisateur
      const jsonValue = await AsyncStorage.getItem('userEcomme');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUser(userData);

      if (userData) {
        // Sauvegarde du token si on a un utilisateur
        if (token) {
          console.log(userData.id)
          try {
            await axios.post(`${API_URL}/saveUserPushToken`, {
              userId: userData.id,
              pushToken: token
            });
            console.log('ok')
          } catch (error) {
            console.error('Erreur lors de la sauvegarde du token:', error);
          }
        }

        // Chargement des messages
        try {
          const response = await axios.get(`${API_URL}/getUserMessagesByClefUser/${userData.id}`);
          setAllMessage(response.data);
          setLoading(false);

          await axios.put(`${API_URL}/lecturUserMessage`, { userKey: userData.id });
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    };

    setupInitial();

    // Configuration des écouteurs de notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification reçue:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Réponse à la notification:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Gestion de l'enregistrement audio
  async function startRecording() {
    console.log('one');
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
    } catch (err) {
      console.error('Erreur lors du démarrage de l\'enregistrement:', err);
    }
  }

  async function stopRecording() {
    console.log('off');
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
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`;
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
    return recordings.map((recordingLine, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.fill}>
          Recording #{index + 1} | {recordingLine.duration}
        </Text>
        <Button onPress={() => {loadAndPlaySound(recordingLine.file);console.log(recordingLine)}} title="Play" />
      </View>
    ));
  }

  function clearRecordings() {
    setRecordings([]);
  }

  // Gestion des nouveaux messages via socket
  useEffect(() => {
    const fetchData = async () => {
      const jsonValue = await AsyncStorage.getItem('userEcomme');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (userData) {
        try {
          const response = await axios.get(`${API_URL}/getUserMessagesByClefUser/${userData.id}`);
          setAllMessage(response.data);

          await axios.put(`${API_URL}/lecturUserMessage`, { userKey: userData.id });
        } catch (error) {
          console.log(error);
        }
      }
    };

    socket.on("new_message_user", async (data) => {
      fetchData();
      // Notification locale si l'app est ouverte et que le message n'est pas de l'utilisateur actuel
      // if (data.clefUser !== user?.id) {
      //   await Notifications.scheduleNotificationAsync({
      //     content: {
      //       title: "Nouveau message",
      //       body: data.message || "Vous avez reçu un nouveau message",
      //     },
      //     trigger: null,
      //   });
      // }
    });

    return () => {
      socket.off("new_message_user");
    };
  }, [socket, user]);

  // Envoi de message
  const envoyer = (message) => {
    if (message.length <= 0) return;

    axios.post(`${API_URL}/createUserMessage`, {
      message: message,
      clefUser: user.id,
      provenance: provenance,
    })
    .then((res) => {
      socket.emit("new_message_u", {
        data: {
          message: message,
          clefUser: user.id,
          provenance: provenance,
        },
      });

      axios.get(`${API_URL}/getUserMessagesByClefUser/${user.id}`)
        .then((re) => {
          setAllMessage(re.data);
        })
        .catch((erro) => {
          console.log(erro);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#30A08B" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Chat__header />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contenu}>
        <Chat__main
          messages={allMessage}
          getRecordingLines={getRecordingLines}
          clearRecordings={clearRecordings}
        />
      </ScrollView>
      <Chat__footer
        onSendMessage={envoyer}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contenu: {
    marginBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  fill: {
    flex: 1,
    margin: 5,
  },
  loadingText: {
    marginTop: 10,
    color: '#30A08B',
  },
});
