import React, { useContext, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';


export default function SingIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const { singIn } = useContext(AuthContext)

  return (
    <Background>
      <Container
        behavor={Platform.OS === 'ios' ? 'padding' : ''}
        enable
      >
        <Logo source={require('../../assets/Logo.png')} />

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
        <SubmitButton onPress={() => singIn(email, password)}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SingUp')}>
          <LinkText>Crie uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  );
}