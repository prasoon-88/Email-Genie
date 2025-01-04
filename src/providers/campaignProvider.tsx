import { createContext, ReactNode, useContext } from "react";

interface CampaignProviderValues {
  id?: string;
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
  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignProvider;
