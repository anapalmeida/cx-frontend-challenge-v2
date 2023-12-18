import { DefaultSeo } from 'next-seo';
import React from 'react';

export default function SEO() {
  return (
    <DefaultSeo
      title='Mercado Livre Brasil - Frete Grátis no mesmo dia'
      description='Compre produtos com Frete Grátis no mesmo dia no Mercado Livre Brasil. Encontre milhares de marcas e produtos a preços incríveis.'
      openGraph={{
        type: 'website',
        locale: 'pt_BR',
        url: 'https://www.mercadolivre.com.br/',
        siteName: 'Mercado Livre',
      }}
      twitter={{
        handle: '@mercadolivre',
        site: 'https://twitter.com/MercadoLivre',
        cardType: 'https://twitter.com/MercadoLivre/photo',
      }}
      additionalLinkTags={[{ rel: 'icon', href: '/images/logo_ml.png' }]}
    />
  );
}
