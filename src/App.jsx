import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Component/Router";
import Snowfall from "react-snowfall";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
