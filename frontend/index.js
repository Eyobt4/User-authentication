const signupForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const protectedForm = document.getElementById("protectedForm");

//signup
signupForm.addEventListener( 'submit' ,async (event)=>{
    event.preventDefault();

    const form = new FormData(signupForm);
    const data = Object.fromEntries(form.entries());
    
    try{

        const response = await fetch("http://localhost:5001/signup",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(data),
        });
        
        console.log(response);
    }
    catch(error){
        console.log("Error:",error);
    };
    
});

loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const form = new FormData(loginForm);
    const data = Object.fromEntries(form.entries());
    try{

        const response = await fetch("http://localhost:5001/login", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data),
        });
        // console.log(response);

        if(response.ok){
            const result = await response.json();
            localStorage.setItem("token",result.token);
            window.location.href = "dashboard.html";
        }
        else{            
            error = await response.json();
            alert(error);
        }

    }
    catch(error){
        console.log(error);
        alert(error);
        // return res.status(404).send("faild to login");
    }
});

protectedForm.addEventListener( 'submit' ,async (event)=>{
    event.preventDefault();

    try{

        const response = await fetch("http://localhost:5001/signup",{
            method:"GET",
            headers:{"Content-Type": "application/json"},
        });
        console.log(response);
    }
    catch(error){
        console.log("Error:",error);
    };
    
});