import { IApiParams, IApiResponseClient } from '@/interfaces/Api';
import { IApiProduct, IProduct } from '@/interfaces/Products';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { IFilter } from '@/interfaces/Filters';
import ISort from '@/interfaces/SortBy';

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiErrorResponse {
  response?: {
    status?: number;
  };
  message: string;
}

const handleApiError = (error: ApiErrorResponse) => {
  if (axios.isAxiosError(error)) {
    console.error('API request failed:', error.response?.status, error.message);
  } else {
    console.error('Unexpected error during API request:', error.message);
  }
};

const constructApiUrl = ({ textToSearch, sortBy, priceFilter }: IApiParams) => {
  let apiURL = `${NEXT_PUBLIC_API_BASE_URL}/sites/MLA/search?q=${textToSearch}&sort=${sortBy}&limit=10`;

  if (!textToSearch.trim()) {
    throw new Error('Search text cannot be empty');
  }

  if (priceFilter) {
    apiURL = `${NEXT_PUBLIC_API_BASE_URL}/sites/MLA/search?q=${textToSearch}&sort=${sortBy}&price=${priceFilter}&limit=10`;
  }

  return apiURL;
};

const mapProductData = async (product: IApiProduct): Promise<IProduct> => {
  const sellerID = product?.seller?.id;

  let sellerAddress = {
    state_name: 'N/A',
    city_name: 'N/A',
  };

  try {
    if (sellerID) {
      const sellerResponse = await axios.get(
        `${NEXT_PUBLIC_API_BASE_URL}/users/${sellerID}`
      );

      const sellerData = sellerResponse.data;

      if (sellerData && sellerData.address) {
        sellerAddress = {
          state_name: sellerData.address.state || 'N/A',
          city_name: sellerData.address.city || 'N/A',
        };
      }
    }
  } catch (error) {
    handleApiError(error as AxiosError<ApiErrorResponse>);
    throw new Error('Failed to fetch address');
  }

  return {
    id: product?.id,
    title: product?.title,
    price: {
      currency: product?.installments?.currency_id,
      amount: product?.price.toString(),
      decimals: 0,
    },
    installments: {
      quantity: product?.installments?.quantity,
      amount: product?.installments?.amount,
    },
    address: sellerAddress,
    picture: product?.thumbnail,
    condition: product?.condition,
    free_shipping: product?.shipping?.free_shipping,
  };
};

const makeApiRequest = async (apiURL: string): Promise<IApiResponseClient> => {
  try {
    const response: AxiosResponse = await axios.get(apiURL);
    const data = response.data;

    if (data && data.results && data.results.length > 0) {
      const availableFilters = data.available_filters.filter(
        (filter: IFilter) => filter.id === 'price'
      );
      const availableSorts = data.available_sorts;
      const currentSort = data.sort;
      const mergedSorts = [].concat(availableSorts, currentSort);

      const mappedProductsPromises: Promise<IProduct>[] = data.results.map(
        async (product: IApiProduct) => {
          const mappedProduct = await mapProductData(product);
          return mappedProduct;
        }
      );

      const mappedProducts = await Promise.all(mappedProductsPromises);

      return {
        available_filters: availableFilters,
        available_sorts: mergedSorts.sort((a: ISort, b: ISort) =>
          a.name.localeCompare(b.name)
        ),
        results: mappedProducts,
      };
    }

    return {
      available_filters: [],
      available_sorts: [],
      results: [],
    };
  } catch (error) {
    handleApiError(error as AxiosError<ApiErrorResponse>);
    throw new Error('Failed to fetch results');
  }
};

const apiService = {
  searchProducts: async (props: IApiParams) => {
    const apiURL = constructApiUrl(props);
    return makeApiRequest(apiURL);
  },
};

export default apiService;
