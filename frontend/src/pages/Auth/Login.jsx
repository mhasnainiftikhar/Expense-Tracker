import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout.jsx'
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js'; 
import { API_PATHS } from '../../utils/apiPath.js';
import { UserContext } from '../../context/UserContext.jsx';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 8) {
      setError("Minimum password length is 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      // DEBUG: always helpful to inspect the full response in console
      console.log("LOGIN RESPONSE (full):", response);

      const data = response.data || {};

      // Some backends return { token, user: { ... } }
      // Others (like yours) return flattened fields:
      // { token, _id, fullName, email, profileImageUrl, ... }
      let token = data.token || null;
      let userObj = null;

      if (data.user) {
        // backend returned a `user` object
        userObj = data.user;
      } else if (data.fullName || data._id || data.email) {
        // backend returned flattened fields — build user object
        userObj = {
          _id: data._id || data.id || null,
          fullName: data.fullName || data.name || "",
          email: data.email || "",
          profileImageUrl: data.profileImageUrl || data.image || "",
        };
      }

      // If still no token, treat as failure
      if (!token) {
        // If server returns token under a different key, log response
        console.error("No token in login response:", data);
        setError("Login failed: no token received from server.");
        setLoading(false);
        return;
      }

      // Persist token and user safely
      try {
        localStorage.setItem("token", token);
        if (userObj) {
          localStorage.setItem("user", JSON.stringify(userObj));
          updateUser(userObj);
        } else {
          // if no user object, at least clear previous user and still navigate
          updateUser(null);
        }
      } catch (storageErr) {
        console.error("Failed to set localStorage:", storageErr);
      }

      // success: navigate
      navigate('/dashboard');

    } catch (err) {
      console.error("Login error:", err);

      // network / axios error handling
      if (err.response && err.response.data) {
        // If backend sends message field
        const msg = err.response.data.message || err.response.data.error || JSON.stringify(err.response.data);
        setError(msg);
      } else if (err.request) {
        setError("No response from server. Check network / server status.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center mx-auto'>

        <h3 className='text-2xl font-bold text-black mb-2'>Welcome Back</h3>
        <p className='text-sm text-gray-700 mb-6'>
          Please enter your details to Login.
        </p>

        <form
          className='flex flex-col gap-4'
          onSubmit={handleLogin}
        >

          <div className="flex flex-col">
            <label htmlFor="email" className='text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800'
            />

            {email.length > 0 && !validateEmail(email) && (
              <p className='text-xs text-red-500 mt-1'>
                Please enter a valid email address.
              </p>
            )}
          </div>

          <div className='relative'>
            <label htmlFor="password" className='text-sm font-medium text-gray-700 mb-1 block'>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 w-full'
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-10 text-xl text-gray-500 cursor-pointer'
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>

            {password.length > 0 && password.length < 8 && (
              <p className='text-xs text-red-500 mt-1'>
                Minimum password length is 8 characters
              </p>
            )}
          </div>

          {error && (
            <p className='text-sm text-red-500'>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className='bg-green-700 text-white p-3 rounded-lg hover:bg-green-600 transition-colors font-semibold mt-2 disabled:opacity-60'
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className='text-sm text-gray-600 mt-4'>
          Don't have an account?{" "}
          <Link to="/signup" className='text-green-600 font-semibold hover:underline'>
            Sign Up
          </Link>
        </p>

      </div>
    </AuthLayout>
  )
}

export default Login
