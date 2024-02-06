import "./App.css";
import MainBoard from "./pages/mainBoard";
import TenantListByFloorProvider from "./context/tenantListByFloor";
import ModalContextProvider from "./context/modal";
import BottomBtnList from "./components/bottomBtnList";

function App() {
  return (
    <ModalContextProvider>
      <TenantListByFloorProvider>
        <div className="bg-neutral-800 min-h-dvh text-white">
          <MainBoard></MainBoard>
          <BottomBtnList></BottomBtnList>
        </div>
      </TenantListByFloorProvider>
    </ModalContextProvider>
  );
}

export default App;
