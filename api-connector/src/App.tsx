import "./index.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "../public/css/styles.css";
import "../public/css/input.css";
import UserDashboard from "./pages/UserDashboard";
import Signup1 from "./pages/Signup1";
import Signup2 from "./pages/Signup2";
import Signup3 from "./pages/Signup3";
import Signup4 from "./pages/Signup4";
import APIs from "./pages/APIs";
import { useAuthStore } from "./store/authStore";
import ApiDetail from "./pages/ApiDetail";
import { MedicalSttSub } from "./pages/MedicalSttSub";
import FindIdPage from "./pages/FindIdPage";
import FindPwPage from "./pages/FindPwPage";
import Service from "./pages/Service";
import Point from "./pages/Point";

function App() {
  const restoreAuth = useAuthStore((state) => state.restoreAuth);

  useEffect(() => {
    restoreAuth(); // 쿠키에서 토큰 읽고 상태 복원
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/find-id" element={<FindIdPage />} />
        <Route path="/login/find-pw" element={<FindPwPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/signup3" element={<Signup3 />} />
        <Route path="/signup4" element={<Signup4 />} />
        <Route path="/apis-page" element={<APIs />} />
        <Route path="/apis-page/api-detail" element={<ApiDetail />} />
        <Route path="/apis-page/medicalsttSub" element={<MedicalSttSub />} />
        <Route path="/api-detail/:usageId" element={<ApiDetail />} />
        <Route path="/service-page" element={<Service />} />
        <Route path="/point-page" element={<Point />} />
      </Routes>
    </Router>
  );
}

export default App;
