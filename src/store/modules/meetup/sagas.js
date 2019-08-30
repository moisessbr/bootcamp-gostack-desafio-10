import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import {
  meetupDeleteSuccess,
  meetupDeleteFailure,
  meetupCreateSuccess,
  meetupEditCreateFailure,
  meetupEditSuccess,
} from './actions';

import api from '~/services/api';

export function* meetupDelRequest({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `meetups/${id}`);

    yield put(meetupDeleteSuccess());
    Alert.alert('Meetup', 'Deletado com sucesso.');
  } catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro ao deletar o meetup');
    yield put(meetupDeleteFailure());
  }
}

export function* meetupEditRequest({ payload, id }) {
  try {
    const { data } = payload;
    yield call(api.put, `meetups/${id}`, data);

    yield put(meetupEditSuccess());
    Alert.alert('Meetup', 'Alterado com sucesso!');
  } catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro ao editar o Meetup');
    yield put(meetupEditCreateFailure());
  }
}

export function* meetupCreateRequest({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, `meetups`, data);

    yield put(meetupCreateSuccess());
    Alert.alert('Meetup', 'Criado com sucesso!');
  } catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro ao criar o Meetup');
    yield put(meetupEditCreateFailure());
  }
}

export default all([
  takeLatest('@meetup/MEETUP_DELETE_REQUEST', meetupDelRequest),
  takeLatest('@meetup/MEETUP_EDIT_REQUEST', meetupEditRequest),
  takeLatest('@meetup/MEETUP_CREATE_REQUEST', meetupCreateRequest),
]);
