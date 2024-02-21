type Tenant = {
  name: string;
  depositHistoryList: [];
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
