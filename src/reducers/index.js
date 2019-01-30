import { combineReducers } from 'redux';
import { SET_AUTH, DESTROY_SESSION } from '../actions/action-types';

const INITIAL_STATE = {
  baseUrl: process.env.REACT_APP_API_URL,
  auth: {
    authorize: false,
    token: ''
  }
}

function data(state=INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTH:
      return { 
        ...state,
        auth: {
          ...action.payload
        }
      }
    case DESTROY_SESSION:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default combineReducers({data});