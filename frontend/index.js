const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

signupForm.addEventListener( "submit" ,async (e)=>{
    e.preventDefault();

    const formData = new FormData(signupForm);
    const body = Object.fromEntries(formData.entries());

    const res = await fetch("http://localhost:5001/api/signup",{
        method:"POST",
        headers:{"Content-Type": "application/json "},
        body:JSON.stringify(body),
    });
    const data = await res.json();
    alert(JSON.stringify(data));
});

loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const formData =   new FormData(loginForm);
    const body = Object.fromEntries(formData.entries());

    const res = fetch("http://localhost:5001/api/login", {
        method:"POST",
        headers:{"Content-Type":"applicatio/json"},
        body:JSON.stringify(body),
    });
    const data = await res.json()
    alert(JSON.stringify(data));
});