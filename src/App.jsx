import { useState, lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContex";

const Details = lazy(() => import("./Details"))
const SearchParams = lazy(() => import("./SearchParams"))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  }
})

const App = () => {
  // By doing this way, we are passing the whole hook into
  const adoptedPet = useState(null);
  return (
    <div className="p-0 m-0" >
      <QueryClientProvider client={queryClient}>
        {/* This makes the state available for search, home, etc. */}
        <Suspense fallback={<div className="loading-pane">
          <h2 className="loader">🤓</h2>
        </div>}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500">
              <Link className="text-6xl text-white hover:text-gray-200" to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </Suspense>

      </QueryClientProvider>
    </div >

  )
};

export default App; 
