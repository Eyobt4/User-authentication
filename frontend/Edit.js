// Get the id
const updateBlog = document.getElementById("editeblog");
updateBlog.addEventListener("submit", async () => {
    console.log("heaaaar");
    try {
        const response = await fetch("http://localhost:5001/blogs", {
            method: "GET",
        });
        console.log("the response  ", response);
        if (response.ok) {
            // const blogs = await response.json();
            const blogs = await response.json();
            const blogId = await blogs._id; 
            console.log("the blogs ", blogId);
        }
        else {
            console.log("Failed to fetch the get request", response.error)
        }
    }
    catch (error) {
        console.log("the error ", error);
    }
});


// Update blog and save

updateBlog.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const form = new FormData(updateBlog);
    const data = Object.fromEntries(form.entries());
    const id = e.target.id.replace("edit","");
    console.log("the id", id);
    try{
        const response = fetch(`http://localhost:5001/updateBlog/${id}`,{
            method: "PUT",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify(data),
        });
        window.location.href = "dashboard.js";
    }
    catch(error){
        console.log("Error is ",error);
    }


});
