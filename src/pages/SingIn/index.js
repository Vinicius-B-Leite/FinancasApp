import React, { useContext, useState } from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText, Error } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória')
})

export default function SingIn() {

  const navigation = useNavigation()

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const { singIn, loadingAuth } = useContext(AuthContext)

  return (
    <Background>
      <Container
        behavor={Platform.OS === 'ios' ? 'padding' : ''}
        enable
      >
        <Logo source={require('../../assets/Logo.png')} />

        {errors.email && <Error>{errors.email?.message}</Error>}
        <AreaInput>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                error={errors.email}
                placeholder='Seu email'
                autoCorrect={false}
                autoCapitalize='none'
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </AreaInput>

        {errors.password && <Error>{errors.password?.message}</Error>}
        <AreaInput>
          <Controller
            name='password'
            control={control}
            render={({field: {value, onChange}}) => (
              <Input
               error={errors.password}
                placeholder='********'
                autoCorrect={false}
                autoCapitalize='none'
                value={value}
                onChangeText={onChange}
                secureTextEntry={true}
              />
            )}
          />
        </AreaInput>
        <SubmitButton onPress={handleSubmit(singIn)}>
          <SubmitText>{loadingAuth ? <ActivityIndicator size={24} color="#fff" /> : 'Acessar'}</SubmitText>
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SingUp')}>
          <LinkText>Crie uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  );
}