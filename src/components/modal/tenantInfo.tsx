import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import { MouseEventHandler } from "react";

const TenantInfo = (props: { tenant: any }) => {
  const { tenant } = props;
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...tenant },
  });

  const onClickModalBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e?.currentTarget === e.target) {
      console.log("모달 꺼줘");
      closeModal();
    }
  };

  return (
    <div onClick={onClickModalBg} className={`absolute top-0 left-0 w-lvw h-lvh bg-black/50 flex justify-center items-center`}>
      <div className="bg-neutral-800 flex flex-column p-8 rounded-lg">
        <form className="flex flex-col" onSubmit={handleSubmit((data) => console.log(data))}>
          <ul>
            <li>
              <p className="mb-1 text-sm font-bold">이름</p>
              <input
                {...register("name")}
                id="name-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              ></input>
            </li>
            <li className="my-3">
              <ul className="flex">
                <li>
                  <p className="mb-1 text-sm font-bold">계약타입</p>
                  <input
                    {...register("type")}
                    id="type-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </li>
                <li className="mx-2">
                  <p className="mb-1 text-sm font-bold">보증금</p>
                  <input
                    {...register("deposit")}
                    id="deposit-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
                </li>
                <li>
                  <p className="mb-1 text-sm font-bold">월세 / 관리비</p>
                  <input
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
                  {...register("startDate")}
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
            type="submit"
            className="mt-5 font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default TenantInfo;
