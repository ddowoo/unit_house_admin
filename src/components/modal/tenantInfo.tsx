import { FieldValues, useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import { MouseEventHandler } from "react";

const TenantInfo = (props: { tenant: any }) => {
  const { tenant } = props;
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...tenant },
  });

  const onClickModalBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e?.currentTarget === e.target) {
      console.log("모달 꺼줘");
      closeModal();
    }
  };

  const onSubmit = (value: FieldValues) => {
    closeModal();
  };

  return (
    <div onClick={onClickModalBg} className={`absolute top-0 left-0 w-lvw h-lvh bg-black/50 flex justify-center items-center`}>
      <div className="bg-neutral-800 flex flex-col p-8 rounded-lg">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit, (err) => console.error(err))}>
          <ul>
            <li>
              <p className="mb-1 text-sm font-bold">이름</p>
              <input
                {...register("name", {
                  required: "이름 입력",
                  minLength: 2,
                })}
                type="text"
                required
                minLength={2}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </li>
            <li className="my-3">
              <ul className="flex">
                <li className="flex-1">
                  <p className="mb-1 text-sm font-bold">계약타입</p>
                  <select value={tenant.type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="전세">전세</option>
                    <option value="월세">월세</option>
                  </select>
                </li>
                <li className="mx-2 flex-1">
                  <p className="mb-1 text-sm font-bold">보증금</p>
                  <input
                    {...register("deposit")}
                    id="deposit-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </li>
                <li className="flex-1">
                  <p className="mb-1 text-sm font-bold">월세 / 관리비</p>
                  <input
                    type="number"
                    {...register("rent")}
                    id="deposit-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </li>
              </ul>
            </li>
            <li>
              <p className="mb-1 text-sm font-bold">계약기간</p>
              <div className="flex items-center">
                <input
                  {...register("startDate", {
                    required: "계약 기간은 yyyy-mm-xx 형식으로 입력하기",
                    minLength: 10,
                    maxLength: 10,
                  })}
                  id="deposit-input"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                ></input>
                <p className="mx-2">~</p>
                <input
                  {...register("endDate")}
                  id="deposit-input"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                ></input>
              </div>
            </li>
          </ul>
          <input
            title="저장"
            type="submit"
            className="mt-5 font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          ></input>
        </form>
        <div className="flex">
          <button className="flex-1 mt-5 font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            정산 내역
          </button>
          <button className="flex-1 mt-5 font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            계약 만료
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantInfo;
