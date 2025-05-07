import { create } from "zustand";
import { parseJwt } from "../utils/jwtParser";

// 회원가입 시 저장할 유저 정보 타입 정의
interface SignupInfo {
  email?: string;
  password?: string;
  userName?: string;
  phoneNumber?: string;
  userRole?: string;
  userType?: string;
  businessNumber?: string;
  companyName?: string;
  apiKey?: string;
  tenantId?: number;
}

// 로그인 후 저장되는 유저 정보 타입 정의
interface UserInfo {
  userId: string;
  type: string;
  authorities: string;
  userName: string;
  email: string;
}

// 전체 auth 상태
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null; // 로그인 이후 토큰에서 파싱된 정보
  signupInfo: SignupInfo; // 회원가입 입력 정보
  setAuth: (accessToken: string, refreshToken: string) => void;
  resetAuth: () => void;
  restoreAuth: () => void;
  setUserInfo: (data: Partial<SignupInfo>) => void;
  setUserDetails: (data: Partial<UserInfo>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  userInfo: null,
  signupInfo: {},

  // 로그인 시 토큰과 userInfo 저장
  setAuth: (accessToken, refreshToken) => {
    const payload = parseJwt(accessToken);
    const userInfo = {
      userId: payload.userId,
      type: payload.type,
      authorities: payload.authorities,
      userName: payload.userName,
      email: payload.email,
    };

    // 브라우저 쿠키에 저장 (선택사항)
    document.cookie = `accessToken=${accessToken}; path=/;`;
    document.cookie = `refreshToken=${refreshToken}; path=/;`;

    set({ accessToken, refreshToken, userInfo });
  },

  restoreAuth: () => {
    const getCookie = (name: string) => {
      const matches = document.cookie.match(
        new RegExp("(?:^|; )" + name + "=([^;]*)"),
      );
      return matches ? decodeURIComponent(matches[1]) : null;
    };
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (accessToken && refreshToken) {
      try {
        const payload = parseJwt(accessToken);
        const userInfo = {
          userId: payload.userId,
          type: payload.type,
          authorities: payload.authorities,
          userName: payload.userName,
          email: payload.email,
        };

        set({ accessToken, refreshToken, userInfo });
      } catch (e) {
        console.warn("토큰 파싱 실패", e);
      }
    }
  },

  resetAuth: () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    set({ accessToken: null, refreshToken: null, userInfo: null });
  },

  // 회원가입 단계에서 정보 저장 (Zustand 상태)
  setUserInfo: (data) =>
    set((state) => ({
      signupInfo: {
        ...state.signupInfo,
        ...data,
      },
    })),

  setUserDetails: (data) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        ...data,
      } as UserInfo,
    })),
}));
