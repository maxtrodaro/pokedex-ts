import { BrowserRouter } from "react-router-dom";

import { FavoriteProvider } from "./contexts/favorites";
import { PaginationProvider } from "./contexts/pagination";

import Routes from "./Routes";

const App = () => (
  <BrowserRouter>
    <FavoriteProvider>
      <PaginationProvider>
        <Routes />
      </PaginationProvider>
    </FavoriteProvider>
  </BrowserRouter>
);

export default App;
