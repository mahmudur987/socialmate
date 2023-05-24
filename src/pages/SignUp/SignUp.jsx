import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { authContext } from "../../Context/UserContext";

const SignUp = () => {
  const [loading, Setloading] = useState(false);
  const [error, SetError] = useState("");
  const { SetUser } = useContext(authContext);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    Setloading(true);
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpassword = form.confirmpassword.value;
    SetError("");
    if (password !== confirmpassword) {
      SetError("your password does not match");
      Setloading(false);
      return toast.error("your password doesnot match");
    }
    const user = {
      name,
      email,
      password,
    };

    try {
      fetch("https://socialmate-server.vercel.app/register", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "ok") {
            Setloading(false);
            SetUser(user);
            localStorage.setItem("token", data.data);
            navigate("/");
          } else {
            toast.error(data.status);
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
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up!</h1>
          <p className="py-6">
            Already have an Account ! please{" "}
            <Link className="text-blue-500 text-bold" to={"/login"}>
              {" "}
              Login
            </Link>
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                // required
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                // required
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                // required
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                // required
                name="confirmpassword"
                type="password"
                placeholder=" retype password"
                className="input input-bordered"
              />

              <p className="text-red-500"> {error} </p>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign Up{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
