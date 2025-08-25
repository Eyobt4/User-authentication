const checkAuth = async ()=>{
    token = localhost.getItem("token");
    if(!token){
        windows.locaion.href = "index.html";
        return;
    }
    const createblog= document.getElementById("createblog");

    createblog.addEventListener("submit",async (e)=>{
        e.preventDefault();

        const form = new FormData(createblog);
        const data = Object.fromEntries(form.entries());
        try{

            response = fetch("http://localhost:5001/createblog",{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify(data)
            });

            if(response.ok){
                windows.locaion.href = "Home.html"
            }
            else{
                console.log("post not send to backend");
                res.status(400).json({message:"post not send to backend"})
            }
        }
        catch(error){
            console.log(error);
        }
    });
}