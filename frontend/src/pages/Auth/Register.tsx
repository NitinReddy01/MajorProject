import { useState } from "react";
import Button from "../../Components/Elements/Button";
import Footer from "../../Components/Elements/Footer";
import Heading from "../../Components/Elements/Heading";
import InputBox from "../../Components/Elements/InputBox";
import axios from "../../api/axios";
import Dropdown from "../../Components/Elements/Dropdown";

function Register() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const submit = async () => {
    try {
      if (!age || !gender) {
        alert("Please enter valid age and number");
        return;
      }
      const res = await axios.post("/auth/user-signup", {
        email,
        firstname,
        lastname,
        password,
        age: Number(age),
        gender: Number(gender),
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen bg-slate-400 flex justify-center items-center">
        <div className=" w-96 h-max bg-white rounded-lg text-center p-4 ">
          <Heading
            heading={"Register"}
            subHeading={"Enter your information to create an account"}
          />
          <InputBox
            placeholder={"firstname"}
            type={"text"}
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            label={"Firstname"}
          />
          <InputBox
            placeholder={"Lastname"}
            type={"text"}
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            label={"Lastname"}
          />
          <InputBox
            placeholder={"johnexample@gmail.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type={"text"}
            label={"Email"}
          />
          <InputBox
            placeholder={"Age"}
            value={age}
            type={"number"}
            onChange={(e) => setAge(e.target.value)}
          />
          <Dropdown
            label="gender"
            options={[
              { key: "Male", value: "1" },
              { key: "Female", value: "0" },
            ]}
            onSelect={setGender}
          />
          <InputBox
            placeholder={"password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
          />
          <Button label={"Register"} onClick={submit} />
          <Footer
            msg={"Already have an account?"}
            to={"/login"}
            buttonText={"Login"}
          />
          <Footer
            msg={"Are you a doctor?"}
            to={"/doctor-register"}
            buttonText={"register"}
          />
        </div>
      </div>
    </>
  );
}

export default Register;
