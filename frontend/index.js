const signupForm = document.getElementById("registerForm");
// const loginForm = document.getElementById("loginForm");
//signup
signupForm.addEventListener( 'submit' ,async (event)=>{
    event.preventDefault();

    const form = new FormData(signupForm);
    const data = {
        username: form.get("username"),
        email: form.get("email"),
        password: form.get("password"),
    };
    console.log(data);
    

    const res = await fetch("https://localhost:5001/auth/register",{
        method:"POST",
        headers:{"Content-Type": "application/json "},
        body:JSON.stringify(data),
    });
    const result = await res.json();
    alert(result.message||"registered!");
    console.log(data);
    
});
//login
// loginForm.addEventListener("submit", async (e)=>{
//     e.preventDefault();

//     const form = new FormData(loginForm);
//      const data = {
//         email: form.email.value,
//         password: form.password.value,
//     }
//     const res = fetch("http://localhost:5001/auth/login", {
//         method:"POST",
//         headers:{"Content-Type":"applicatio/json"},
//         body:JSON.stringify(data),
//     });
//     const result = await res.json();
//     alert(result.message||"registered!");
// });