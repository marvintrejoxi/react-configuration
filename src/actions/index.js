import { SET_AUTH, DESTROY_SESSION } from './action-types';

export function setAuth(obj){
  return {
    type: SET_AUTH,
    payload: obj
  }
}

export function destroySession(){
  return {
    type: DESTROY_SESSION
  }
}