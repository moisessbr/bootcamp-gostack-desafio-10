import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import Header from '~/components/Header';
import {
  Container,
  Form,
  Separator,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const profile = useSelector(state => state.user.profile);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSignOut() {
    dispatch(signOut());
  }

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Digite um nome com ao menos 5 caracteres.')
      .required('O nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido.')
      .required('O email é obrigatório'),
    oldPassword: Yup.string(),
    password: Yup.string(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'A nova senha e a confirmação não são iguais. Corrija e tente novamente.'
    ),
  });

  async function handleSubmit() {
    const data = { name, email, oldPassword, password, confirmPassword };

    try {
      await schema.validate(data);
      dispatch(updateProfileRequest(data));
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
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
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <Separator />
          <FormInput
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
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
            Salvar perfil
          </SubmitButton>
        </Form>

        <LogoutButton onPress={handleSignOut}>Sair do Meetapp</LogoutButton>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
