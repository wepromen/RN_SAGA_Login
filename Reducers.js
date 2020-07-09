import AsyncStorage from '@react-native-community/async-storage';

export default function authReducer(state, action) {
  if (typeof state === 'undefined') {
    return false;
  }

  switch (action.type) {
    case 'PRESSBTNLOGOUT':
      console.log('Reducer Action is PRESSBTNLOGOUT');
      return false;
    case 'PRESSBTNLOGIN':
      console.log('Reducer Action is PRESSBTNLOGIN');
      return false;
    case 'LOGIN':
      console.log('Reducer Action is LOGIN');
      return true;
    case 'LOGOUT':
      console.log('Reducer Action is LOGOUT');
      return false;
    default:
      return false;
  }
}
