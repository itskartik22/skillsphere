import { useAuth } from "./useAuth";

export const useRole = () => {
  const { user } = useAuth();
  if (user) {
    return user.userInfo.role;
  }
  return null;
};
