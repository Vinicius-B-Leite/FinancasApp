import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MenuHamburg from '../../components/MenuHamburg'
import Pickerr from '../../components/Picker/index.android';

import { Background, Input, SubmitButton, SubmitText } from './styles'

export default function New() {

  const [value, setValue] = useState(0)
  const [tipo, setTipo] = useState('receita')
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <MenuHamburg />
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder='Valor desejado'
            keyboarType='numeric'
            returnKeyType='next'
            onSubmitEditing={() => Keyboard.dismiss()}
            onChangeText={txt => setValue(txt)}
            value={value}
          />

          <Pickerr onChange={setTipo} tipo={tipo}/>

          <SubmitButton>
            <SubmitText>
              Cadastrar
            </SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}