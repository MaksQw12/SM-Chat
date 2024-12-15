import { useState, useEffect } from "react";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const useTokens = (): Tokens | null => {
  const [tokens, setTokens] = useState<Tokens | null>(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return accessToken && refreshToken
      ? { accessToken, refreshToken }
      : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      setTokens(
        accessToken && refreshToken ? { accessToken, refreshToken } : null
      );
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return tokens;
};
