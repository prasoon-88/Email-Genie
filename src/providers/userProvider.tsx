import useUser from "@/hooks/auth/use-user.hook";
import useLoading from "@/hooks/common/use-loading.hook";
import { User } from "@/types/auth";
import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<{ userInfo?: User; isLoading?: boolean }>({
  userInfo: undefined,
  isLoading: true,
});

export const useUserContent = () => useContext(UserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { toggleLoading, isLoading } = useLoading();
  const { userInfo } = useUser(toggleLoading);
  UserContext.Provider;
  return (
    <UserContext.Provider value={{ userInfo, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
