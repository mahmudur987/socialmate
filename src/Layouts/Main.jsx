import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Main = () => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-between ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
