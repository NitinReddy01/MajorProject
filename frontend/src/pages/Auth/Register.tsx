import { useState } from "react"
import Button from "../../Components/Button"
import Footer from "../../Components/Footer"
import Heading from "../../Components/Heading"
import InputBox from "../../Components/InputBox"
import axios from "../../api/axios"


function Register() {
  const [email,setEmail] = useState('');
  const [firstname,setFirstName] = useState('');
  const [lastname,setLastName] = useState('');
  const [password,setPassword] = useState('');

  const submit = async ()=>{
    try {
        let res = await axios.post('/auth/user-signup',{email,firstname,lastname,password});
        console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div className="h-screen bg-gray-400 flex justify-center items-center" >
      <div className=" w-96 h-max bg-white rounded-lg text-center p-4 ">
        <Heading heading={"Register"} subHeading={"Enter your information to create an account"}/>
        <InputBox placeholder={"firstname"} type={"text"}  value={firstname} onChange={(e)=>setFirstName(e.target.value)}  label={"Firstname"} />
        <InputBox placeholder={"Lastname"} type={"text"} value={lastname} onChange={(e)=>setLastName(e.target.value)} label={"Lastname"} />
        <InputBox placeholder={"johnexample@gmail.com"} value={email} onChange={(e)=>setEmail(e.target.value)} type={"text"} label={"Email"} />
        <InputBox placeholder={"password"} type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} label={"Password"} />
        <Button label={"Register"} onClick={submit }  />
        <Footer msg={"Already have an account?"} to={"/login"} buttonText={"Login"} />
        <Footer msg={"Are you a doctor?"} to={"/doctor-register"} buttonText={"register"} />
      </div>
    </div>
    </>
  )
}

export default Register