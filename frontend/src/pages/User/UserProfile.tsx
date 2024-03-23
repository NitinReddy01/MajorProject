import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hook";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

interface UserData{
    _id:string,
    email:string,
    firstname:string,
    lastname:string,
    age:number,
    gender:number
}

export default function UserProfile() {
    const [userData,setUserData] = useState<UserData>();
    const id = useAppSelector(state=>state.id);
    const axios = useAxiosPrivate();

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`/users/user-details/${id}`);
            setUserData(res.data.user);
            console.log(res.data.user);
        }
        getData();
    },[id,axios])

  return (
    <div>
        
    </div>
  )
}
