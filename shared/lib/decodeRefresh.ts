import jwt from "jsonwebtoken";
interface DecodedUser {
  userId: string;
  username: string;
}
export const decodeRefresh = (refreshToken: string): DecodedUser | null => {
  try {
    const decoded = jwt.decode(refreshToken) as DecodedUser;

    if (!decoded || !decoded.userId || !decoded.username) {
      throw new Error("Invalid token payload");
    }

    return decoded; 
  } catch (error) {
    console.error("Ошибка декодирования токена:", error);
    return null;
  }
};
