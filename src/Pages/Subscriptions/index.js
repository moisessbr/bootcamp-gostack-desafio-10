import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, MeetupList } from './styles';

import { meetupCancelSubscribeRequest } from '~/store/modules/subscribe/actions';

export default function Subscriptions({ navigation }) {
  const dispatch = useDispatch();
  const [subscriptions, setSubscriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadSubscriptions() {
    setLoading(true);
    const response = await api.get('subscribe');

    setSubscriptions(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadSubscriptions();
  }, []); //eslint-disable-line

  function refreshList() {
    setRefreshing(true);
    loadSubscriptions();
    setRefreshing(false);
  }

  function handleCancel(id) {
    dispatch(meetupCancelSubscribeRequest(id, refreshList, navigation));
  }

  return (
    <Background>
      <Header />
      <Container>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <MeetupList
            onRefresh={() => refreshList()}
            refreshing={refreshing}
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item.Meetup}
                onCancel={() => handleCancel(item.id)}
                subs={subscriptions}
                cancel
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
