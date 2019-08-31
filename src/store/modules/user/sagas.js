import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    if (profile.password) {
      if (profile.password.length <= 5) {
        Alert.alert('Senha', 'Sua senha deve ter pelo menos 6 digitos.');
        throw new Error();
      }
    }

    const response = yield call(api.put, 'users', profile);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Erro ao atualizar perfil',
      'Confira seus dados e tente novamente!'
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
