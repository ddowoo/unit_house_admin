type Tenant = {
  id: number;
  roomNumber: string;
  name: string;
  depositHistory: DepositHistory[];
  type: string;
  deposit: number;
  rent: number;
  startDate: string;
  endDate: string;
};

type DepositHistory = {
  date: string;
  amount: number;
};
