import { useEffect, useState } from "react";
import useRefreshToken from "../../Hooks/useRefreshToken";
import { useAppSelector } from "../../app/hook";
import { Outlet } from "react-router-dom";

export default function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const accessToken = useAppSelector((state) => state.accessToken);

  useEffect(() => {
    let isMounted = true;
    const getRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setLoading(false);
      }
    };
    !accessToken ? getRefreshToken() : setLoading(false);
    return ()=>{
        isMounted = false;
    }
  }, [accessToken,refresh]);

  return(
    <>
    {loading?"Loading...":<Outlet/>}
    </>
  )
}
