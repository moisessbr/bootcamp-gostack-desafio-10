import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const DateSelector = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

export const SelectedDate = styled.Text`
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: #fff;
  padding: 10px 20px;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
