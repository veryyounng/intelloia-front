import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";
import { useAuthStore } from "../store/authStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // const validateEmail = (email: string) =>
  //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // const validatePassword = (password: string) =>
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
  //     password,
  //   );

  const handleLogin = async () => {
    try {
      const tokens = await loginUser(email, password);
      if (tokens?.accessToken && tokens?.refreshToken) {
        useAuthStore
          .getState()
          .setAuth(tokens.accessToken, tokens.refreshToken);
        const store = useAuthStore.getState();

        navigate("/user-dashboard");
      } else {
        setErrorMessage("로그인 실패: 토큰이 없습니다.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("로그인 실패");
    }
  };

  return (
    <main className="flex h-dvh flex-row items-center p-14">
      <div className="login flex h-full w-1/2 flex-col justify-center text-center">
        <div className="text-container flex flex-col">
          <div className="text-6xl font-bold">Enjoy Linguistic AI</div>
          <div className="text-6xl font-bold">Enjoy Intelloia</div>
        </div>
      </div>
      <div className="login form-container background-white flex h-full w-1/2 min-w-96 flex-col items-center justify-center rounded-xl">
        <div className="form flex flex-col gap-6">
          <div className="form-title w-full text-center">
            <span className="foreground-gray-strong text-2xl font-bold">
              로그인
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="form-content flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="textfield flex flex-col">
                  <label className="label" htmlFor="email">
                    이메일
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="textfield-placeholder"
                    placeholder="이메일을 입력해주세요."
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
                    id="password"
                    type="password"
                    className="textfield-placeholder"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className="btn btn-m btn-primary" onClick={handleLogin}>
                로그인
              </button>
              {errorMessage && (
                <div className="mt-2 text-center text-sm text-red-500">
                  {errorMessage}
                </div>
              )}
            </div>
            <div className="form-content flex flex-row justify-between px-10">
              <Link className="btn-s btn-ghost btn-neutral" to="find-id">
                아이디 찾기
              </Link>
              <Link className="btn-s btn-ghost btn-neutral" to="find-pw">
                비밀번호 찾기
              </Link>
              <Link className="btn-s btn-ghost btn-neutral" to="/signup1">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
