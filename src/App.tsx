import { useState, lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import { Pet } from "./APIResponsesTypes";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // By doing this way, we are passing the whole hook into
  const adoptedPet = useState(null as Pet | null);
  return (
    <div className="m-0 p-0">
      <QueryClientProvider client={queryClient}>
        {/* This makes the state available for search, home, etc. */}
        <Suspense
          fallback={
            <div className="loading-pane">
              <h2 className="loader">🤓</h2>
            </div>
          }
        >
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
              <Link className="text-6xl text-white hover:text-gray-200" to="/">
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </Suspense>
      </QueryClientProvider>
    </div>
  );
};

export default App;
