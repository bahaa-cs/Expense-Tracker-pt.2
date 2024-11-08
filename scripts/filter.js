document.getElementById("filter").addEventListener("click", () => {
    // to filter all at once
    minPrice_transaction = filter_minPrice(transactions)
    max_price_transaction = filter_maxPrice(minPrice_transaction)
    type_transaction = filter_type(max_price_transaction)
    date_transaction = filter_date(type_transaction)
    
    final_transaction = filter_notes(date_transaction)

    reloadLocalStorage(final_transaction)

})
const filter_minPrice = () =>{
    let minPrice = Number(document.getElementById("min-price-filter").value)
    
    let newTransactions = transactions.filter(transaction => {
       return Number(transaction.price) >= minPrice
    })
    localStorage.setItem("newTransactions", JSON.stringify(newTransactions))
    if (minPrice!==0)
        return newTransactions
    return transactions
}

const filter_maxPrice = (transactions) =>{
    let maxPrice = Number(document.getElementById("max-price-filter").value)
    
    let newTransactions = transactions.filter(transaction => {
       return Number(transaction.price) <= maxPrice
    })
    localStorage.setItem("newTransactions", JSON.stringify(newTransactions))
    if(maxPrice!==0)
        return newTransactions
    return transactions
};

const filter_type = (transactions) =>{
    let type = document.getElementById("type-filter").value
    let newTransactions = transactions.filter(transaction => {
        return transaction.type == type
    })
    localStorage.setItem("newTransactions", JSON.stringify(newTransactions))
    if(type=="income" || type=="expense")
        return newTransactions
    return transactions

}

const filter_date = (transactions) =>{
    let date = document.getElementById("date-filter").value

    let newTransactions = transactions.filter(transaction => {
        return transaction.date== date
    })
    localStorage.setItem("newTransactions", JSON.stringify(newTransactions))
    if(date)
        return newTransactions
    return transactions

}

const filter_notes = (transactions) =>{
    let notes = document.getElementById("notes-filter").value

    let newTransactions = transactions.filter(transaction => {
        return transaction.notes.includes(notes)  })
    localStorage.setItem("newTransactions", JSON.stringify(newTransactions))
    if(notes)
        return newTransactions
    return transactions

}



