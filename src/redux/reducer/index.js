import {combineReducers} from 'redux';
import PersonalReducer from './PersonalReducer';

const combinedReducers = combineReducers({
  personalVal: PersonalReducer,
});
export default combinedReducers;
