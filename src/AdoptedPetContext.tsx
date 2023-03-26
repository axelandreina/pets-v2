import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: 3548,
    name: "Dust",
    animal: "cat",
    description: "Cute cat",
    breed: "Unknown",
    images: [],
    city: "San Francisco",
    state: "CA ",
  },
  () => {},
]);

export default AdoptedPetContext;
