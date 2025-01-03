import { useCallback, useEffect, useState } from "react";
import { AUTH_APIS } from "@/utils/apis";
import axios from "axios";
import { useToast } from "../common/use-toast";
import { User } from "@/types/auth";

const useUser = (toggleLoading: () => boolean = () => false) => {
  const { toast } = useToast();

  const [userInfo, setUserInfo] = useState<User>();

  const fetchUserInfo = useCallback(async () => {
    toggleLoading();
    try {
      const resp = await axios(AUTH_APIS.info);
      if (resp.status == 200) {
        setUserInfo(resp.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something Went wrong while fetching user info.",
      });
    } finally {
      toggleLoading();
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return { userInfo };
};

export default useUser;
