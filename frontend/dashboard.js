const checkAuth = async ()=>{
    token = localhost.getItem("token");
    if(!token){
        windows.locaion.href = "index.html";
        return;
    }
}

// create blog form js
const createblog= document.getElementById("createblog");

createblog.addEventListener("submit",async (e)=>{
        e.preventDefault();

        const form = new FormData(createblog);
        const data = Object.fromEntries(form.entries());

        try{

            const response = fetch("http://localhost:5001/createblog",{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify(data),
                
            });
            console.log(response);
            // if(response.ok){
            //     windows.locaion.href = "Home.html"
            // }
            // else{
            //     console.log("post not send to backend");
            // }
        }
        catch(error){
            console.log(error);
        }
});

// get blog posts js
const readblogs = document.getElementById("blogShowBtn");
const blogContainer = document.getElementById("blogContainer");

readblogs.addEventListener("click", async()=>{
    console.log("heaaaar");
    try{
        const response = await fetch("http://localhost:5001/blogs",{
            method:"GET",
        });
        console.log("the response  ",response);
        if(response.ok){
            // const blogs = await response.json();
            const blogs = await response.json();
            blogs.map(blog => {
                const postDiv = document.createElement("div");
                postDiv.innerHTML = `
                <h2>${blog.post}</h2>
                <h3>${blog._id}</h3>
                <h4>${blog.author}</h4>
                <button id="editPost">Edit</button>
                `;
                blogContainer.appendChild(postDiv);
            });
            console.log("the blogs ",blogs);
        }
        else{
            console.log("Failed to fetch the get request",response.error)
        }
    }
    catch(error){
        console.log("the error ",error);
    }
});

// update blog form js
const editPost = document.getElementById("editPost");

editPost.addEventListener("click",async (e)=>{
        e.preventDefault();

        const form = new FormData(createblog);
        const data = Object.fromEntries(form.entries());

        try{

            const response = fetch("http://localhost:5001/editBlog",{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify(data),
                
            });
            console.log(response);
            // if(response.ok){
            //     windows.locaion.href = "Home.html"
            // }
            // else{
            //     console.log("post not send to backend");
            // }
        }
        catch(error){
            console.log(error);
        }
});