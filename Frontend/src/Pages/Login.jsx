import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
export default function Login() {
  const { setShowLogin , axios , setUser, backendUrl } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("login");
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50"
      onClick={() => setShowLogin(false)}
    >
      <form
        onClick={(e)=> e.stopPropagation()}
        onSubmit={async(e) => {
          e.preventDefault();
          if(state == "login"){
          try {
            const {data} = await axios.post(backendUrl + '/api/user/login' , { email , password});
            console.log(data)
            if(data.success){ toast.success("Logged In"); setUser(data.user); setShowLogin(false);
            }else{
              toast.error(data.message);
            }
          } catch (error) {
            console.log(error)
            toast.error(error.message);
          }
        }else{
          try {
            const {data} =  await axios.post(backendUrl + '/api/user/register' , {name , email , password});
            if(data.success){
              toast.success("Register Successfully");
              setUser(data.user);
              setShowLogin(false);
              console.log(data);
            }else{
              toast.error(data.message);
            } 
          } catch (error) {
            toast.error(error.message);
          }
        }
        }}
        className="md:max-w-96 w-5/6 text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state == "login" ? "Login" : "Register"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">{`Please ${
          state == "login" ? "Sign in" : "register"
        } to continue`}</p>
        {state == "register" && (
          <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0"
                fill="#475569"
              />
            </svg>
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="email"
            placeholder="Email id"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-5 text-left text-[#FF6347]">
          {state == "login" && (
            <a className="text-sm" href="#">
              Forgot password?
            </a>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-[#FF6347] cursor-pointer hover:opacity-90 transition-opacity"
        >
          {state == "login" ? "Login" : "Register"}
        </button>
        <div className="mb-11 mt-3">
          {state == "login" && (
            <p className="text-gray-500 text-sm cursor-pointer">
              Don’t have an account?{" "}
              <a
                className="text-[#FF6347]"
                onClick={() => setState("register")}
              >
                Sign up
              </a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
