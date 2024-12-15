interface Tokens {
  accessToken: string;
  refreshToken: string;
}
export const useTokens = (): Tokens | null => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  return accessToken && refreshToken ? { accessToken, refreshToken } : null;
};
