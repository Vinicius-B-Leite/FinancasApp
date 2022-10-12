import React, { useContext, useState } from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText, Error } from '../SingIn/styles';

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


const schema = yup.object({
  username: yup.string().required('Informe seu nome (obrigatório)'),
  email: yup.string().email('Email inválido').required('Informe seu email (obrigatório)'),
  password: yup.string().min(6, 'Minímo 6 digitos').required('Informe sua senha (obrigatório)')
})

export default function SingUp() {

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const { singUp, loadingAuth } = useContext(AuthContext)

  return (
    <Background>
      <Container
        behavor={Platform.OS === 'ios' ? 'padding' : ''}
        enable
      >

        {errors.username && <Error>{errors.username?.message}</Error>}
        <AreaInput>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input
                error={errors.username}
                placeholder='Seu nome'
                autoCorrect={false}
                autoCapitalize='none'
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </AreaInput>

        {errors.email && <Error>{errors.email?.message}</Error>}
        <AreaInput>
          <Controller
            control={control}
            name="email"
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
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                error={errors.password}
                placeholder='Sua senha'
                autoCorrect={false}
                autoCapitalize='none'
                value={value}
                onChangeText={onChange}
                secureTextEntry={true}
              />
            )}
          />
        </AreaInput>


        <SubmitButton onPress={handleSubmit(singUp)}>
          <SubmitText>{loadingAuth ? <ActivityIndicator size={20} color="#fff" /> : 'Cadastrar'}</SubmitText>
        </SubmitButton>

      </Container>
    </Background>
  );
}