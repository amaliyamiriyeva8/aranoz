let id=new URLSearchParams(window.location.search).get("id");
const js_images=document.querySelector(".images")
fetch(`http://localhost:3000/aranoz/${id}`)
.then(res=>res.json())
.then(element=>{
        js_images.innerHTML+=`
        <div class="img-1">
                <img src="${element.img}" alt="">
                <h1>"${element.name}"</h1>
                <p>"${element.description}"</p>
                <button onclick="Back(${element.id})">Come Back</button>
            </div>
        `
    });
function Back(){
    window.location="index.html"
  
}