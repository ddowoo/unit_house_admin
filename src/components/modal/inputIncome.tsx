import { FieldValues, useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import { roomList, yymmdd } from "../../constants/constants";
import { useContext, useState } from "react";
import axios from "axios";
import { TenantListByFloorContext } from "../../context/tenantListByFloor";
import { couldStartTrivia } from "typescript";
import { editUserInfoFetch } from "../../api/fetches";

export const InputIncome = () => {
  const { tenantList, getTenantList } = useContext(TenantListByFloorContext);
  const { closeModal } = useModal();
  const [room, setRoom] = useState("b01");
  const [year, setYear] = useState("2024");
  const [month, setMonth] = useState("01");
  const [date, setDate] = useState("01");

  const { register, handleSubmit } = useForm<{
    amount: number;
  }>({
    defaultValues: {
      amount: 0,
    },
  });

  const onClickModalBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e?.currentTarget === e.target) {
      closeModal();
    }
  };

  const onSubmit = async ({ amount }: FieldValues) => {
    if (tenantList) {
      const depositDate = `${year}-${month}-${date}`;
      const tenant = tenantList.filter((tenant) => tenant.roomNumber === room)[0];

      if (window.confirm(`입금자 : ${tenant.name}${"\n"}날짜 : ${depositDate}${"\n"}금액 : ${Number(amount).toLocaleString()}`)) {
        if (tenant) {
          const _tenant = {
            ...tenant,
            depositHistory: [
              ...tenant.depositHistory,
              {
                date: depositDate,
                amount,
              },
            ],
          };

          await editUserInfoFetch(tenant.id, _tenant);
          getTenantList();
          closeModal();
        }
      }
    }
  };

  return (
    <div onClick={onClickModalBg} className={`absolute top-0 left-0 w-lvw h-lvh bg-black/50 flex justify-center items-center`}>
      <div className="bg-neutral-800 flex flex-col p-8 rounded-lg w-[40rem] ">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit, (err) => console.error(err))}>
          <ul>
            <li className="mb-3">
              <p className="mb-1 text-sm font-bold">호수</p>
              <select
                value={room}
                onChange={(e) => setRoom(e.currentTarget.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {tenantList &&
                  tenantList.map((tenant) => {
                    return (
                      <option key={`room_${tenant.roomNumber}`} value={tenant.roomNumber}>
                        {tenant.roomNumber}호 - {tenant.name}
                      </option>
                    );
                  })}
              </select>
            </li>
            <li className="mb-3">
              <ul className="flex">
                <li className="flex-1 ">
                  <p className="mb-1 text-sm font-bold">연도</p>
                  <select
                    onChange={(e) => setYear(e.currentTarget.value)}
                    value={year}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    {yymmdd.year.map((_year) => {
                      return (
                        <option key={`year_${_year}`} value={_year}>
                          {_year}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li className="flex-1 mx-2">
                  <p className="mb-1 text-sm font-bold">월</p>
                  <select
                    onChange={(e) => setMonth(e.currentTarget.value)}
                    value={month}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    {yymmdd.month.map((_month) => {
                      return (
                        <option key={`year_${_month}`} value={_month}>
                          {_month}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li className="flex-1">
                  <p className="mb-1 text-sm font-bold">일</p>
                  <select
                    onChange={(e) => setDate(e.currentTarget.value)}
                    value={date}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    {yymmdd.date.map((_date) => {
                      return (
                        <option key={`year_${_date}`} value={_date}>
                          {_date}
                        </option>
                      );
                    })}
                  </select>
                </li>
              </ul>
            </li>
            <li className="mb-3">
              <p className="mb-1 text-sm font-bold">금액</p>
              <input
                {...register("amount")}
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              ></input>
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

export default InputIncome;
