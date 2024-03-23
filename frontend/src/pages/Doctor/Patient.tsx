import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { Report } from "../User/Reports";

interface Patient {
  _id: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: number;
}

export default function Patient() {
  const { id } = useParams();
  const [patientData, setPatientData] = useState<Patient>();
  const [patientReports, setPatientReports] = useState<Report[]>([]);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/doctor/patient-details/${id}`);
      setPatientData(res.data.patient);
      setPatientReports(res.data.reports);
    };
    getData();
  }, [id, axios]);

  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <div>
        {patientData ? (
          <table className="table">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Patient Id</th>
                <th className="border border-gray-300 px-4 py-2">Firstname</th>
                <th className="border border-gray-300 px-4 py-2">Lastname</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
              </tr>
            </thead>
            <tbody>
              {
                <tr key={patientData._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {patientData._id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {patientData.firstname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {patientData.lastname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {patientData.gender === 1 ? "M" : "F"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {patientData.age}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
      <div>
        {patientReports && patientReports.length > 0 ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Report</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {patientReports.map((report) => (
                  <tr key={report._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      Report {report._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(report.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex flex-col gap-2" >
                        {report.doctorReview ? "Done" : "Pending..."}
                        <Link to={`/report/${id}/${report._id}`}>View Report</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>No Reports</>
        )}
      </div>
    </div>
  );
}
