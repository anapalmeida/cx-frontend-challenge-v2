import NotFound from '@/components/NotFound';
import React from 'react';
import { render } from '@testing-library/react';

describe('NotFound component', () => {
  it('renders the NotFound component with a default message', () => {
    const { getByText } = render(<NotFound />);

    const defaultMessage = getByText('Not found');
    expect(defaultMessage).toBeInTheDocument();
  });

  it('renders the NotFound component with a custom message', () => {
    const customMessage = 'Custom error message';
    const { getByText } = render(<NotFound message={customMessage} />);

    const customMessageElement = getByText(customMessage);
    expect(customMessageElement).toBeInTheDocument();
  });
});
