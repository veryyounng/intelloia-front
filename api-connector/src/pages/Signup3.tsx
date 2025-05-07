import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/UserService";

function Signup3() {
  const navigate = useNavigate();
  const signupInfo = useAuthStore((state) => state.signupInfo);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const isFormValid =
    email.trim() && password.trim() && password === passwordConfirm;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setUserInfo({ email, password });

    const finalUserData = {
      ...signupInfo,
      email,
      password,
    };

    try {
      await signupUser(finalUserData);
      navigate("/signup4");
    } catch (err) {
      alert("회원가입에 실패했습니다.");
    }
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

      <div className="signup background-white box-shadow relative flex h-[638px] w-1/2 max-w-160 min-w-96 flex-col gap-12 rounded-xl p-10">
        <div className="text-container text-center">
          <span className="foreground-gray-strong text-2xl font-bold">
            회원가입
          </span>
        </div>

        <div className="form flex h-full w-full flex-col">
          <div className="form-content flex h-full w-full flex-col gap-5">
            <div className="textfield flex flex-col">
              <label className="label" htmlFor="email">
                이메일
              </label>
              <input
                className="textfield-placeholder"
                type="email"
                id="email"
                placeholder="업무용 이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="textfield flex flex-col">
              <label className="label" htmlFor="password">
                비밀번호
              </label>
              <input
                className="textfield-placeholder"
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="textfield flex flex-col">
              <label className="label" htmlFor="passwordConfirm">
                비밀번호
              </label>
              <input
                className="textfield-placeholder"
                type="password"
                id="passwordConfirm"
                placeholder="비밀번호를 재입력해주세요."
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="btn-container sticky bottom-0 flex w-full flex-row gap-4">
            <Link
              className="btn btn-m btn-wide btn-soft btn-neutral"
              to="/signup2"
            >
              이전
            </Link>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`btn btn-m btn-wide btn-primary ${
                !isFormValid ? "btn-disabled" : ""
              }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup3;
