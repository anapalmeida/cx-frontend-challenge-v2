interface SetSortByAction {
  type: 'SET_SORT_BY';
  payload: string;
}

const initialState = {
  sortBy: 'relevance',
};

const sortByReducer = (state = initialState, action: SetSortByAction) => {
  switch (action.type) {
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};

export default sortByReducer;
