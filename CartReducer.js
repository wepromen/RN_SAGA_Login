const initialState = {items: [], id: '', quantity: ''};
export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log('ADD_TO_CART: ' + action.payload + ' ' + action.quantity);
      return {items: action.payload, id: action.id, quantity: action.quantity};
    case 'UPDATEQT':
      console.log(
        'UPDATEQT - id: ' + action.id + ' Quantity: ' + action.quantity,
      );
      return {id: action.id, quantity: action.quantity};
    default:
      return state;
  }
  // return state;
}
