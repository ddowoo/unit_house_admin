export const getIncomeFromMsg = (input: string) => {
  const messageList = input.split("\n");
  console.log(messageList);
  const newMsgList = [];
  let nowMsg = "";
  for (let i = 0; i < messageList.length; i++) {
    if (messageList[i] === "" || messageList[i].includes("2024년 1월")) {
    } else if (messageList[i].includes("오전") || messageList[i].includes("오후")) {
      nowMsg !== "" && newMsgList.push(nowMsg);
      nowMsg = messageList[i];
    } else {
      nowMsg += messageList[i] + "\n";
    }
  }

  const incomeMsgList = newMsgList.filter((msg) => msg.includes("[Web발신]하나") && msg.includes("입금"));
  const nameList: string[] = [];
  const incomeList: number[] = [];
  const thisMonthIncome = incomeMsgList.reduce((acc, cur) => {
    nameList.push(cur.split("\n")[3]);
    const income = Number(cur.split("\n")[2].replace("입금", "").replace("원", "").replaceAll(",", ""));
    incomeList.push(income);
    console.log(income);
    return acc + income;
  }, 0);

  for (let i = 0; i < incomeList.length; i++) {
    console.log(`${nameList[i]} - ${incomeList[i]}`);
  }

  console.log(nameList);
  console.log(thisMonthIncome);
  return thisMonthIncome;
};
