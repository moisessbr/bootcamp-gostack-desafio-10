import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import SignIn from '~/Pages/SignIn';
import SignUp from '~/Pages/SignUp';

import Dashboard from '~/Pages/Dashboard';
import Profile from '~/Pages/Profile';
import Subscriptions from '~/Pages/Subscriptions';
import Subscribe from '~/Pages/Subscribe';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        Confirm: createStackNavigator(
          {
            Subscribe,
          },
          {
            defaultNavigationOptions: {
              headerTransparent: true,
              headerTintColor: '#fff',
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
            },
          }
        ),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscriptions,
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              style: {
                backgroundColor: '#2B1A2F',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
