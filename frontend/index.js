const signupForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
//signup
signupForm.addEventListener( "submit" ,async (e)=>{
    e.preventDefault();

    const form = new.target;
    const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
    };

    const res = await fetch("http://localhost:5001/auth/register",{
        method:"POST",
        headers:{"Content-Type": "application/json "},
        body:JSON.stringify(data),
    });
    const result = await res.json();
    alert(result.message||"registered!");
});
//login
loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const form = new.target;
     const data = {
        email: form.email.value,
        password: form.password.value,
    }
    const res = fetch("http://localhost:5001/auth/login", {
        method:"POST",
        headers:{"Content-Type":"applicatio/json"},
        body:JSON.stringify(data),
    });
    const result = await res.json();
    alert(result.message||"registered!");
});