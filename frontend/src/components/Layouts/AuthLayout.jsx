import React from 'react'
import logo from "../../assets/logo.png"
import cover from "../../assets/cover.webp"
import { LuTrendingUpDown } from "react-icons/lu"

const AuthLayout = ({ children }) => {

  
  const StatsInfoCard = ({ icon, title, stat, color }) => {
    return (
      <div className='p-4 rounded-xl bg-white shadow-md flex items-center gap-4'>
        <div className={`p-3 rounded-lg bg-${color}-100 text-${color}-600 text-xl`}>
          {icon}
        </div>
        <div>
          <h4 className='text-sm font-medium text-gray-700'>{title}</h4>
          <p className='text-lg font-semibold text-black'>{stat}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      
      {/* LEFT SIDE */}
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-5 pb-12'>

        <div className='flex items-center gap-3'>
          <img 
            src={logo} 
            alt='Logo'
            className='w-12 h-12'
          />
          <h2 className='text-lg font-semibold text-black'>Expense Tracker</h2>
        </div>
        {children}
      </div>

      {/* RIGHT SIDE */}
      <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative rounded-3xl m-4'>

        <div className='w-48 h-48 rounded-[40px] bg-green-400 absolute -top-7 -left-5' />
        <div className='w-48 h-56 rounded-[40px] border border-green-300 absolute top-[30%] -right-10' />
        <div className='w-48 h-48 rounded-[40px] bg-green-700 absolute -bottom-7 -left-5' />

        <div className='grid grid-cols-1 z-20 relative'>
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            title="Expense Overview"
            stat="$12,0345"
            color="green"
          />
        </div>

        <img 
          src={cover} 
          alt='Cover' 
          className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-green-200/50 rounded-lg'
        />
      </div>

    </div>
  )
}

export default AuthLayout
