const initialState = {};
export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log('ADD_TO_CART: ' + action.payload);
      return action.payload;
  }
  return state;
}
