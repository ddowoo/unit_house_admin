import "./App.css";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import MainBoard from "./pages/mainBoard";
import TenantListByFloorProvider from "./context/tenantListByFloor";
// import KakaoMsgProvider from "./context/kakaoMsg";
import ModalContextProvider from "./context/modal";
import BottomBtnList from "./components/bottomBtnList";

const MONTH_COLOR = "";
const YEAR_COLOR = "";

function App() {
  const [isSideBtnOpen, setIsSideBtnOpen] = useState(false);
  const [isMsgBoxOpen, setIsMsgBoxOpen] = useState(false);

  const [isTenantModalVisible, setIsTenantModalVisible] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const onClickSaveMsg = () => {
    // setThisMonthIncome(getIncomeFromMsg(kakaoMsg));
  };

  return (
    <ModalContextProvider>
      <TenantListByFloorProvider>
        {/* <KakaoMsgProvider> */}
        <div className="bg-neutral-800 min-h-dvh text-white">
          <MainBoard></MainBoard>
          <BottomBtnList></BottomBtnList>
        </div>
        {/* </KakaoMsgProvider> */}
      </TenantListByFloorProvider>
    </ModalContextProvider>
  );
}

export default App;
