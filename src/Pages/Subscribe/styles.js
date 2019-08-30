import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Button from '~/components/Button';

const deviceWidth = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
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

export const MeetupData = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin: 10px 20px;
`;

export const MeetupTitle = styled.Text`
  font-size: 18px;
  line-height: 25px;
  font-weight: bold;
  color: #333;
  padding-bottom: 5px;
`;

export const MeetupDataDetail = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
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
`;
