import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import MenuHamburg from '../../components/MenuHamburg'
import Pickerr from '../../components/Picker/index.android';
import firebase from '../../service/firebaseConnection'
import { format } from 'date-fns';
import { Background, Input, SubmitButton, SubmitText } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function New() {

  const [value, setValue] = useState(0)
  const [tipo, setTipo] = useState('receita')
  const navigation = useNavigation()

  function handleSubmit() {
    if (isNaN(parseFloat(value)) || !tipo) {
      alert('Preencha todos os campos')
      return
    }
    Alert.alert(
      'Confirmar dados',
      ` Valor: ${value} \n Tipo: ${tipo}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Concluir',
          onPress: () => addDataBase()
        }
      ]
    )

  }

  async function addDataBase() {

    await AsyncStorage.getItem('_authUser').then(async (v) => {

      let user = JSON.parse(v)
      let key = await firebase.database().ref('historico').child(user.uid).push().key
      await firebase.database().ref('historico').child(user.uid).child(key).set({
        tipo: tipo,
        valor: parseFloat(value),
        data: format(new Date(), 'dd/MM/yy')
      }).then(async () => {

          let userChild = firebase.database().ref('users').child(user.uid)
          await userChild.once('value').then((snapshot) => {
            let saldo = parseFloat(snapshot.val().saldo)

            tipo === 'receita' ? saldo += parseFloat(value) : saldo -= parseFloat(value)

            userChild.child('saldo').set(saldo)
          })
      }).then(()=>{
          setValue('')
          navigation.navigate('Home')
      })
    })


  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <MenuHamburg />
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder='Valor desejado'
            keyboardType='numeric'
            returnKeyType='next'
            onSubmitEditing={() => Keyboard.dismiss()}
            onChangeText={txt => setValue(txt)}
            value={value}
          />

          <Pickerr onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={() => handleSubmit()}>
            <SubmitText>
              Cadastrar
            </SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}