import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Button from "../../Components/Elements/Button";
import { useAppSelector } from "../../app/hook";

export type PatientReport = {
  _id: string;
  age: number;
  chestPainType: number;
  restingBloodPressure: number;
  cholesterol: number;
  fastingBloodPressure: number;
  restECG: number;
  thalachHeartRate: number;
  exerciseInducedAngina: number;
  oldPeak: number;
  slope: number;
  ca: number;
  thallium: number;
  gender: number;
  prediction: number;
};

export default function PatientReport() {
  const { userId, reportId } = useParams();
  const [report, setReport] = useState<PatientReport>();
  const [feedBack, setFeedBack] = useState("");
  const id = useAppSelector((state) => state.id);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/users/report-details/${reportId}`);
      setFeedBack(res.data.feedback?.feedback);
      setReport(res.data.report);
    };
    getData();
  }, [axios, reportId]);

  const handleSubmit = async () => {
    try {
      await axios.post("/feedback/add-feedback", {
        userId,
        reportId,
        doctorId: id,
        feedBack,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {report ? (
          <table className="table">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Gender </th>
                <th className="border border-gray-300 px-4 py-2">
                  Chest Pain Type
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Resting Blood Pressure
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Cholesterol
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Fasting Blood Pressure
                </th>
                <th className="border border-gray-300 px-4 py-2">RestECG</th>
                <th className="border border-gray-300 px-4 py-2">
                  Thalach Heart Rate
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Exercise induced angina
                </th>
                <th className="border border-gray-300 px-4 py-2">Old Peak</th>
                <th className="border border-gray-300 px-4 py-2">Slope</th>
                <th className="border border-gray-300 px-4 py-2">
                  Coronary Angiogram(ca)
                </th>
                <th className="border border-gray-300 px-4 py-2">Thallium</th>
                <th className="border border-gray-300 px-4 py-2">Prediction</th>
              </tr>
            </thead>
            <tbody>
              {
                <tr key={report._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.gender === 1 ? "M" : "F"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {(() => {
                      if (report.chestPainType === 3) {
                        return "Typical Angina";
                      }
                      else if(report.chestPainType===2){
                        return "Atypical Angina";
                      }
                      else if(report.chestPainType===1){
                        return "Asymptomatic";
                      }
                      return "Non Anginal";
                    })()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.restingBloodPressure}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.cholesterol}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.fastingBloodPressure}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                  {(() => {
                      if (report.restECG === 2) {
                        return "stt abnormality";
                      }
                      else if(report.restECG===1){
                        return "Normal";
                      }
                      return "lv-hypertony";
                    })()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.thalachHeartRate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.exerciseInducedAngina===1?"True":"False"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.oldPeak}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                  {(() => {
                      if (report.slope === 2) {
                        return "Upsloping";
                      }
                      else if(report.slope===1){
                        return "Flat";
                      }
                      return "Downsloping";
                    })()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.ca}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                  {(() => {
                      if (report.slope === 2) {
                        return "Normal";
                      }
                      else if(report.slope===1){
                        return "Fixed Defect";
                      }
                      return "Reversible Defect";
                    })()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                  {report.prediction}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
      <div className="mt-4 flex justify-center flex-col items-center gap-6">
        <h3>Feedback</h3>
        <textarea
          className="peer h-full min-h-[200px] resize-y w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-gray-600 "
          value={feedBack}
          onChange={(e) => setFeedBack(e.target.value)}
        ></textarea>
        <div className="w-20">
          <Button label={"Submit"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
