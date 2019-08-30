import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import banner from '~/assets/banner.png';
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

export default function Meetup({ data }) {
  const { banner_id, title, date, location, organizer } = data;

  const formattedDate = format(
    subHours(parseISO(date), 3),
    "dd 'de' MMMM, 'às' H:mm",
    {
      locale: pt,
    }
  );
  return (
    <Container>
      <BannerContainer>
        <Banner source={banner_id.url ? { uri: banner_id.url } : banner} />
      </BannerContainer>
      <MeetupData>
        <MeetupTitle>{title}</MeetupTitle>
        <MeetupDataDetail>
          <Icon name="event" size={14} color="#999" />
          <DataText>{formattedDate}</DataText>
        </MeetupDataDetail>
        <MeetupDataDetail>
          <Icon name="place" size={14} color="#999" />
          <DataText>{location}</DataText>
        </MeetupDataDetail>
        <MeetupDataDetail>
          <Icon name="person" size={14} color="#999" />
          <DataText>{organizer.name}</DataText>
        </MeetupDataDetail>
      </MeetupData>
      <SubscribeButton>Realizar inscrição</SubscribeButton>
    </Container>
  );
}
