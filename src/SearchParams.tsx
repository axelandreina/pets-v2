import {
  useState,
  useContext,
  useDeferredValue,
  useMemo,
  useTransition,
} from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { Animal } from "./APIResponsesTypes";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "reptile", "rabbit"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "" as Animal,
    breed: "",
  });

  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const [isPending, startTransition] = useTransition();

  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );

  /* This is what is happening with the line above:
        const locationHook = useState("") 
        const location = locationHook[0];
        const setLocation = locationHook[1];
    */

  return (
    <div className="mx-auto my-0 w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          /*The new FormData below what does is not something from react. It's a browser API.
                    It will pull out all the data in a form in an object.
                    */
          const formData = new FormData(e.currentTarget);

          const obj = {
            animal:
              (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            location: formData.get("location")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
          };
          startTransition(() => setRequestParams(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            className="search-input"
            type="text"
            name="location"
            placeholder="Location"
            id="location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            className="search-input"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            className="search-input grayed-out-disabled"
            disabled={!breeds.length}
            id="breed"
            name="breed"
          >
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        {isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">🤔</h2>
          </div>
        ) : (
          <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
            Submit
          </button>
        )}
      </form>
      {renderedPets}
    </div>
  );
};

export default SearchParams;
