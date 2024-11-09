

const loginBtn = document.getElementById("login-btn")
loginBtn.addEventListener("click",()=>{
    const loginInput = document.getElementById("login-input").value
        
    axios.post('http://localhost:8080/expense-tracker-server/apis/getUsernameByUsername.php',
        {
            username : loginInput
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
     .then(response => {
        if(response.data === null){
            // create user and enter to the page with its id
        }
        else{
            const user = response.data
            localStorage.setItem("user_id", user.id);
            window.location = `../index.html?user_id=${user.id}`
        }

        
     })
     .catch(error => {console.error('Error:', error);
     });

})