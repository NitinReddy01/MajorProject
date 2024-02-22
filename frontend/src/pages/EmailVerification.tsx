import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import axios from "../api/axios";
import Loading from "../Components/Loading";

export default function EmailVerification() {
    const [queryParams] = useSearchParams();
    const email = queryParams.get('email');
    const code = queryParams.get('code');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            try {
                let res = await axios.get(`/auth/verifyEmail/${email}/${code}`);
                console.log(res);
                setMessage(res.data.message);

            } catch (error) {
                console.log(error);
                setMessage("Verification failed, please try again");
            }
            finally {
                setLoading(false);
            }
        }
        verify();
    }, [email, code])

    return (
        <div className="bg-gray-400 h-screen flex justify-center items-center">
            <div className=" w-96 h-60 flex items-center justify-center" >
                {loading ? <Loading/> : message}
            </div>
        </div>
    )
}
