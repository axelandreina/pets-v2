import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponsesTypes";

const fetchPet: QueryFunction<PetAPIResponse, ["details", string]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  //React query needs us to throw an error if we don't have a response

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  //React query expect us to return a promise
  return apiRes.json();
};

export default fetchPet;
