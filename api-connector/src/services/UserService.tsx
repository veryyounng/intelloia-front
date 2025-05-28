import { useAuthStore } from "../store/authStore";

export const loginUser = async (
  email: string,
  password: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
  email: string;
  userName: string;
}> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const data = await response.json();

    const { accessToken, refreshToken, email: returnedEmail, userName } = data;

    if (!accessToken || !refreshToken) {
      throw new Error("토큰이 없습니다.");
    }

    return {
      accessToken,
      refreshToken,
      email: returnedEmail,
      userName,
    };
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};

// 회원가입 요청
export const signupUser = async (userData: any) => {
  try {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패");
    }

    const data = await response.json();
    console.log("회원가입 성공:", data);
    return data;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};

// 로그인된 사용자 정보 가져오기
// @ts-ignore
export const fetchUserInfo = async (userId: string) => {
  const { accessToken } = useAuthStore.getState();

  const response = await fetch(`/api/auth/getmyname`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오지 못했습니다.");
  }

  return await response.json();
};

// src/services/userAPIList.ts
export interface ApiUsageResponseDTO {
  usageId: number;
  apiName: string;
  apiKey: string;
  partnerName: string;
  managerCount: number;
  concurrentAccess: number;
  price: number;
  createdAt: string;
  usageTarget: string;
}

export const getUserApiUsages = async (
  userId: string,
): Promise<ApiUsageResponseDTO[]> => {
  const res = await fetch("/api/usage/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      userId: userId.toString(),
    },
  });

  if (!res.ok) {
    throw new Error(`API 조회 실패: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// src/services/userAPIList.ts
export interface ApiUsageRequestDTO {
  apiName: string;
  apiKey: string;
  partnerName: string;
  managerCount: number;
  concurrentAccess: number;
  price: number;
  createdAt: string;
  usageTarget: string;
}

export const postUserApiUsage = async (
  userId: string,
  payload: ApiUsageRequestDTO,
): Promise<void> => {
  const res = await fetch("/api/usage/subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      userId: userId.toString(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`API 등록 실패: ${res.status}`);
  }
};

export const getApiUsageDetail = async (
  usageId: number,
): Promise<ApiUsageResponseDTO & { usageId: number }> => {
  const res = await fetch("/api/usage/detail", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      usageId: usageId.toString(),
    },
  });

  if (!res.ok) {
    throw new Error(`API 상세 조회 실패: ${res.status}`);
  }

  return await res.json();
};
