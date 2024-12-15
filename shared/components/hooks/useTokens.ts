interface Tokens {
  accessToken: string;
  refreshToken: string;
}
export const useTokens = (): Tokens | null => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken && refreshToken) {
    return { accessToken, refreshToken };
  }
  return null;
};
