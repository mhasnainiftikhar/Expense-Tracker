import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout.jsx'
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { validateEmail } from '../../utils/helper.js';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPath.js';
import { UserContext } from '../../context/UserContext.jsx';
import uploadImage from "../../utils/uploadImage";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {updateUser}=useContext(UserContext)

  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    let profilePicUrl = "";
    if (!fullName) return alert("Full name required");
    if (!validateEmail(email)) return alert("Invalid email");
    if (password.length < 8) return alert("Password must be 8+ chars");
     
    try {
       
      //upload image if present
      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profilePicUrl=imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
         profileImageUrl: profilePicUrl 
      });
       const { token, user } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      updateUser(user)
      navigate("/dashboard");
    }

      
    } catch (error) {
      if (error.response && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong. Please try again.");
    }
      
    }


  };
  

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-full flex flex-col justify-center'>

        {/* TITLE */}
        <h3 className='text-2xl font-bold text-black mb-2'>Create an Account</h3>
        <p className='text-sm text-gray-700 mb-6'>
          Join us today by entering your details below.
        </p>

        {/* FORM */}
        <form className='flex flex-col gap-4' onSubmit={handleSignup}>
          {/* PROFILE PICTURE UPLOAD */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

          {/* FULL NAME & EMAIL IN ONE ROW */}
          <div className='flex gap-4'>
            <div className='flex-1 flex flex-col'>
              <label className='text-sm font-medium text-gray-700 mb-1'>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800'
              />
            </div>

            <div className='flex-1 flex flex-col'>
              <label className='text-sm font-medium text-gray-700 mb-1'>Email Address</label>
              <input 
                type="email" 
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
          </div>

          {/* PASSWORD (FULL WIDTH) */}
          <div className='flex flex-col'>
            <label className='text-sm font-medium text-gray-700 mb-1'>Password</label>
            <div className='relative'>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 w-full'
              />
              <span 
                onClick={() => setShowPassword(!showPassword)} 
                className='absolute right-3 top-3 text-xl text-gray-500 cursor-pointer'
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {password.length > 0 && password.length < 8 && (
              <p className='text-xs text-red-500 mt-1'>
                Minimum password length is 8 characters
              </p>
            )}
          </div>

          {/* SIGN UP BUTTON (FULL WIDTH) */}
          <button 
            type="submit" 
            className='bg-green-700 text-white p-3 rounded-lg hover:bg-green-600 transition-colors font-semibold w-full'
          >
            Sign Up
          </button>
        </form>

        {/* FOOTER */}
        <p className='text-sm text-gray-600 mt-4'>
          Already have an account?{" "}
          <Link to="/login" className='text-green-600 font-semibold hover:underline'>
            Login
          </Link>
        </p>

      </div>
    </AuthLayout>
  )
}

export default Signup
