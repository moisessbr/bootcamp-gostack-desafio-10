import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Button from '~/components/Button';

const deviceWidth = Dimensions.get('window').width;

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #fff;
  margin: 10px 20px;
  text-align: center;
  overflow: hidden;
`;

export const BannerContainer = styled.View`
  align-self: stretch;
  text-align: center;
  margin: 0;
  overflow: hidden;
`;

export const Banner = styled.Image`
  align-self: center;
  width: ${deviceWidth - 40};
`;

export const MeetupTitle = styled.Text`
  font-size: 18px;
  line-height: 25px;
  font-weight: bold;
  color: #333;
  padding-bottom: 5px;
`;

export const MeetupData = styled.View`
  align-self: stretch;
  margin: 10px 20px;
`;
export const MeetupDataDetail = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
export const DataText = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  padding: 5px 5px;
`;
export const SubscribeButton = styled(Button)`
  align-self: stretch;
  margin: 0 20px 20px;
  opacity: ${props => (props.subscribed ? 0.6 : 1)};
  background: ${props => (props.past ? '#ccc' : '#f94d6a')};
`;
