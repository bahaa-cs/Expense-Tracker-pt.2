const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", () => {
  const loginInput = document.getElementById("login-input").value;

  axios
    .post(
      "http://localhost:8080/expense-tracker-server/apis/getUsernameByUsername.php",
      {
        username: loginInput,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      if (response.data === null) {
        // create new user
        axios
          .post(
            "http://localhost:8080/expense-tracker-server/apis/createUser.php",
            {
              username: loginInput,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then(() => {
            // get the username of the new user
            axios
              .post(
                "http://localhost:8080/expense-tracker-server/apis/getUsernameByUsername.php",
                {
                  username: loginInput,
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((finalResponse) => {
                // assign the id value of the new user
                const newUser = finalResponse.data;
                localStorage.setItem("user_id", newUser.id);
                window.location = `../index.html?user_id=${newUser.id}`;
              });
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
      } else {
        const user = response.data;
        localStorage.setItem("user_id", user.id);
        window.location = `../index.html?user_id=${user.id}`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
