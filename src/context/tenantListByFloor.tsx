import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";

const defaultContext: {
  tenantList: null | Tenant[];
  tenantCount: {
    empty: number;
    month: number;
    year: number;
  };
  selectedTenant: Tenant | null;
  setSelectedTenant?: React.Dispatch<React.SetStateAction<Tenant | null>>;
  setTenantListByFloor?: React.Dispatch<React.SetStateAction<Tenant | null>>;
  getTenantList: () => Promise<void>;
} = {
  tenantList: null,
  tenantCount: {
    month: 0,
    year: 0,
    empty: 0,
  },
  selectedTenant: null,
  getTenantList: async () => {},
};

export const TenantListByFloorContext = createContext(defaultContext);

export default function TenantListByFloorProvider({ children }: { children: ReactNode }) {
  const [tenantList, setTenantList] = useState<null | Tenant[]>(null);
  const [tenantCount, setTenantCount] = useState({ month: 0, year: 0, empty: 0 });
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    getTenantList();
  }, []);

  const getTenantList = async () => {
    try {
      console.log("다시 가져와!!!!");
      const { data } = await axios.get("http://localhost:4000/tenants");
      console.log(data);
      calcContractTypeTenants(data);
      setTenantList(data);
    } catch (error) {}
  };

  function calcContractTypeTenants(tenants: { [roomNumber: string]: Tenant }) {
    let month = 0;
    let year = 0;
    let empty = 0;

    for (let key in tenants) {
      const tenant = tenants[key];
      if (tenant.deposit === 0 && tenant.rent === 0) {
        empty++;
      } else if (tenant.type === "전세") {
        year++;
      } else {
        month++;
      }
    }

    setTenantCount({ month, year, empty });
  }

  return (
    <TenantListByFloorContext.Provider
      value={{
        tenantList,
        tenantCount,
        selectedTenant,
        setSelectedTenant,
        getTenantList,
      }}
    >
      {children}
    </TenantListByFloorContext.Provider>
  );
}
