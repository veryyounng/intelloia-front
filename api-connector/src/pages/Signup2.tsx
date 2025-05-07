import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Signup2 = () => {
  const navigate = useNavigate();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [userName, setUserName] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (
      companyName.trim() &&
      phoneNumber.trim() &&
      businessNumber.trim() &&
      userName.trim()
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [companyName, phoneNumber, businessNumber, userName]);

  const handleSubmit = () => {
    if (!isFormValid) return;

    const userData = {
      userName,
      phoneNumber,
      businessNumber,
      companyName,
      userRole: "USER",
      userType: "PERSON",
      apiKey: "", // 서버에서 발급 예정
      tenantId: 0,
    };
    setUserInfo(userData);

    // console.log(userData);
    navigate("/signup3");
  };

  return (
    <main className="background-gray-subtler box-shadow flex h-dvh min-w-2xl flex-col items-center justify-center p-20">
      <div className="progressbar-container max-w-160 min-w-96">
        <div className="progressbar progressbar-done">
          <div className="progressbar-indicator"></div>
          <span className="progressbar-text">약관동의</span>
        </div>
        <div className="progressbar progressbar-inprogress">
          <div className="progressbar-indicator"></div>
          <span className="progressbar-text">정보입력</span>
        </div>
        <div className="progressbar progressbar-notyet">
          <div className="progressbar-indicator"></div>
          <span className="progressbar-text">가입완료</span>
        </div>
      </div>

      <div className="signup background-white box-shadow relative flex h-4/5 w-1/2 max-w-160 min-w-96 flex-col gap-12 rounded-xl p-10">
        <div className="text-container text-center">
          <span className="foreground-gray-strong text-2xl font-bold">
            회원가입
          </span>
        </div>

        <div className="form flex h-full w-full flex-col">
          <div className="form-content flex h-full w-full flex-col gap-5">
            <div className="textfield flex flex-col">
              <label className="label">회사명</label>
              <input
                className="textfield-placeholder"
                type="text"
                placeholder="회사명을 입력해주세요."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="textfield flex flex-col">
              <label className="label">회사 전화번호</label>
              <input
                className="textfield-placeholder"
                type="tel"
                placeholder="회사 전화번호를 입력해주세요."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="textfield flex flex-col">
              <label className="label">사업자 등록번호</label>
              <input
                className="textfield-placeholder"
                type="text"
                placeholder="사업자 등록번호를 입력해주세요."
                value={businessNumber}
                onChange={(e) => setBusinessNumber(e.target.value)}
                required
              />
            </div>

            <div className="textfield flex flex-col">
              <label className="label">담당자명</label>
              <input
                className="textfield-placeholder"
                type="text"
                placeholder="담당자명을 입력해주세요."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            {/* <div className="textfield flex flex-col">
              <label className="label">이메일</label>
              <input
                className="textfield-placeholder"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div> */}

            <div className="btn-container sticky bottom-0 flex w-full flex-row gap-4">
              <Link
                className="btn btn-m btn-wide btn-soft btn-neutral"
                to="/signup1"
              >
                이전
              </Link>
              <button
                onClick={handleSubmit}
                className={`btn btn-m btn-wide btn-primary ${
                  !isFormValid ? "btn-disabled" : ""
                }`}
                disabled={!isFormValid}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup2;
