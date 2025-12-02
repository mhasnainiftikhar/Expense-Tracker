export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const addThousandsSeparator = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const prepareIncomeBarChartData = (transactions = []) => {
  if (!Array.isArray(transactions)) return [];

  const last60Days = {};
  const today = new Date();

  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    last60Days[key] = 0;
  }

  transactions.forEach((item) => {
    const dateKey = new Date(item.date).toISOString().split("T")[0];

    if (last60Days[dateKey] !== undefined) {
      last60Days[dateKey] += item.amount;
    }
  });

  return Object.entries(last60Days).map(([date, amount]) => ({
    date,
    amount,
  }));
};




export const prepareExpenseLineChartData = (expenses = []) => {
  if (!Array.isArray(expenses)) return [];

  const grouped = {};

  expenses.forEach((exp) => {
    const d = new Date(exp.date);
    const formatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    if (!grouped[formatted]) grouped[formatted] = 0;
    grouped[formatted] += Number(exp.amount) || 0;
  });

  
  const chartArray = Object.keys(grouped).map((date) => ({
    date,
    amount: grouped[date]
  }));

  
  chartArray.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return chartArray;
};







