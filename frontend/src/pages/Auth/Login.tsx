import Button from "../../Components/Elements/Button"
import Dropdown from "../../Components/Elements/Dropdown"
import Footer from "../../Components/Elements/Footer"
import Heading from "../../Components/Elements/Heading"
import InputBox from "../../Components/Elements/InputBox"
import { useState } from "react"
import axios from "../../api/axios"
import { useAppDispatch } from "../../app/hook"
import { setAuth } from "../../features/authSlice"
import { useLocation, useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || `/`

    const submit = async () => {
        try {
            const res = await axios.post('/auth/signin',{email,password,role});
            dispatch(setAuth(res.data));
            setEmail('');
            setPassword('');
            setRole('');
            navigate(from,{replace:true});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="h-screen bg-slate-400 flex justify-center items-center" >
                <div className=" w-96 h-max bg-white rounded-lg text-center p-4 ">
                    <Heading heading={"Login"} subHeading={"Enter your credentials to access your account"} />
                    <InputBox placeholder={"johnexample@gmail.com"} value={email} onChange={(e) => setEmail(e.target.value)} type={"text"} label={"Email"} />
                    <InputBox placeholder={"password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} label={"Password"} />
                    <Dropdown label={"Select Role"} options={[{key:"User",value:"user"},{key:"Docter",value:"doctor"},{key:"Admin",value:"admin"}]} onSelect={setRole} />
                    <Button label={"login"} onClick={submit} />
                    <Footer msg={"Don't have an account?"} to={"/register"} buttonText={"Register"} />
                </div>
            </div>
        </>
    )
}

export default Login