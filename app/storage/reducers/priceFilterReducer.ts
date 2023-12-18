interface SetPriceFilterAction {
  type: 'SET_PRICE_FILTER';
  payload: string;
}

const initialState = {
  priceFilter: '',
};

const priceFilterReducer = (
  state = initialState,
  action: SetPriceFilterAction,
) => {
  switch (action.type) {
    case 'SET_PRICE_FILTER':
      return { ...state, priceFilter: action.payload };
    default:
      return state;
  }
};

export default priceFilterReducer;
