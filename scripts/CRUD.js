const saveTransaction = () => {
    const transactionData = {
        price: Number(document.getElementById("price").value),
        type: document.getElementById("type").value,
        date: new Date(document.getElementById("date").value).toISOString().slice(0, 10),
        notes: document.getElementById("notes").value,
        users_id:1
        };

        console.log(transactionData)
        axios.post('http://localhost:8080/expense-tracker-server/apis/insertTransaction.php',
             transactionData,
             {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
    
            )
          .then(response => {console.log('Response:', response.data);
          })
          .catch(error => {console.error('Error:', error);
          });        

        document.getElementById("transactionForm").reset()
    }
   

const reloadHTML  = (transactions) =>{

    let data_info_element=document.getElementById("data-info")
    
    data_info_element.innerHTML=""
    transactions.forEach(transaction  =>{
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

const reloadTransactions = () =>{
    let transactions;
    axios.post('http://localhost:8080/expense-tracker-server/apis/getTransactions.php',
        {users_id : 1},
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    )
    .then((response) =>{
    
      transactions = response.data;
      reloadHTML(transactions);
    })

}

window.addEventListener("load", () => {
    reloadTransactions()    
})


// create/update

document.getElementById("transactionForm").addEventListener("submit",(event) => {

    let transactionID = document.getElementById("id").value
    
    if(transactionID == undefined || transactionID == "")
        saveTransaction()
    else{
        const updated_transactionData = {
            id:transactionID,
            price: Number(document.getElementById("price").value),
            type: document.getElementById("type").value,
            date: new Date(document.getElementById("date").value).toISOString().slice(0, 10),
            notes: document.getElementById("notes").value,
            users_id:1
            };


            axios.post('http://localhost:8080/expense-tracker-server/apis/updateTransaction.php',
                                updated_transactionData,
                            {
                                headers :{
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            }
                        )
            .then(() => {
                reloadTransactions()  
                document.getElementById("transactionForm").reset()      
            })
            .catch(error => {console.error('Error:', error);
            });
        }

        
})


// edit to form
document.addEventListener("click", (event)=>{
    if(event.target.classList.contains("edit-btn")){
        let transaction;
        let transactionID = event.target.parentElement.parentElement.getAttribute("id")
        axios.post('http://localhost:8080/expense-tracker-server/apis/getTransactionById.php',
            {
                id:transactionID
            }
            ,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })

         .then(response => {
            transaction = response.data;
            document.getElementById("id").value = transaction.id
            document.getElementById("price").value = transaction.price
            document.getElementById("type").value = transaction.type
            document.getElementById("date").value = transaction.date
            document.getElementById("notes").value = transaction.notes

            document.getElementById("transactionForm").scrollIntoView()
         })
         .catch(error => {console.error('Error:', error);
         });
        }
        })

// delete
document.addEventListener("click", (event)=>{


    if(event.target.classList.contains("delete-btn")){
        
        let transactionID = event.target.parentElement.parentElement.getAttribute("id")
        
        let transactionData = {
            users_id:1,
            id:transactionID
        }
        axios.post('http://localhost:8080/expense-tracker-server/apis/deleteTransaction.php',
            transactionData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
         .then(() => {
            reloadTransactions()
            location.reload()
         })
         .catch(error => {console.error('Error:', error);
         });
  
    }
}
)
