import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

function Signup4() {
  const userName = useAuthStore((state) => state.signupInfo?.userName);

  return (
    <main className="background-gray-subtler box-shadow flex h-dvh min-w-2xl flex-col items-center justify-center p-20 pt-[168px]">
      <div className="signup background-white box-shadow confetti relative flex h-4/5 h-[638px] w-1/2 max-w-160 min-w-96 flex-col content-between justify-center gap-8 rounded-xl p-10">
        <div className="text-container foreground-gray-strong flex flex-col text-center">
          <span className="text-2xl font-bold">
            <span>{userName}</span>
            <span>님</span>
          </span>
          <span className="text-2xl font-bold">회원가입이 완료되었습니다.</span>
        </div>
        <div className="btn-container flex justify-center">
          <Link className="btn btn-m btn-primary" to="/login">
            로그인 이동
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Signup4;
