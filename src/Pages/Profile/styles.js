import { Platform, Dimensions } from 'react-native';

import styled from 'styled-components/native';
import Input from '~/components/Input';
import Button from '~/components/Button';

const deviceWidth = Dimensions.get('window').width;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 0 20px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;
export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
export const LogoutButton = styled(Button)`
  margin-top: 20px;
  background: #d44059;
  height: 50px;
  width: ${deviceWidth - 40};
`;
