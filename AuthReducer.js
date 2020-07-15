let isPressLogin = false;
export default function authReducer(state = false, action) {
  if (typeof state === 'undefined') {
    return false;
  }

  switch (action.type) {
    case 'PRESSBTNLOGOUT':
      console.log('Reducer Action is PRESSBTNLOGOUT');
      return false;
    case 'PRESSBTNLOGIN':
      console.log('Reducer Action is PRESSBTNLOGIN');
      isPressLogin = true;
      return {state, isPressLogin: isPressLogin};
    case 'LOGIN':
      console.log('Reducer Action is LOGIN');
      return true;
    case 'LOGOUT':
      console.log('Reducer Action is LOGOUT');
      return false;
    default:
      return state;
  }
}
