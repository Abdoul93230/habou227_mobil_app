import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, TouchableWithoutFeedback,Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { CameraView, useCameraPermissions } from 'expo-camera';

const Chat__footer = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [facing, setFacing] = useState('back');
  const [permissionC, requestPermissionC] = useCameraPermissions();

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      const audioStatus = await Audio.requestPermissionsAsync();
      if (audioStatus.status !== 'granted') {
        alert('Sorry, we need audio permissions to make this work!');
      }
    }
  };

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      // Vous pouvez maintenant utiliser l'URI de l'image sélectionnée
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      // Vous pouvez maintenant utiliser l'URI de l'image capturée
    }
  };



  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', recording);
  }






  const handleAudioRecord = async () => {
    
      if (isRecording===false) {
        setIsRecording(true)
        startRecording()
        
      } else {
        setIsRecording(false);
        stopRecording()
      }
    
  };

  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      onSendMessage(message, 'user');
      setMessage('');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  if (!permissionC) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permissionC.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Nous avons besoin de votre autorisation pour montrer la caméra</Text>
        <TouchableOpacity onPress={requestPermissionC} style={styles.cancelButton}>
        <Button style={styles.cancelButtonText} title="grant permission" />
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    // console.log('yfuy')
  }





  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={[styles.chatFooter, modalVisible && { display: 'none' }]}>
        <View style={styles.chatFooter__input}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
            <FontAwesome name="plus" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            placeholder="Type a message"
            value={message}
            style={styles.textInput}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity onPress={handleAudioRecord} style={styles.iconButton}>
            {
              isRecording ? (<MaterialIcons name="voice-over-off" size={24} />):<MaterialIcons name="keyboard-voice" size={24} />
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity onPress={openCamera} style={styles.optionButton}>
                    <MaterialCommunityIcons name="camera" size={24} color="black" />
                    <Text>Open Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={openImagePicker} style={styles.optionButton}>
                    <MaterialIcons name="photo-library" size={24} color="black" />
                    <Text>Open Gallery</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default Chat__footer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    position: "absolute",
    bottom: 0,
    width: '100%',
  },
  chatFooter: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  chatFooter__input: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    marginLeft: 10,
  },
  iconButton: {
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FF6A69',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Position the modal at the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  optionButton: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    margin: 8,
    marginVertical: 5,
  },
  cancelButton: {
    width: '97%',
    padding: 15,
    backgroundColor: '#FF6A69',
    borderRadius: 25,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
