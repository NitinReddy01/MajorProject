import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hook";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

interface Patient {
  _id: string;
  firstname: string;
  lastname: string;
}

export default function Patients() {
  const id = useAppSelector((state) => state.id);
  const [patients, setPatients] = useState<Patient[]>([]);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/doctor/all-patients/${id}`);
      console.log(res.data.patients);
      setPatients(res.data.patients);
    };
    getData();
  }, [id, axios]);

  return (
    <div className="flex justify-center" >
      {patients && patients.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Patient</th>
                <th className="border border-gray-300 px-4 py-2">Report</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {patient.firstname + patient.lastname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {" "}
                    <Link to={`/patient/${patient._id}`}>View Details</Link>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>No patients</>
      )}
    </div>
  );
}
