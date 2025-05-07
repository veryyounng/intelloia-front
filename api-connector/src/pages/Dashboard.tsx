import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">대시보드</h1>
      <button
        onClick={() => navigate("/login")}
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      >
        로그인
      </button>
      <button
        onClick={() => navigate("/signup1")}
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      >
        회원가입
      </button>
    </div>
  );
};

export default Dashboard;
