import { NextApiRequest, NextApiResponse } from "next";

import apiService from "@/services/apiService";

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { textToSearch, sortBy, priceFilter } = req.query;

  try {
    const data = await apiService.searchProducts({
      textToSearch: textToSearch as string,
      sortBy: sortBy as string,
      priceFilter: priceFilter as string,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error in API call:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
