import useUser from "@/hooks/auth/use-user.hook";
import useLoading from "@/hooks/common/use-loading.hook";
import { createContext, ReactNode, useContext } from "react";

interface CampaignProviderValues {
  campaignName: string;
  setCampaignName?: any;
}

const CampaignContext = createContext<CampaignProviderValues>({
  campaignName: "",
  setCampaignName: () => {},
});

export const useCamapignContext = () => useContext(CampaignContext);

const CampaignProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: CampaignProviderValues;
}) => {
  const { toggleLoading, isLoading } = useLoading();
  const { userInfo } = useUser(toggleLoading);
  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignProvider;
