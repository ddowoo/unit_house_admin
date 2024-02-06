import { useState } from "react";
import { BiX } from "react-icons/bi";

function MsgInputModal() {
  const [msg, setMsg] = useState("");
  const onClickX = () => {};

  const onChangeMsg = (e?: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e) {
      setMsg(e.target.value);
    }
  };

  const onClickSaveMsg = () => {};

  return (
    <div className="fixed right-5 bottom-5 bg-black w-2/12 p-4 pt-1">
      <div className="flex justify-between items-center text-white">
        <p className="font-bold text-l ml-2">카카오톡 메세지 입력하기</p>
        <button onClick={onClickX}>
          <BiX className="w-10 h-10 " />
        </button>
      </div>
      <textarea value={msg} className="w-full min-h-96 bg-white p-3" onChange={onChangeMsg}></textarea>
      <button
        onClick={onClickSaveMsg}
        type="button"
        className="w-full text-white bg-gray-800 mt-2 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        메세지 입력하기
      </button>
    </div>
  );
}

export default MsgInputModal;
