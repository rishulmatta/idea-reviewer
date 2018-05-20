import { combineReducers } from 'redux';
import auth from './auth';
import global from './global';
import idea from './idea';

export default combineReducers({auth, global, idea});