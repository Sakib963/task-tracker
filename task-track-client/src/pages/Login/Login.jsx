import loginBg from "../../assets/images/task-bg.svg";
import { Typewriter } from "react-simple-typewriter";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
const Login = () => {
  const { googleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // Handling Google Sign In
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const loggedUser = res.user;
        const savedUser = {
          name: loggedUser.displayName || "N/A",
          email: loggedUser.email,
          photo: loggedUser.photoURL,
        };
        //   Saving User data to DB
        fetch("https://task-tracker-server-gray.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              navigate("/");
            }
          });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed Up Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="h-screen login text-white">
      <div className="grid lg:grid-cols-2 gap-4 w-full h-full px-10">
        <div className="flex items-center justify-center">
          <div className="space-y-3">
            <h3 className="lg:text-5xl text-3xl font-bold">
              Task Management is{" "}
              <span className="text-[#6C63FF]">
                <Typewriter
                  words={[
                    "Efficiency",
                    "Organization",
                    "Productivity",
                    "Control",
                    "Collaboration",
                    "Success",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h3>
            <p>
              Unlock your potential with our comprehensive task management app.
              From efficient task tracking to seamless collaboration, our app
              empowers you to stay organized, prioritize effectively, and
              achieve your goals. Harness the power of productivity and take
              control of your tasks with our intuitive solution.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="flex gap-2 items-center bg-white text-black font-semibold px-4 py-2 rounded-lg text-lg hover:bg-[#6C63FF] hover:text-white transition ease-in-out delay-150"
            >
              Continue With
              <FcGoogle />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src={loginBg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
