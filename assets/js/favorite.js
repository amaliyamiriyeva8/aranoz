let id=new URLSearchParams(window.location.search).get("id")
const js_images=document.querySelector(".images")
fetch(`http://localhost:3000/favorites/`)
.then(res=>res.json())
.then(data=>{
    data.forEach(element => {
        js_images.innerHTML+=`
        <div class="img-1">
                <div class="img-class">
                <img src="${element.img}" alt="">
                </div>
                <h1>"${element.name}"</h1>
                <p>"${element.description}"</p>
                <button onclick="deleteBtn(${element.id})">Delete</button>
            </div>
        `
    });
})

function deleteBtn(id){
    axios.delete(`http://localhost:3000/favorites/${id}`)
    window.location.reload()
}
const simple=document.querySelector(".simple")
simple.addEventListener("click",()=>{
    window.location="index.html?id"
})