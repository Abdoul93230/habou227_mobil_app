import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { NativeBaseProvider, Box, Select, CheckIcon, Center } from 'native-base';

const LivraisonPage = () => {
  const [service, setService] = useState("");

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Adresse de livraison</Text>
        <View style={styles.cardAddress}>

          <View style={styles.formGroup}>
            <Text style={styles.text}>Région: <Text style={styles.regionText}>{service || 'Votre région va apparaître ici...'}</Text></Text>
            <Center>
              <Box style={styles.dropdown}>
                <Select
                  selectedValue={service}
                  minWidth="370"
                  minHeight="10"
                  accessibilityLabel="Choisir une région"
                  placeholder="Choisir une région"
               
                  mt={0}
                  onValueChange={itemValue => setService(itemValue)}
                >
                  <Select.Item label="Niamey" value="Niamey" />
                  <Select.Item label="Maradi" value="Maradi" />
                  <Select.Item label="Dosso" value="Dosso" />
                  <Select.Item label="Zinder" value="Zinder" />
                  <Select.Item label="Agadez" value="Agadez" />
                  <Select.Item label="Diffa" value="Diffa" />
                  <Select.Item label="Tillaberi" value="Tillaberi" />
                  <Select.Item label="Tahoua" value="Tahoua" />
                </Select>
              </Box>
            </Center>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.text} >Quartier</Text>
            <TextInput style={styles.input} placeholder='Enregistrez ici' />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.text}>Nom:</Text>
            <TextInput style={styles.input} placeholder='Entrez votre nom' />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.text}>Email:</Text>
            <TextInput style={styles.input} placeholder='Entrez votre email' keyboardType='email-address' />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.text}>Téléphone:</Text>
            <TextInput style={styles.input} placeholder='Entrez votre numéro' keyboardType='phone-pad' />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.text}>Plus de détails:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder='Détails sur votre location'
              multiline
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Soumettre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default LivraisonPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 1,
    padding: 5,
    fontWeight: "bold",
    color: "#515C70",
  },
  cardAddress: {
    marginHorizontal: 0,
    marginVertical: 10,
    padding: 20,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: "#515C70",
  },
  regionText: {
    color: '#515C70',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: "100%",
  },
  button: {
    backgroundColor: '#FF6A69',
    paddingVertical: 10,
    width: "100%",
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
});
