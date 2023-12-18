import { GetServerSideProps, NextPage } from "next";
import { IApiParams, IApiResponseClient } from "@/interfaces/Api";

import List from "@/components/List";
import React from "react";
import apiService from "@/services/apiService";
import { setResults } from "@/storage/slices/apiResultsSlice";
import { useDispatch } from "react-redux";

interface SearchPageProps {
  results: IApiResponseClient | null;
}

const SearchPage: NextPage<SearchPageProps> = ({
  results,
}: SearchPageProps) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (results) {
      dispatch(setResults(results));
    }
  }, [results, dispatch]);

  return <List />;
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const { query } = context.params || {};

  try {
    const results = await apiService.searchProducts({
      textToSearch: query,
      sortBy: query,
    } as IApiParams);

    return {
      props: {
        results: JSON.parse(JSON.stringify(results)),
      },
    };
  } catch (error) {
    console.error("Error in server-side API call:", error);
    return {
      props: {
        results: null,
      },
    } as { props: SearchPageProps };
  }
};

export default SearchPage;
