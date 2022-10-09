import React, { useContext, useState } from 'react';
import { Container, Nome, NewLink, NewText, Logout, LogoutText, ChangeContainer, Email, Tema, RegistrorTotais } from './styles';
import { AuthContext } from '../../contexts/auth'
import { useNavigation } from '@react-navigation/native';
import MenuHamburg from '../../components/MenuHamburg';
import { AntDesign } from '@expo/vector-icons';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../../service/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Perfil() {
  const { singout, user } = useContext(AuthContext)
  const navigation = useNavigation()
  const [isEnableName, setIsEnableName] = useState(false)
  const [isEnableEmail, setIsEnableEmail] = useState(false)
  const [pickerValue, setPickerValue] = useState('preto')
  const [emailInput, setEmailInput] = useState(user.email)

  function changeVerification(changeUserInformation) {
    Alert.alert(
      'Atenção',
      'Tem certeza que seja fazer esta alteração?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => changeUserInformation()
        }
      ]
    )
  }
  async function changeUserEmail() {
    await AsyncStorage.getItem('_authUser').then(async (val) => {
      let data = JSON.parse(val)
      let email = data.email
      let password = data.password

      console.log(email, password)
      await firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
        value.user.updateEmail(emailInput).then(async() => {
          setIsEnableEmail(false)
          data['email'] = emailInput
          await AsyncStorage.setItem('_authUser', JSON.stringify(data))
        }).then(() => alert('FOI'))
      })
    })
  }

  return (
    <Container enable={false} behaivor={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <MenuHamburg />
      <FontAwesome name="user-circle-o" size={70} color="#fff" />

      <ChangeContainer justifyContent='center'>
        <Nome placeholder={user && user.nome} editable={isEnableName} />
        <TouchableOpacity onPress={() => setIsEnableName(!isEnableName)}><AntDesign name="edit" size={24} color="#fff" /></TouchableOpacity>

      </ChangeContainer>

      <View style={{ width: '90%', padding: 15, paddingVertical: 70 }}>
        <ChangeContainer>
          <Email
            placeholder={user && user.email}
            editable={isEnableEmail}
            value={emailInput}
            onChangeText={txt => setEmailInput(txt)}
            onEndEditing={() => changeVerification(changeUserEmail)}
          />
          <TouchableOpacity onPress={() => setIsEnableEmail(!isEnableEmail)}><AntDesign name="edit" size={24} color="#fff" /></TouchableOpacity>
        </ChangeContainer>

        <ChangeContainer>
          <Tema>Tema: </Tema>
          <Picker
            style={{ width: '40%', height: 5, backgroundColor: 'transparent', color: '#fff' }}
            dropdownIconColor='#fff'
            selectedValue={pickerValue}
            onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}>
            <Picker.Item label='Preto' value='preto' />
            <Picker.Item label='Roxo' value='roxo' />
          </Picker>
        </ChangeContainer>
        <RegistrorTotais>Registros toais: 20</RegistrorTotais>
      </View>

      <NewLink onPress={() => navigation.navigate('New')}>
        <NewText>Registrar Gastos</NewText>
      </NewLink>
      <Logout onPress={() => singout()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}