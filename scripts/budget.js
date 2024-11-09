let budget = 0;
let transactions;
axios
  .post(
    "http://localhost:8080/expense-tracker-server/apis/getTotalBudget.php",
    {
      users_id: userId,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
  .then((response) => {
    transactions = response.data || [];
    transactions.forEach((transaction) => {
      budget =
        transaction.type == "income"
          ? budget + Number(transaction.price)
          : budget - Number(transaction.price);
    });
    document.getElementById("budget-total").innerText = `$ ${budget}`;
  });
