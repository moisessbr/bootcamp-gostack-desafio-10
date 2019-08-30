import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import {
  meetupSubscribeSuccess,
  meetupCancelSubscribeSuccess,
  subscribeFailure,
} from './actions';

import api from '~/services/api';

export function* subscribeCancelRequest({ payload }) {
  const { id, navigation } = payload;
  try {
    yield call(api.delete, `subscribe/${id}`);

    yield put(meetupCancelSubscribeSuccess());
    Alert.alert('Inscrição', 'Inscrição cancelada com sucesso!');
    navigation.navigate('Subscriptions');
  } catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro ao cancelar sua inscrição!');
    yield put(subscribeFailure());
    navigation.navigate('Dashboard');
  }
}

export function* subscribeRequest({ payload }) {
  const { id, navigation } = payload;
  try {
    yield call(api.post, `subscribe`, {
      meetup_id: id,
    });

    yield put(meetupSubscribeSuccess());
    Alert.alert('Inscrição', 'Inscrição realizada com sucesso!');
    navigation.navigate('Subscriptions');
  } catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro ao realizar sua inscrição!');
    navigation.navigate('Dashboard');
    yield put(subscribeFailure());
  }
}

export default all([
  takeLatest('@subscribe/SUBSCRIBE_REQUEST', subscribeRequest),
  takeLatest('@subscribe/CANCEL_SUBSCRIBE_REQUEST', subscribeCancelRequest),
]);
