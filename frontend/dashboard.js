const checkAuth = async ()=>{
    token = localhost.getItem("token");
    if(!token){
        windows.locaion.href = "index.html";
        return;
    }
}

    const createblog= document.getElementById("createblog");
    console.log(createblog.value);
    createblog.addEventListener("submit",async (e)=>{
        e.preventDefault();

        const form = new FormData(createblog);
        const data = Object.fromEntries(form.entries());
        console.log(data);
        
        // const form = new FormData(createblog);
        // console.log(form);
        // const data = Object.fromEntries(form.entries());
        
        try{

            const response = fetch("http://localhost:5001/createblog",{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify(data),
                
            });
            console.log(response);
            if(response.ok){
                windows.locaion.href = "Home.html"
            }
            else{
                console.log("post not send to backend");            }
        }
        catch(error){
            console.log(error);
        }
    });
