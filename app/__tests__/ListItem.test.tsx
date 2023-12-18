import { IProduct } from '@/interfaces/Products';
import ListItem from '@/components/ListItem';
import React from 'react';
import { render } from '@testing-library/react';

describe('ListItem component', () => {
  const mockProduct: IProduct = {
    id: '1',
    condition: 'New',
    picture: 'mock-picture-url',
    title: 'Mock Product',
    price: { currency: 'ARS', amount: '6', decimals: 3 },
    free_shipping: true,
    installments: { quantity: 3, amount: '33.33' },
    address: { state_name: 'Mock State', city_name: 'Mock City' },
  };

  it('renders the ListItem component with provided props', () => {
    const { getByText, getByAltText } = render(
      <ListItem props={mockProduct} />,
    );

    expect(getByText('Mock Product')).toBeInTheDocument();
    expect(getByText('En 3 cuotas de $33.33')).toBeInTheDocument();
    expect(getByAltText('Mock Product')).toBeInTheDocument();
  });

  it('renders free shipping icon when free_shipping prop is true', () => {
    const { getByLabelText } = render(<ListItem props={mockProduct} />);

    expect(getByLabelText('Free Shipping')).toBeInTheDocument();
  });
});
