import React, { useContext, useState } from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from '../SingIn/styles';


export default function SingUp() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { singUp, loadingAuth } = useContext(AuthContext)

  return (
    <Background>
      <Container
        behavor={Platform.OS === 'ios' ? 'padding' : ''}
        enable
      >

        <AreaInput>
          <Input
            placeholder='Seu nome'
            autoCorrect={false}
            autoCapitalize='none'
            value={nome}
            onChangeText={(txt) => setNome(txt)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder='Seu email'
            autoCorrect={false}
            autoCapitalize='none'
            value={email}
            onChangeText={(txt) => setEmail(txt)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder='********'
            autoCorrect={false}
            autoCapitalize='none'
            value={password}
            onChangeText={(txt) => setPassword(txt)}
          />
        </AreaInput>

        <SubmitButton onPress={()=>singUp(email, password, nome)}>
          <SubmitText>{loadingAuth ? <ActivityIndicator size={20} color="#fff" /> : 'Cadastrar'}</SubmitText>
        </SubmitButton>

      </Container>
    </Background>
  );
}