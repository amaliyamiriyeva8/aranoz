let id=new URLSearchParams(window.location.search).get("id");
const form=document.querySelector("form")
const image_update=document.querySelector("#image-update")
const file_choose=document.querySelector("#file-choose")
const name=document.querySelector("#name")
const description=document.querySelector("#description")
const input=document.querySelector('input[type="file"]')
fetch(`http://localhost:3000/aranoz/${id}`)
.then(res=>res.json())
.then(data=>{
    image_update.src=data.img;
    name.value=data.name;
    description.value=data.description;
    image_update.style.width="70px"
    image_update.style.height="70px"
})
input.addEventListener("input",(e)=>{
   let file=e.target.files[0]
   if(file){
  let readElement=new FileReader();
      readElement.readAsDataURL(file)
      readElement.onload=()=>{
      image_update.src=readElement.result
      }
   }
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    axios.patch(`http://localhost:3000/aranoz/${id}`,{
    img:image_update.src,
    name:name.value,
    description:description.value
    })
    .then(res=>{
        window.location="index.html"
    })
})
