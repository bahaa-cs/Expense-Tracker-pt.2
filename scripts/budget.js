let budget= 0
let transactions =JSON.parse(localStorage.getItem("Transactions")) || []

const totalBudget = () => {transactions.forEach(transaction => {
    if (transaction.type !== "")
        budget = transaction.type=="income" ? budget+Number(transaction.price) : budget-Number(transaction.price)
    
    })
    document.getElementById("budget-total").innerText = `$ ${budget}`
}
totalBudget()

