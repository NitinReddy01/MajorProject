import { useState } from "react";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import axios from "../api/axios";


export default function DoctorRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [specialization, setSpecialization] = useState('');

    const submit = async ()=>{
        try {
            let res = await axios.post('/auth/doctor-signup',{email,password,firstname,lastname,hospitalName,specialization})
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-screen bg-gray-400 flex justify-center items-center" >
        <div className=" w-96 h-max bg-white rounded-lg text-center p-4 ">
          <Heading heading={"Register"} subHeading={"Enter your information to create an account"}/>
          <InputBox placeholder={"Firstname"} type={"text"}  value={firstname} onChange={(e)=>setFirstName(e.target.value)}  label={"Firstname"} />
          <InputBox placeholder={"Lastname"} type={"text"} value={lastname} onChange={(e)=>setLastName(e.target.value)} label={"Lastname"} />
          <InputBox placeholder={"johnexample@gmail.com"} value={email} onChange={(e)=>setEmail(e.target.value)} type={"text"} label={"Email"} />
          <InputBox placeholder={"Hospital Name"} value={hospitalName} onChange={(e)=>setHospitalName(e.target.value)} type={"text"} label={"Hospital Name"} />
          <InputBox placeholder={"specialization"} value={specialization} onChange={(e)=>setSpecialization(e.target.value)} type={"text"} label={"Specialization"} />
          <InputBox placeholder={"password"} type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} label={"Password"} />
          <Button label={"Register"} onClick={submit }  />
          <Footer msg={"Already have an account?"} to={"/login"} buttonText={"Login"} />
        </div>
      </div>
    )
}
