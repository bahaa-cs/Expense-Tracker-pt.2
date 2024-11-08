let budget= 0
let transactions;
axios.post('http://localhost:8080/expense-tracker-server/apis/getTotalBudget.php',
    {
        users_id : 1
    }
)
.then((response) =>{
    transactions = response.data || [];
    transactions.forEach(transaction => {
        budget = transaction.type=="income" ? budget+Number(transaction.price) : budget-Number(transaction.price)
        })
    document.getElementById("budget-total").innerText = `$ ${budget}`
    })



