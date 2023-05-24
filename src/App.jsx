import { RouterProvider } from "react-router-dom";

import routes from "./Routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container mx-auto">
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
}

export default App;
