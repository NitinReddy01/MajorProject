import axios from "../api/axios";
import { useAppDispatch } from "../app/hook"
import { setAuth } from "../features/authSlice";

export default function useRefreshToken() {
  const dispatch = useAppDispatch();
  
  const refresh = async ()=>{
    const res = await axios.get('/auth/refresh-token');
    dispatch(setAuth(res.data))
    return res.data.accessToken;
  }
  return refresh;
}
