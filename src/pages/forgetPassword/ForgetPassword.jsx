import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { authContext } from "../../Context/UserContext";
const ForgetPassword = () => {
  const [loading, Setloading] = useState(false);

  const [error, SetError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    Setloading(true);
    event.preventDefault();
    const form = event.target;
    const email = form.name.value;

    try {
      fetch("https://socialmate-server.vercel.app/forgot-password", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          Setloading(false);
          console.log(data);
          toast.error(data.status, {
            duration: 10000,
          });
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.status, {
        duration: 10000,
      });
    }
    Setloading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="hero ">
      <div className=" w-full max-w-lg bg-base-200">
        <div className="card  w-full max-w-lg shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">
                  Please write your aignup Email
                </span>
              </label>
              <input
                // required
                name="name"
                type="text"
                placeholder="please write your email"
                className="input input-bordered"
              />
              <p className="text-red-500"> {error} </p>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-1/2 mx-auto">
                Forget password
              </button>
            </div>
          </form>

          <Link
            to={"/login"}
            type="submit"
            className=" w-full text-center text-2xl font-bold text-blue-600 underline p-3"
          >
            go login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
