import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DoctorRegister from "./pages/Auth/DoctorRegister";
import EmailVerification from "./pages/Auth/EmailVerification";
import Homepage from "./pages/User/Homepage";
import RequireAuth from "./Components/Auth/RequireAuth";
import PersistLogin from "./Components/Auth/PersistLogin";
import Layout from "./Components/Layout";
import Reports from "./pages/User/Reports";
import Patients from "./pages/Doctor/Patients";
import Patient from "./pages/Doctor/Patient";
import PatientReport from "./pages/Doctor/PatientReport";
import Report from "./pages/User/Report";
import UserProfile from "./pages/User/UserProfile";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route element={<PersistLogin />}>
          <Route element={<Layout/>} >
            <Route element={<RequireAuth allowedRole={"user"} />}>
              <Route path="/user" element={<Homepage />} />
              <Route path="/user/reports" element={<Reports />} />
              <Route path="/user/report/:id" element={<Report/>} />
              <Route path="/user/profile" element={<UserProfile/>} />
            </Route>
            <Route element={<RequireAuth allowedRole={"doctor"} />}>
              <Route path="/doctor" element={<Patients />} />
              <Route path="/patient/:id" element={<Patient />} />
              <Route path="/report/:userId/:reportId" element={<PatientReport/>} />
              <Route path="/doctor/profile" element={<DoctorProfile/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
