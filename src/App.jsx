import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./Routes/Routes";
import { Toaster } from "react-hot-toast";
import { QueryClient } from "react-query";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
