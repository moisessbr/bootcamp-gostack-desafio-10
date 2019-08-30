import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
// import { Container } from './styles';

export default function BarStatus() {
  const signed = useSelector(state => state.auth.signed);
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={signed ? '#18161F' : '#22202c'}
    />
  );
}
