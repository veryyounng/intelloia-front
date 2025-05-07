// src/utils/jwtParser.ts
export function parseJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) throw new Error("잘못된 JWT 형식");
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("토큰 파싱 실패", e);
    return {};
  }
}
