import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hook"
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

export interface Report {
    _id:string,
    updatedAt : Date,
    doctorReview:boolean
}

export default function Reports() {
    const id = useAppSelector(state=>state.id);
    const [reports,setReports] = useState<Report[]>();
    const axios = useAxiosPrivate();
    useEffect(()=>{
        async function getData(){
            const res = await axios.get(`/users/reports/${id}`);
            console.log(res.data.reports);
            setReports(res.data.reports);
        }
        getData()
    },[id,axios])
  return (
    <div className="bg-slate-400  flex justify-center">
        {reports && reports.length>0? <>
        <table className="table" >
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Report</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {reports.map(report=>(
                    <tr key={report._id} >
                        <td className="border border-gray-300 px-4 py-2">Report {report._id}</td>
                        <td className="border border-gray-300 px-4 py-2">{new Date(report.updatedAt).toLocaleDateString()}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            {report.doctorReview?<Link to={`/user/report/${report._id}`} >View Report</Link>:"Pending"}  </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </> :<>No Reports</>}
    </div>
  )
}
