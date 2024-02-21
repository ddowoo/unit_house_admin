import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";

const defaultContext: {
  tenantListByFloor: null;
  tenantCount: {
    empty: number;
    month: number;
    year: number;
  };
  selectedTenant: Tenant | null;
  setSelectedTenant?: React.Dispatch<React.SetStateAction<Tenant | null>>;
  setTenantListByFloor?: React.Dispatch<React.SetStateAction<Tenant | null>>;
} = {
  tenantListByFloor: null,
  tenantCount: {
    month: 0,
    year: 0,
    empty: 0,
  },
  selectedTenant: null,
};

export const TenantListByFloorContext = createContext(defaultContext);

export default function TenantListByFloorProvider({ children }: { children: ReactNode }) {
  const [tenantListByFloor, setTenantListByFloor] = useState<null | any>(null);
  const [tenantCount, setTenantCount] = useState({ month: 0, year: 0, empty: 0 });

  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    async function getTenantList() {
      try {
        const { data } = await axios.get("http://localhost:4000/tenants");
        calcContractTypeTenants(data);
        setTenantListByFloor(data);
      } catch (error) {}
    }

    function calcContractTypeTenants(tenants: any) {
      let month = 0;
      let year = 0;
      let empty = 0;

      Object.keys(tenants)
        .reverse()
        .map((floor) => {
          Object.keys(tenants[floor]).map((roomNumber) => {
            const tenant: Tenant = tenants[floor][roomNumber];
            if (tenant.deposit === 0 && tenant.rent === 0) {
              empty++;
            } else if (tenant.type === "전세") {
              year++;
            } else {
              month++;
            }
          });
        });
      setTenantCount({ month, year, empty });
    }

    getTenantList();
  }, []);

  return (
    <TenantListByFloorContext.Provider
      value={{
        tenantListByFloor,
        tenantCount,
        selectedTenant,
        setSelectedTenant,
        setTenantListByFloor,
      }}
    >
      {children}
    </TenantListByFloorContext.Provider>
  );
}
