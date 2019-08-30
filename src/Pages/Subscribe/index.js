import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Header from '~/components/Header';
import Background from '~/components/Background';
import banner from '~/assets/banner.png';
import { meetupSubscribeRequest } from '~/store/modules/subscribe/actions';
import {
  Container,
  BannerContainer,
  Banner,
  MeetupTitle,
  MeetupData,
  MeetupDataDetail,
  DataText,
  SubscribeButton,
} from './styles';

export default function Subscribe({ navigation }) {
  const meetup = navigation.getParam('meetup');
  const loading = useSelector(state => state.subscribe.loading);
  const dispatch = useDispatch();
  const formattedDate = format(
    subHours(parseISO(meetup.date), 3),
    "dd 'de' MMMM, 'às' H:mm",
    {
      locale: pt,
    }
  );

  function handleSubscribe() {
    dispatch(meetupSubscribeRequest(meetup.id, navigation));
  }

  return (
    <Background>
      <Header />
      <Container>
        <BannerContainer>
          <Banner
            source={
              meetup.banner_id.url ? { uri: meetup.banner_id.url } : banner
            }
          />
        </BannerContainer>
        <MeetupData>
          <MeetupTitle>{meetup.title}</MeetupTitle>
          <MeetupDataDetail>
            <Icon name="description" size={14} color="#999" />
            <DataText>{meetup.description}</DataText>
          </MeetupDataDetail>
          <MeetupDataDetail>
            <Icon name="event" size={14} color="#999" />
            <DataText>{formattedDate}</DataText>
          </MeetupDataDetail>
          <MeetupDataDetail>
            <Icon name="place" size={14} color="#999" />
            <DataText>{meetup.location}</DataText>
          </MeetupDataDetail>
          <MeetupDataDetail>
            <Icon name="person" size={14} color="#999" />
            <DataText>{meetup.organizer.name}</DataText>
          </MeetupDataDetail>
        </MeetupData>
        <SubscribeButton onPress={handleSubscribe} loading={loading}>
          Confirmar inscrição
        </SubscribeButton>
      </Container>
    </Background>
  );
}

Subscribe.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
