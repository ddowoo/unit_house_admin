import { useContext, useState } from "react";
import Card from "../components/card";
import Header from "../components/header";
import { TenantListByFloorContext } from "../context/tenantListByFloor";
import MsgInputModal from "../components/modal/msgInput";
import TenantInfo from "../components/modal/tenantInfo";
import { ModalContext } from "../context/modal";
import { useModal } from "../hooks/useModal";

const MONTH_COLOR = "bg-orange-500";
const YEAR_COLOR = "bg-blue-500";
// dateGap <= 90 && `${tenant.type === "전세" ? "from-green-500" : "from-yellow-500"} bg-gradient-to-r to-red-500`

function MainBoard() {
  const { modalType } = useContext(ModalContext);
  const { tenantCount, tenantListByFloor } = useContext(TenantListByFloorContext);

  const { openModal } = useModal();

  const [thisMonthIncome, setThisMonthIncome] = useState(0);
  const [selectedTenant, setSelectedTenant] = useState<null | Tenant>(null);

  const onClickTenantCard = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    openModal("tenantInfo");
  };

  return (
    <>
      <Header></Header>
      <main className="max-w-screen-xl m-auto p-5">
        <div className="flex justify-between">
          <Card title="이달의 수익" price={thisMonthIncome}></Card>
          <Card title="밀린 월세" price={0}></Card>
          <Card title="임시" price={0}></Card>
          <Card title="임시" price={0}></Card>
        </div>
        <div className="flex mt-5">
          <div className="flex flex-1 flex-col p-3">
            <p className="mb-4">
              입주자 현황 (월세: {tenantCount.month} <span className={`px-3 py-0 mr-1 ${MONTH_COLOR}`}></span> / 전세: {tenantCount.year} <span className={`px-3 py-0 mr-1 ${YEAR_COLOR}`}></span>)
            </p>
            <div className="flex flex-col">
              {tenantListByFloor &&
                Object.keys(tenantListByFloor)
                  .reverse()
                  .map((floor) => {
                    return (
                      <div className="flex" key={`floor_${floor}`}>
                        {Object.keys(tenantListByFloor[floor]).map((roomNumber) => {
                          const tenant: Tenant = tenantListByFloor[floor][roomNumber];
                          const tenantEndDate = new Date(tenant.endDate);
                          const today = new Date();
                          const dateGap = Math.floor((tenantEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                          return (
                            <div
                              onClick={() => onClickTenantCard(tenant)}
                              className={`p-3 m-0.5 flex-1 cursor-pointer transition-all ${tenant.type === "전세" ? YEAR_COLOR : MONTH_COLOR}`}
                              key={`room_${roomNumber}`}
                            >
                              <p className="font-semibold">{roomNumber}</p>
                              <p className="text-sm my-1 leading-3 truncatetext-ellipsis overflow-hidden text-wrap">{tenant.name}</p>

                              <p className="text-xs">{Number.isNaN(dateGap) ? "만료일 확인" : `${dateGap}일`}</p>
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
      {/* {modalType === "msgInput" && <MsgInputModal onClickSaveMsg={onClickSaveMsg} onClickX={() => setIsMsgBoxOpen(false)}></MsgInputModal>} */}
      {modalType === "tenantInfo" && selectedTenant && <TenantInfo tenant={selectedTenant}></TenantInfo>}
    </>
  );
}

export default MainBoard;
