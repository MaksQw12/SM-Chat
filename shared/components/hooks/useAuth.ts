import { useEffect, useState } from "react";
import { useTokens } from "./useTokens";
import { DecodedUser, decodeRefresh } from "@/shared/lib/decodeRefresh";
interface useAuthResult {
  user: DecodedUser | null;
  isAuth: boolean;
  logout: () => void;
}
export const useAuth = (): useAuthResult => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const tokens = useTokens();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!tokens?.refreshToken) {
          console.warn("Токены отсутствуют. Пользователь не авторизован.");
          setIsAuth(false);
          return;
        }
        const user = decodeRefresh(tokens.refreshToken);
        setUser(user);
        setIsAuth(true);
      } catch (error) {
        console.error("Ошибка при проверке пользователя:", error);
        setIsAuth(false);
      }
    };

    fetchUserData();
  }, [tokens?.refreshToken]);
  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuth(false);
    setUser(null);
  };
  return { user, isAuth, logout };
};
