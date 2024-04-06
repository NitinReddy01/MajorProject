import { useState } from "react";
import Dropdown from "../../Components/Elements/Dropdown";
import Heading from "../../Components/Elements/Heading";
import InputBox from "../../Components/Elements/InputBox";
import Button from "../../Components/Elements/Button";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useAppSelector } from "../../app/hook";

export default function Homepage() {
  const [chestPain, setChestPain] = useState("");
  const [trestbps, setTrestbps] = useState("");
  const [chol, setChol] = useState("");
  const [fbs, setFbs] = useState("");
  const [restEcg, setRestEcg] = useState("");
  const [thalach, setThalach] = useState("");
  const [exang, setExang] = useState("");
  const [oldPeak, setOldPeak] = useState("");
  const [slope, setSlope] = useState("");
  const [ca, setCa] = useState("");
  const [thal, setThal] = useState("");
  const axios = useAxiosPrivate();
  const id = useAppSelector(state=>state.id);

  const check = ():boolean=>{
    if(isNaN(Number(chestPain))) return false;
    if(isNaN(Number(trestbps))) return false;
    if(isNaN(Number(chol))) return false;
    if(isNaN(Number(fbs))) return false;
    if(isNaN(Number(restEcg))) return false;
    if(isNaN(Number(thalach))) return false;
    if(isNaN(Number(exang))) return false;
    if(isNaN(Number(oldPeak))) return false;
    if(isNaN(Number(slope))) return false;
    if(isNaN(Number(ca))) return false;
    if(isNaN(Number(thal))) return false;
    return true;
  }

  const handleSubmit = async ()=>{
    const data = [];
    if(!check()){
      alert("Enter Valid Inputs");
    }
    data.push(Number(chestPain));
    data.push(Number(trestbps));
    data.push(Number(chol));
    if(Number(fbs)>120){
      data.push(1);
    }
    else{
      data.push(0);
    }
    data.push(Number(restEcg));
    data.push(Number(thalach));
    data.push(Number(exang));
    data.push(Number(oldPeak));
    data.push(Number(slope));
    data.push(Number(ca));
    data.push(Number(thal));
    try {
      const res = await axios.post('/users/predict',{data,id});
      console.log(res.data);
      setCa("")
      setChestPain("");
      setChol("");
      setExang("");
      setFbs("");
      setOldPeak("");
      setRestEcg("");
      setSlope("");
      setThal("");
      setThalach("");
      setTrestbps("");
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Network Error");
    }
  }

  return (
    <div className="bg-slate-400 flex justify-center">
      <div className="w-[65rem] text-center bg-[#f5f7f6]">
        <Heading
          heading={
            "Upload Your Heart Details for Personalized Heart Health Analysis"
          }
          subHeading={
            "Share Your Cardiovascular Metrics to Receive Customized Predictions and Recommendations"
          }
        />
        <div className="w-[50%] mx-auto " >
          <div className="flex flex-col items-center">
            <Dropdown
              onSelect={setChestPain}
              label={"Chest Pain Type"}
              options={[
                { key: "Typical Angina", value: "3" },
                { key: "Atypical Angina", value: "1" },
                { key: "Asymptomatic", value: "0" },
                { key: "Non Anginal", value: "2" },
              ]}
            />
            <InputBox
              value={trestbps}
              placeholder={"In mm Hg on admission to the hospital"}
              label={"Resting Blood Pressure"}
              onChange={(e) => setTrestbps(e.target.value)}
              type={"text"}
            />
            <InputBox
              value={chol}
              placeholder={"serum cholesterol in mg/dl"}
              label={"Cholesterol"}
              onChange={(e) => setChol(e.target.value)}
              type={"text"}
            />
            <InputBox
              value={fbs}
              placeholder={"In mg/dl"}
              label={"Fasting Blood Pressure"}
              onChange={(e) => setFbs(e.target.value)}
              type={"text"}
            />
            <Dropdown
              onSelect={setRestEcg}
              label={"RestECG"}
              options={[
                { key: "Normal", value: "1" },
                { key: "lv-hypertony", value: "0" },
                { key: "stt abnormality ", value: "2" },
              ]}
            />
            <InputBox
              value={thalach}
              placeholder={"maximum heart rate achieved"}
              label={"Thalach Heart Rate"}
              onChange={(e) => setThalach(e.target.value)}
              type={"text"}
            />
            <Dropdown
              onSelect={setExang}
              label={"Exercise induced angina"}
              options={[
                { key: "True", value: "1" },
                { key: "False", value: "0" },
              ]}
            />
            <InputBox
              value={oldPeak}
              placeholder={"ST depression induced by exercise relative to rest"}
              label={"Old Peak"}
              onChange={(e) => setOldPeak(e.target.value)}
              type={"text"}
            />
            <Dropdown
              onSelect={setSlope}
              label={"Slope"}
              options={[
                { key: "Flat", value: "1" },
                { key: "Downsloping", value: "0" },
                { key: "Upsloping", value: "2" },
              ]}
            />
            <InputBox
              value={ca}
              placeholder={
                "number of major vessels (0-3) colored by fluoroscopy"
              }
              label={"Coronary Angiogram(ca)"}
              onChange={(e) => setCa(e.target.value)}
              type={"text"}
            />
            <Dropdown
              onSelect={setThal}
              label={"Thallium"}
              options={[
                { key: "Fixed Defect", value: "1" },
                { key: "Reversible Defect", value: "3" },
                { key: "Normal", value: "2" },
              ]}
            />
            <Button label={"Submit"} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
