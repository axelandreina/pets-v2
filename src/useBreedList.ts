import { QueryStatus, useQuery } from "@tanstack/react-query";
import { Animal } from "./APIResponsesTypes";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);
  /* The line below says: 
  The first time this goes to fetch it's not goanna be available, it's gonna give a loading state back.
  So the "?" says if this is available then give me that, don't give me an error.
  The "??" says if any of this (results?.data?.breeds) fails, give me back just an empty array
  */
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
}
