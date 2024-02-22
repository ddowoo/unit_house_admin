import { useModal } from "../../hooks/useModal";

function DepositHistory({ tenant }: { tenant: Tenant }) {
  const { closeModal } = useModal();

  const onClickModalBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e?.currentTarget === e.target) {
      closeModal();
    }
  };
  return (
    <div onClick={onClickModalBg} className={`absolute top-0 left-0 w-lvw h-lvh bg-black/50 flex justify-center items-center`}>
      <div className="bg-neutral-800 flex flex-col p-8 rounded-lg w-[40rem] ">
        {tenant.depositHistory.length === 0
          ? " 정산 내역이 없습니다."
          : tenant.depositHistory.map(({ date, amount }) => {
              return <p key={`${date}_${amount}`}>{`날짜 : ${date} - ${Number(amount).toLocaleString()}`}</p>;
            })}
      </div>
    </div>
  );
}

export default DepositHistory;
