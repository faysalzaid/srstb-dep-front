import React, { useState } from 'react'
// import img1 from '../assets/logo-1.png'

const EmployeeProfile = () => {

    const [logo, setLogo] = useState('')

    const handleLogoChange = (e) => {
        const selectedLogo = e.target.files[0]
        if (selectedLogo){
            const reader = new FileReader()
            reader.addEventListener('load', function(){
                let image = reader.result
                setLogo(image)
            })
            reader.readAsDataURL(selectedLogo)
        }
    }

  return (
    <section className=' h-full min-w-[261px] bg-white overflow-scroll ' >
        
        {/* Title */}
        <div className=' w-full min-h-[60px] bg-gray-50 flex items-center pl-3 ' >
            <span className=' text-lg text-gray-500 ' >Profile</span>
        </div>

        {/* Customer Detail */}
        <div className=' p-4'>

            {/* Profile Image */}
            <div className=' flex items-end gap-3 '>
                <img className=' w-[100px] h-[100px] rounded-md ' src={'logo'} alt='Profile' id='image' />
                <label htmlFor='upload-logo' className=' bg-black text-white px-2 py-1 rounded-[4px] cursor-pointer text-sm ' >Upload Logo</label>
                <input type='file' className=' hidden' id='upload-logo' onChange={handleLogoChange} accept='image/*'  />
            </div>

            {/* Deatil inputs */}
            <div className=' w-full h-full pt-[30px] flex items-start gap-[20px] sm:flex-col lg:flex-row ' >

                {/* Left Inputs */}
                <div className=' left-profile-detail flex flex-col gap-5 mt-1 sm:w-full h-fit lg:w1/2 '>
                    <div className=' relative flex flex-col w-full '>
                         <label className=' font-semibold pl-2 ' >Company Name</label>
                         <input className=' border border-gray-300 h-[40px] rounded outline-none px-2 ' type='text' />
                    </div>
            
                    <div className=' relative flex flex-col gap-1 '>
                        <label className=' font-semibold pl-2 ' >VAT Number</label>
                        <input className=' border border-gray-300 h-[40px] rounded outline-none px-2 ' />
                    </div>
            
                    <div className=' relative flex flex-col gap-1 '>
                        <label className=' font-semibold pl-2 ' >Phone</label>
                        <input className=' border border-gray-300 h-[40px] rounded outline-none px-2 ' type='tel' />
                    </div>
            
                    <div className=' relative flex flex-col gap-1 '>
                        <label className=' font-semibold pl-2 ' >Website</label>
                        <input className=' border border-gray-300 h-[40px] rounded outline-none px-2 ' type='text' />
                    </div>
            
                    <div className=' relative flex flex-col gap-1 '>
                        <label className=' font-semibold pl-2 ' >Group</label>
                        <select className=' h-[40px] border border-gray-300 rounded outline-none ' >
                            <option></option>
                            <option>Group-1</option>
                            <option>Group-2</option>
                            <option>Group-3</option>
                            <option>Group-4</option>
                            <option>Group-5</option>
                        </select>
                    </div>
            
                    <div className=' relative flex flex-col gap-1 '>
                        <label className=' font-semibold pl-2 ' >Currency</label>
                        <select className=' h-[40px] border border-gray-300 rounded outline-none ' >
                            <option></option>
                            <option>USD</option>
                            <option>EUR</option>
                            <option>KSH</option>
                            <option>AED</option>
                            <option>Birr</option>
                        </select>
                    </div>
            
                    <div className=' relative flex flex-col gap-1 pb-10 '>
                        <label className=' font-semibold pl-2 ' >Deafult Language</label>
                        <select className=' h-[40px] border border-gray-300 rounded outline-none ' >
                            <option></option>
                            <option>Af-Soomaali</option>
                            <option>English</option>
                            <option>Português</option>
                            <option>العربية</option>
                            <option>አማርኛ</option>
                        </select>
                    </div>
                </div>

                {/* Right Inputs */}
                <div className=' right-profile-detail flex flex-col gap-5 sm:w-full h-fit lg:w1/2 '>
                    <div className=' flex flex-col gap-1'>
                        <label className=' font-semibold pl-2'>Address</label>
                        <textarea className=' min-h-[128px] max-h-[216px] border border-gray-300 rounded outline-none pl-2'  />
                    </div>
            
                    <div className=' relative flex flex-col gap-1 '>
                        <label className=' font-semibold pl-2 ' >City</label>
                        <input className=' h-[40px] border border-gray-300 rounded outline-none pl-2' />
                    </div>
            
                    <div className=' relative flex flex-col gap-1 '>
                        <label className=' font-semibold pl-2 ' >State</label>
                        <input className=' h-[40px] border border-gray-300 rounded outline-none pl-2' />
                    </div>
            
                    <div className=' relative flex flex-col gap-1 '>
                        <label className=' font-semibold pl-2 ' >Zip Code</label>
                        <input className=' h-[40px] border border-gray-300 rounded outline-none pl-2' />
                    </div>
                    <div className=' relative flex flex-col gap-1 '>
                        <label className=' font-semibold pl-2 ' >Country</label>
                        <select className=' h-[40px] border border-gray-300 rounded outline-none ' >
                            <option></option>
                            <option>Afghanistan</option>
                            <option>Algeria</option>
                            <option>Bulgaria</option>
                            <option>Somalia</option>
                            <option>Ethiopia</option>
                        </select>
                    </div>
                </div>

            </div>

        </div>
    </section>
  )
}

export default EmployeeProfile