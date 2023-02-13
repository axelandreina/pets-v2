import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContex";
import Details from "./Details";
import SearchParams from "./SearchParams";

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* This makes the state available for search, home, etc. */}
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
