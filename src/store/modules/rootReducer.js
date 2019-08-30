import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import subscribe from './subscribe/reducer';

export default combineReducers({ auth, user, subscribe });
