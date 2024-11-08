// localStorage.clear()
const saveTransaction = async() => {
    
    // let transactions;
    // axios.get('http://localhost:8080/expense-tracker-server/apis/getTransactions.php')
    // .then((response) =>{
    //   transactions = response.data;
    //   reloadLocalStorage(transactions);
    // })
    
    // let transactionID = document.getElementById("id").value
    
    // if(transactionID == undefined || transactionID == ""){
        // let index = transactions.findIndex(transaction => transaction.id == transactionID)
        // transactions[index].price = document.getElementById("price").value
        // transactions[index].type = document.getElementById("type").value
        // transactions[index].date = document.getElementById("date").value
        // transactions[index].notes = document.getElementById("notes").value
        
    const transactionData = {
        price: Number(document.getElementById("price").value),
        type: document.getElementById("type").value,
        date: new Date(document.getElementById("date").value).toISOString().slice(0, 10),
        notes: document.getElementById("notes").value,
        users_id:1
        };

        console.log(transactionData)
        
        // const response = await fetch("http://localhost:8080/expense-tracker-server/apis/insertTransaction.php", {
        //     method: "POST",
        //     body: JSON.stringify(transactionData),
        //     headers: {
        //       "Content-type": "application/json; charset=UTF-8",
        //     },
        //   });
        // if (!response.ok) {
        //     console.error("Error:", response.status, await response.text());
        //     return;
        // }
        // const data = await response.json();
        axios.post('http://localhost:8080/expense-tracker-server/apis/insertTransaction.php',
             transactionData)
          .then(response => {console.log('Response:', response.data);
          })
          .catch(error => {console.error('Error:', error);
          });

        // console.log("hey")
        // console.log(data);
        

        document.getElementById("transactionForm").reset()
    }

    // else{
    //     const newTransaction = {
    //         id: Date.now().toString(),
    //         price: document.getElementById("price").value,
    //         type: document.getElementById("type").value,
    //         date: document.getElementById("date").value,
    //         notes: document.getElementById("notes").value,
    //     }
        
        
    //     transactions.push(newTransaction)
    // }
    


    // localStorage.setItem("Transactions", JSON.stringify(transactions))
   

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

document.getElementById("transactionForm").addEventListener("submit",(event) => {
    saveTransaction()
    axios.get('http://localhost:8080/expense-tracker-server/apis/getTransactions.php')
    .then((response) =>{
      transactions = response.data;
      reloadLocalStorage(transactions)
})
})


// edit
// document.addEventListener("click", (event)=>{
//     if(event.target.classList.contains("edit-btn")){
//         let transactions = JSON.parse(localStorage.getItem("Transactions")) || []
        
//         let transactionID = event.target.parentElement.parentElement.getAttribute("id")
        
//         let index = transactions.findIndex(transaction=> transaction.id == transactionID)

//         document.getElementById("id").value = transactions[index].id
//         document.getElementById("price").value = transactions[index].price
//         document.getElementById("type").value = transactions[index].type
//         document.getElementById("date").value = transactions[index].date
//         document.getElementById("notes").value = transactions[index].notes

//         document.getElementById("transactionForm").scrollIntoView()
//         // reloadLocalStorage(transactions)
//     }
    
// }
// )

// delete
document.addEventListener("click", (event)=>{


    if(event.target.classList.contains("delete-btn")){
        
        let transactionID = event.target.parentElement.parentElement.getAttribute("id")
        
        let transactionData = {
            id:transactionID
        }
        axios.post('http://localhost:8080/expense-tracker-server/apis/deleteTransaction.php',
            transactionData)
         .then(response => {console.log('Response:', response.data);
         })
         .catch(error => {console.error('Error:', error);
         });
         let transactions;
         axios.get('http://localhost:8080/expense-tracker-server/apis/getTransactions.php')
         .then((response) =>{
           transactions = response.data;
           reloadLocalStorage(transactions)
           location.reload()
         })

        
    }
    
 
    
}
)
