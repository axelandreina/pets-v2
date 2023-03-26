import { useState, useContext, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

// This is just to show how to split the modal. It's not really needed because its size is vary small.
const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();

  if (!id) {
    throw new Error("Give me an id!");
  }

  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🤓</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];
  if (!pet) {
    throw new Error("no pet :(");
  }

  return (
    <div className="m-4 grid grid-cols-3 gap-6">
      <Carousel images={pet.images} />
      <div className="col-span-2">
        <h1 className="text-4xl font-semibold">{pet.name} </h1>
        <h2 className="mb-2 font-extralight">
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button className="mb-2" onClick={() => setShowModal(true)}>
          Adopt {pet.name}
        </button>
        <p className="font-light">{pet.description} </p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      {/* We added {...props} here because ErrorBoundary will kill the props on the way */}
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
