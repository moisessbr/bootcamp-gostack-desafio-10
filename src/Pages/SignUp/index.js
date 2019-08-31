import React, { useRef, useState } from 'react';
import * as Yup from 'yup';

import { Alert, Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Digite um nome com ao menos 5 caracteres.')
      .required('O nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido.')
      .required('O email é obrigatório'),
    password: Yup.string().min(6, 'Digite uma senha com 6 caracteres.'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'A nova senha e a confirmação não são iguais. Corrija e tente novamente.'
    ),
  });

  async function handleSubmit() {
    const data = { name, email, password, confirmPassword };

    try {
      await schema.validate(data);
      dispatch(signUpRequest(name, email, password, navigation));
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalise="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalise="none"
            ref={emailRef}
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            secureTextEntry
            placeholder="Confirme a senha"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho login </SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
