import { fireEvent, render } from '@testing-library/react';

import Navbar from '@/components/Navbar';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore();

describe('Navbar component', () => {
  it('renders the Navbar component with logo and SearchBar', () => {
    const { getByAltText, getByTestId } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    const logoImage = getByAltText('Logo Mercado Livre');
    expect(logoImage).toBeInTheDocument();

    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
  });

  it('dispatches clearResults action when clicking on the logo', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    const clearResultsMock = jest.fn();
    jest.mock('@/storage/slices/apiResultsSlice', () => ({
      ...jest.requireActual('@/storage/slices/apiResultsSlice'),
      clearResults: clearResultsMock,
    }));

    fireEvent.click(getByAltText('Logo Mercado Livre'));
    expect(clearResultsMock).toHaveBeenCalled();
  });
});
