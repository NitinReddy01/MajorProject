import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DoctorRegister from "./pages/Auth/DoctorRegister";
import EmailVerification from "./pages/Auth/EmailVerification";
import Homepage from "./pages/User/Homepage";
import RequireAuth from "./Components/Auth/RequireAuth";
import PersistLogin from "./Components/Auth/PersistLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={"user"} />}>
            <Route path="/user" element={<Homepage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
