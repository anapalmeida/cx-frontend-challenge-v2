import React from 'react';
import SEO from '@/components/SEO';
import { render } from '@testing-library/react';

describe('SEO component', () => {
  it('renders the SEO component with default meta tags', () => {
    const { getByText, getByTitle } = render(<SEO />);

    const titleElement = getByTitle(
      'Mercado Livre Brasil - Frete Grátis no mesmo dia'
    );
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = getByText(
      'Compre produtos com Frete Grátis no mesmo dia no Mercado Livre Brasil. Encontre milhares de marcas e produtos a preços incríveis.'
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the SEO component with additional link tags', () => {
    const { getByTestId } = render(<SEO />);

    const faviconElement = getByTestId('favicon');
    expect(faviconElement).toHaveAttribute('rel', 'icon');
    expect(faviconElement).toHaveAttribute('href', '/images/logo_ml.png');
  });
});
