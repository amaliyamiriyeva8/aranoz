const form=document.querySelector("form")
const image_add=document.querySelector("#image-add")
const file_choose=document.querySelector("#file-choose")
const name=document.querySelector("#name")
const description=document.querySelector("#description")
const input=document.querySelector('input[type="file"]')
input.addEventListener("input",(e)=>{
    let file=e.target.files[0]
    if(file){
        let readElement=new FileReader()
        readElement.readAsDataURL(file)
        readElement.onload=()=>{
            image_add.src=readElement.result;
            image_add.style.width="70px";
            image_add.style.height="70px"
        }
    }
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let obj={}
    let src=file_choose.files[0]
    const readElement=new FileReader()
    readElement.readAsDataURL(src)
    window.location="index.html"
    readElement.onload=(e)=>{
        obj={
        img:e.target.result,
        name:name.value,
        description:description.value,
        }
        axios.post(`http://localhost:3000/aranoz/`,obj)
}
})