const INITIAL_STATE = [{isLogged: false}];
export default function authReducer(state = INITIAL_STATE, action) {
  if (typeof state === 'undefined') {
    return false;
  }

  switch (action.type) {
    case 'PRESSBTNLOGOUT':
      console.log('Reducer Action is PRESSBTNLOGOUT');
      return [...state, {isLogged: false}];
    case 'PRESSBTNLOGIN':
      console.log('Reducer Action is PRESSBTNLOGIN');
      return [...state, {isLogged: false}];
    case 'LOGIN':
      console.log('Reducer Action is LOGIN');
      return [...state, {isLogged: true}];
    case 'LOGOUT':
      console.log('Reducer Action is LOGOUT');
      return [...state, {isLogged: false}];
    default:
      return [...state, {isLogged: false}];
  }
}
