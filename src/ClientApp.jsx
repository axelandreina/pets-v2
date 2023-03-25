import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Here is where we would add stuff like Google Analytics

hydrateRoot(
    document.getElementById("root"),
    <BrowserRouter>
        <App />
    </BrowserRouter>
)