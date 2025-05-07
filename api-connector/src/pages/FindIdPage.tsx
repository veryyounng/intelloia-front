import React, { useState } from "react";

const FindIdPage: React.FC = () => {
  const [businessNumber, setBusinessNumber] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessNumber(e.target.value);
  };

  const handleBack = () => {
    window.history.back();
  };

  const isDisabled = businessNumber.trim() === "";

  return (
    <main className="background-gray-subtler flex h-dvh min-w-2xl flex-col items-center justify-center p-20">
      <div className="signup background-white box-shadow relative flex w-1/4 max-w-160 min-w-96 flex-col gap-6 rounded-xl p-10">
        <div className="text-container foreground-gray-default flex flex-col gap-4 text-center">
          <div className="foreground-gray-strong text-2xl font-bold">
            <button
              onClick={handleBack}
              className="chevron-left absolute block"
            />
            아이디 찾기
          </div>
          <span className="text-sm">
            가입 당시 입력한 사업자 등록번호를 통해 <br />
            인증 후 찾으실 수 있습니다.
          </span>
        </div>
        <div className="form flex h-full w-full flex-col overflow-hidden">
          <div className="form-content flex h-full w-full flex-col gap-1">
            <div className="form-content flex h-full flex-col gap-3">
              <div className="textfield flex flex-col">
                <label className="label" htmlFor="number">
                  사업자등록번호
                </label>
                <input
                  id="number"
                  className="textfield-placeholder"
                  type="number"
                  placeholder="사업자 등록번호를 입력해주세요."
                  value={businessNumber}
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
                onClick={() => {
                  // 여기서 실제 요청 로직을 추가하면 됩니다.
                  console.log("사업자번호로 아이디 찾기 요청:", businessNumber);
                }}
              >
                아이디 찾기
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FindIdPage;
