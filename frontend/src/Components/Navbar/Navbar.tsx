import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";
import { useAppSelector } from "../../app/hook"
import Button from "../Elements/Button";
import { navItems } from "./navItems";


export default function Navbar() {
    const role = useAppSelector(state => state.role);
    const logout = useLogout();
    const navigate = useNavigate();
    const handeLogout = ()=>{
        logout();
        navigate('/login')
    }
    const handleClick = ()=>{

    }
    return (
        role ? <div className="bg-slate-700 text-white flex gap-6 p-4 pb-2 w-full" >
            {navItems[role].map((item, ind) => <Link to={item.link} className="cursor-pointer text-lg" key={ind} onClick={handleClick} >{item.name}</Link>)}
            <div className="ml-auto"> <Button label={"logout"} onClick={handeLogout} /></div>
        </div> : null
    )
}
