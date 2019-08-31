import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { addDays, subDays, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Header from '~/components/Header';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import {
  Container,
  DateSelector,
  SelectedDate,
  MeetupList,
  EmptyList,
} from './styles';

export default function Dashboard({ navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(2);
  const [refreshing, setRefreshing] = useState(false);
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  const list = useRef();

  const dateFormatted = format(subHours(date, 3), "dd 'de' MMMM", {
    locale: pt,
  });

  async function loadAppointments() {
    setLoading(true);
    const response = await api.get('meetups', {
      params: {
        date,
      },
    });
    setMeetups(response.data);
    setLoading(false);
  }

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscribe');

      const subs = response.data.map(m => m.meetup_id);

      setSubscriptions(subs);
    }

    loadSubscriptions();
  }, []);

  useEffect(() => {
    loadAppointments();
    list.current.scrollToOffset({ offset: 0, animated: true });
  }, [date]); //eslint-disable-line

  async function loadMore() {
    if (!load) {
      return;
    }
    const response = await api.get('meetups', {
      params: {
        date,
        page,
      },
    });
    if (response.data.length === 0) {
      setLoad(false);
      return;
    }
    setMeetups([...meetups, ...response.data]);
    setPage(page + 1);
  }

  function refreshList() {
    setRefreshing(true);
    loadAppointments();
    setPage(2);
    setLoad(true);
    setRefreshing(false);
  }

  function addDay() {
    setDate(addDays(date, 1));
    setPage(2);
    setLoad(true);
  }

  function subDay() {
    setDate(subDays(date, 1));
    setPage(2);
    setLoad(true);
  }

  function handleSubscribe(meetup) {
    navigation.navigate('Subscribe', {
      meetup,
    });
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateSelector>
          <TouchableOpacity onPress={subDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <SelectedDate>{dateFormatted}</SelectedDate>
          <TouchableOpacity onPress={addDay}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateSelector>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <MeetupList
            onRefresh={() => refreshList()}
            refreshing={refreshing}
            onEndReachedThreshold={0.1}
            onEndReached={() => loadMore()}
            data={meetups}
            ref={list}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item}
                onSubscribe={() => handleSubscribe(item)}
                subs={subscriptions}
              />
            )}
            ListEmptyComponent={
              <EmptyList>Nesta data não há meetups.</EmptyList>
            }
          />
        )}
      </Container>
    </Background>
  );
}

function tabBarIcon({ tintColor }) {
  return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

Dashboard.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
