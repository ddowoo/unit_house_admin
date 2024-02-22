import { useContext, useMemo, useState } from "react";
import Card from "../components/card";
import Header from "../components/header";
import { TenantListByFloorContext } from "../context/tenantListByFloor";
import MsgInputModal from "../components/modal/msgInput";
import TenantInfo from "../components/modal/tenantInfo";
import { ModalContext } from "../context/modal";
import { useModal } from "../hooks/useModal";
import axios from "axios";
import DepositHistory from "../components/modal/depositHistory";
import InputIncome from "../components/modal/inputIncome";

const MONTH_COLOR = "bg-orange-500";
const YEAR_COLOR = "bg-blue-500";
const EMPTY_COLOR = "bg-gray-500";

function MainBoard() {
  const { modalType } = useContext(ModalContext);
  const { tenantCount, tenantList } = useContext(TenantListByFloorContext);
  const tenantListByFloor = useMemo(() => {
    const tenantListByFloor: { [floor: string]: Tenant[] } = {};
    if (tenantList) {
      console.log("tenantList");
      for (let tenant of tenantList) {
        const floor = tenant.roomNumber[0];

        if (tenantListByFloor[floor]) {
          tenantListByFloor[floor].push(tenant);
        } else {
          tenantListByFloor[floor] = [tenant];
        }
      }

      return tenantListByFloor;
    }
  }, [tenantList]);

  const { openModal } = useModal();

  const [thisMonthIncome, setThisMonthIncome] = useState(0);
  const [selectedTenant, setSelectedTenant] = useState<null | Tenant>(null);

  const onClickTenantCard = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    openModal("tenantInfo");
  };

  const onClickEdit = () => {
    axios.patch("http://localhost:4000/tenants/1", { name: "조w)" });
  };

  return (
    <>
      <Header></Header>
      <main className="max-w-screen-xl m-auto p-5">
        <div className="flex justify-between">
          <Card title="이달의 수익" price={thisMonthIncome}></Card>
          <Card title="밀린 월세" price={0}></Card>
          <Card title="임시" price={0}></Card>
          <div onClick={onClickEdit}>
            <Card title="임시" price={0}></Card>
          </div>
        </div>
        <div className="flex mt-5">
          <div className="flex flex-1 flex-col p-3">
            <p className="mb-4">
              입주자 현황 (월세: {tenantCount.month} <span className={`px-3 py-0 mr-1 ${MONTH_COLOR}`}></span>/ 전세: {tenantCount.year} <span className={`px-3 py-0 mr-1 ${YEAR_COLOR}`}></span> /
              공실:
              {tenantCount.empty} <span className={`px-3 py-0 mr-1 ${EMPTY_COLOR}`}></span> )
            </p>
            <div className="flex flex-col">
              {tenantListByFloor &&
                Object.keys(tenantListByFloor).map((floor) => {
                  return (
                    <div className="flex" key={`floor_${floor}`}>
                      {tenantListByFloor[floor].map((tenant) => {
                        const isEmpty = tenant.deposit === 0 && tenant.rent === 0;
                        const tenantEndDate = new Date(tenant.endDate);
                        const today = new Date();
                        const dateGap = Math.floor((tenantEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                        return (
                          <div
                            onClick={() => onClickTenantCard(tenant)}
                            className={`p-3 m-0.5 flex-1 cursor-pointer transition-all ${isEmpty ? EMPTY_COLOR : tenant.type === "전세" ? YEAR_COLOR : MONTH_COLOR}`}
                            key={`room_${tenant.roomNumber}`}
                          >
                            <p className="font-semibold">{tenant.roomNumber}</p>
                            <p className="text-sm my-1 leading-3 truncatetext-ellipsis overflow-hidden text-wrap"> {isEmpty ? "공실" : tenant.name}</p>

                            {isEmpty === false && <p className="text-xs">{Number.isNaN(dateGap) ? "만료일 확인" : `${dateGap}일`}</p>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-1 flex-col "></div>
        </div>
      </main>
      {modalType === "msgInput" && <MsgInputModal></MsgInputModal>}
      {modalType === "inputIncome" && <InputIncome></InputIncome>}
      {modalType === "depositHistory" && selectedTenant && <DepositHistory tenant={selectedTenant}></DepositHistory>}
      {modalType === "tenantInfo" && selectedTenant && <TenantInfo tenant={selectedTenant}></TenantInfo>}
    </>
  );
}

export default MainBoard;
