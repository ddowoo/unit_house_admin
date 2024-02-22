import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useModal } from "../hooks/useModal";

const BottomBtnList = () => {
  const { openModal } = useModal();
  const [isSideBtnOpen, setIsSideBtnOpen] = useState(false);
  const [isMsgBoxOpen, setIsMsgBoxOpen] = useState(false);

  const openInputMsg = () => openModal("msgInput");
  const openInputIncome = () => openModal("inputIncome");

  return (
    <>
      <div className="fixed right-10 bottom-10 ">
        <div className={`flex flex-col absolute bottom-14 right-0 w-28 items-end transition-all ${isSideBtnOpen ? "opacity-100" : "opacity-0"}`}>
          <p onClick={openInputIncome} className="font-bold my-3 cursor-pointer">
            입금 입력
          </p>
          <p onClick={openInputMsg} className="my-3 cursor-pointer font-bold" data-modal-target="default-modal" data-modal-toggle="default-modal">
            월세 메세지 입력
          </p>
        </div>
        <button className="w-15 h-15 bg-black hover:scale-125 transition-all rounded-3xl">
          <GoPlus className="w-10 h-10" onClick={() => setIsSideBtnOpen((prev) => !prev)} />
        </button>
      </div>
    </>
  );
};

export default BottomBtnList;
