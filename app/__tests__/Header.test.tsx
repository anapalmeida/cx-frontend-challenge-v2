import Header from '@/components/Header';
import React from 'react';
import { render } from '@testing-library/react';

describe('Header component', () => {
  it('renders the Header component with Navbar', () => {
    const { getByLabelText } = render(<Header />);

    const headerElement = getByLabelText('Main Navigation');
    expect(headerElement).toBeInTheDocument();

    const navbarElement = headerElement.querySelector('.navbar');
    expect(navbarElement).toBeInTheDocument();
  });
});
