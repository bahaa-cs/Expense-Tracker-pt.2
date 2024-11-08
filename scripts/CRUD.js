// localStorage.clear()
const saveTransaction = () => {
    let transactions = JSON.parse(localStorage.getItem("Transactions")) || []
    
    let transactionID = document.getElementById("id").value
    
    if(transactionID !== undefined && transactionID !== ""){
        let index = transactions.findIndex(transaction => transaction.id == transactionID)
        transactions[index].price = document.getElementById("price").value
        transactions[index].type = document.getElementById("type").value
        transactions[index].date = document.getElementById("date").value
        transactions[index].notes = document.getElementById("notes").value

    }
    else{
        const newTransaction = {
            id: Date.now().toString(),
            price: document.getElementById("price").value,
            type: document.getElementById("type").value,
            date: document.getElementById("date").value,
            notes: document.getElementById("notes").value,
        }
        
        
        transactions.push(newTransaction)
    }
    


    localStorage.setItem("Transactions", JSON.stringify(transactions))
    document.getElementById("transactionForm").reset()

    return transactions
}

const reloadLocalStorage  = (transactions) =>{
    let data_info_element=document.getElementById("data-info")
    
    data_info_element.innerHTML=""
    transactions.forEach(transaction =>{
        data_info_element.innerHTML+=
        `<div class="flex row data black-txt" id="${transaction.id}">
            <div class="price">${transaction.price}</div>
            <div class="type">${transaction.type}</div>
            <div class="date">${transaction.date}</div>
            <div class="notes">${transaction.notes}</div>
            <div class="flex row action-btns black-txt">
                <button class="edit-btn action-btn black-txt">edit</button>
                <button class="delete-btn action-btn red-bg white-txt">delete</button>
            </div>
        </div>`
    } )

}
window.addEventListener("load", () => {
    let transactions;
    axios.get('http://localhost:8080/expense-tracker-server/apis/getTransactions.php')
    .then((response) =>{
      transactions = response.data;
      reloadLocalStorage(transactions);
    })
    
    
    
})

// event listeners

// read
document.getElementById("transactionForm").addEventListener("submit", (event) => {
    
    reloadLocalStorage(saveTransaction())
    console.log(localStorage.getItem("Transactions"))
})

// edit
document.addEventListener("click", (event)=>{
    if(event.target.classList.contains("edit-btn")){
        let transactions = JSON.parse(localStorage.getItem("Transactions")) || []
        
        let transactionID = event.target.parentElement.parentElement.getAttribute("id")
        
        let index = transactions.findIndex(transaction=> transaction.id == transactionID)

        document.getElementById("id").value = transactions[index].id
        document.getElementById("price").value = transactions[index].price
        document.getElementById("type").value = transactions[index].type
        document.getElementById("date").value = transactions[index].date
        document.getElementById("notes").value = transactions[index].notes

        document.getElementById("transactionForm").scrollIntoView()
        // reloadLocalStorage(transactions)
    }
    
}
)

//delete
document.addEventListener("click", (event)=>{
    let transactions = JSON.parse(localStorage.getItem("Transactions")) || []

    if(event.target.classList.contains("delete-btn")){
        
        let transactionID = event.target.parentElement.parentElement.getAttribute("id")
        
        let index = transactions.findIndex(transaction=> transaction.id == transactionID)

        transactions.splice(index,1)
        
        location.reload()
        
    }
    localStorage.setItem("Transactions", JSON.stringify(transactions))
    // reloadLocalStorage(transactions)
    
}
)





