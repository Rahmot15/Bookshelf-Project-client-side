import React, { use } from "react";
import register from "../Lottie/Register.json";
import registerAnimation from "../Lottie/registerAnimation.json";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, signInGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, ...rest } = Object.fromEntries(formData.entries());

    console.log(rest);

    createUser(email, password)
      .then((result) => {
        console.log(result);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Register failed: " + error.message);
      });
  };

  const handleGoogle = () => {
    signInGoogle()
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed: " + error.message);
      });
  };
  return (
    <div>
      <div
        className="hero  min-h-[calc(100vh-242px)] "
        style={{ backgroundImage: `url('/gradient.svg')` }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse lg:gap-20">
          <div className=" lg:block hidden ">
            <Lottie
              style={{ width: "500px" }}
              animationData={register}
              loop={true}
            ></Lottie>
          </div>

          <div className="card border-gray-800 border  md:w-lg  shrink-0 shadow-2xl">
            <div className="card-body ">
              <div className="flex items-center  justify-center">
                <Lottie
                  style={{ width: "150px" }}
                  animationData={registerAnimation}
                  loop={true}
                ></Lottie>
              </div>

              <form onSubmit={handleRegister} className="fieldset space-y-3">
                {/* Name field  */}

                <input
                  type="name"
                  name="name"
                  className="input input-lg w-full"
                  placeholder="Name"
                />

                {/* PhotoUrl field  */}

                <input
                  type="text"
                  name="PhotoURL"
                  className="input input-lg w-full"
                  placeholder="PhotoUrl"
                />

                {/* Email field */}

                <label className="input input-lg w-full validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    name="email"
                    type="email"
                    placeholder="mail@site.com"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>

                {/* Password field */}

                <label className="input input-lg w-full  validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  />
                </label>
                {/*  */}
                <p className="validator-hint hidden">
                  Must be more than 8 characters, including
                  <br />
                  At least one number <br />
                  At least one lowercase letter <br />
                  At least one uppercase letter
                </p>

                <button type="submit" className="btn btn-info mt-1">
                  Login
                </button>
                <p className="text-2xl text-center fon -mb-2 text-gray-200">or</p>
                <button
                  onClick={handleGoogle}
                  type="button"
                  className="btn btn-secondary btn-outline mt-4 text-lg"
                >
                  {" "}
                  <FcGoogle size={25} /> Login with google{" "}
                </button>
                <p className="text-lg text-center mt-2 text-gray-200">
                  Already have an account?{" "}
                  <Link
                    className="text-blue-600 hover:text-blue-700"
                    to={"/auth/login"}
                  >
                    Login
                  </Link>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
