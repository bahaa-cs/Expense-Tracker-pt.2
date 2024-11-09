document.getElementById("filter").addEventListener("click", () => {
  const users_id = 1;
  const minPrice =
    Number(document.getElementById("min-price-filter").value) || null;
  const maxPrice =
    Number(document.getElementById("max-price-filter").value) || null;
  const type = document.getElementById("type-filter").value || null;
  const date = document.getElementById("date-filter").value || null;
  const notes = document.getElementById("notes-filter").value || null;

  axios
    .post(
      "http://localhost:8080/expense-tracker-server/apis/getFilteredTransactions.php",
      {
        users_id: users_id,
        minPrice: minPrice,
        maxPrice: maxPrice,
        type: type,
        date: date,
        notes: notes,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      let transactions = response.data;
      reloadHTML(transactions);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
});
