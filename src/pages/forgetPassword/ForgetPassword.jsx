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
      fetch("http://localhost:5000/forgot-password", {
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
          if (data.status === "ok") {
            localStorage.setItem("token", data.data);
            toast.success("user Login scssessfully");
            navigate("/");
          } else {
            toast.error(data.status);
            SetError(data.status);
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
    Setloading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your registerd email Email</span>
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
              <button type="submit" className="btn btn-primary">
                Forget password
              </button>
            </div>
          </form>

          <Link to={"/login"} type="submit" className=" w-full text-center">
            go login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
