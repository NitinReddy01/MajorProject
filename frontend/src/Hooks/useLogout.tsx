import axios from "../api/axios";
import { useAppDispatch } from "../app/hook";
import { userLogout } from "../features/authSlice";


export default function useLogout() {
    const dispatch = useAppDispatch();
    const logout = async ()=>{
        dispatch(userLogout());
        try{
            await axios.get('/auth/logout');
        }catch(error){
            console.log(error);
        }
    }
    return logout;
}
