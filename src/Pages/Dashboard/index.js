import React, { useEffect, useState } from 'react';
import { addDays, subDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Header from '~/components/Header';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import { Container, DateSelector, SelectedDate, MeetupList } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(2);
  const [refreshing, setRefreshing] = useState(false);
  const [load, setLoad] = useState(true);

  const dateFormatted = format(date, "dd 'de' MMMM", { locale: pt });

  async function loadAppointments() {
    const response = await api.get('meetups', {
      params: {
        date,
      },
    });
    setMeetups(response.data);
    console.tron.log(response);
  }

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
    loadAppointments();
    setPage(2);
    setLoad(true);
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

  useEffect(() => {
    loadAppointments();
  }, [date]); //eslint-disable-line

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
        <MeetupList
          onRefresh={() => refreshList()}
          refreshing={refreshing}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMore()}
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup data={item} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
