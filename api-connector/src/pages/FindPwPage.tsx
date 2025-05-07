import React, { useState } from "react";

const FindPwPage: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleBack = () => {
    window.history.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    // 여기에 이메일 전송 요청 로직을 추가하세요
    console.log("비밀번호 재설정 이메일 전송:", email);
  };

  const isDisabled = email.trim() === "";

  return (
    <main className="background-gray-subtler flex h-dvh min-w-2xl flex-col items-center justify-center p-20">
      <div className="signup background-white box-shadow relative flex w-1/4 max-w-160 min-w-96 flex-col gap-6 rounded-xl p-10">
        <div className="text-container foreground-gray-default flex flex-col gap-4 text-center">
          <div className="foreground-gray-strong text-2xl font-bold">
            <button
              onClick={handleBack}
              className="chevron-left absolute block"
            />
            비밀번호 찾기
          </div>
          <span className="text-sm">
            기존에 가입하신 이메일로
            <br />
            비밀번호 재설정 링크를 전송해드립니다.
          </span>
        </div>
        <div className="form flex h-full w-full flex-col overflow-hidden">
          <div className="form-content flex h-full w-full flex-col gap-1">
            <div className="form-content flex h-full flex-col gap-3">
              <div className="textfield flex flex-col">
                <label className="label" htmlFor="email">
                  이메일
                </label>
                <input
                  id="email"
                  className="textfield-placeholder"
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="btn-container sticky bottom-0 w-full">
              <div className="background-white h-6"></div>
              <button
                className={`btn btn-m btn-primary btn-wide ${isDisabled ? "btn-disabled" : ""}`}
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                비밀번호 재설정
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FindPwPage;
