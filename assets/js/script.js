const list=document.querySelector("#list")
const list_page=document.querySelector(".list")
let searchInput = document.querySelector("#searchBtn");
let sortBtn = document.querySelector("#sortButton");
let sorted = "descending";
let firstArr = [];
let secondArr = [];


list.addEventListener("click",()=>{
    if(list_page.style.display!="block"){
        list_page.style.display="block"
    }
    else{
        list_page.style.display="none"
    }
})


let page=8;
function loadMore(){
const js_images=document.querySelector(".images")
fetch(`http://localhost:3000/aranoz`)
.then(res=>res.json())
.then(data=>{
    secondArr = data;
   firstArr = firstArr.length || searchInput.value ? firstArr : data;
    axios.get(`http://localhost:3000/favorites`)
    .then(favElements=>{
        firstArr.slice(page-8,page).forEach(element => {
            if(favElements.data.find(f=>f.id===element.id)){
                js_images.innerHTML+=`
             
                <div class="img-1">
                <i class="bi bi-heart-fill" id="favori" style="color:red" onClick='DeleteFav(${element.id})'></i>
                        <div class="img-class">
                        <img src="${element.img}" alt="">
                        </div>
                        <h1>${element.name}</h1>
                        <p>${element.description}</p>
                        <button onclick="detailsBtn(${element.id})">Details</button>
                        <button onclick="deleteBtn(${element.id})">Delete</button>
                        <button onclick="updateBtn(${element.id})">Update</button>
                    </div>
                `
            }
            else{
                js_images.innerHTML+=`
                
                <div class="img-1">
                <i class="bi bi-heart"  id="favori" onClick='AddFav(${element.id})'></i>
                        <div class="img-class">
                        <img src="${element.img}" alt="">
                        </div>
                        <h1>${element.name}</h1>
                        <p>${element.description}</p>
                        <button onclick="detailsBtn(${element.id})">Details</button>
                        <button onclick="deleteBtn(${element.id})">Delete</button>
                        <button onclick="updateBtn(${element.id})">Update</button>
                    </div>
                `
            }
           
        });
    })
   
})
}
loadMore();

searchInput.addEventListener("input", function (e) {
    firstArr =secondArr;
    firstArr = firstArr.filter((element) =>
      element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
   loadMore()
  });
  
  sortBtn.addEventListener("click", function () {
    if (sorted === "ascending") {
      firstArr.sort((a, b) => parseFloat(b.description.replace("$","") - a.description.replace("$","")));
      sorted = "descending";
      sortBtn.innerHTML = "SORT ASC";
    } else if (sorted === "descending") {
      firstArr.sort((a, b) =>  parseFloat(a.description.replace("$","") - b.description.replace("$","")));
      sorted = "def";
      sortBtn.innerHTML = "SORT DSC";
    } else {
      firstArr=secondArr
      sorted = "ascending";
      sortBtn.innerHTML = "SORT";
    }
  loadMore();
  });
  



function detailsBtn(id){
    window.location=`details.html?id=${id}`
}
function deleteBtn(id){
    axios.delete(`http://localhost:3000/aranoz/${id}`)
    window.location.reload()
}

function updateBtn(id){
    window.location=`update.html?id=${id}`
}
const add=document.querySelector("#add")
add.addEventListener("click",()=>{
    window.location="add.html?id"
})


const more=document.querySelector(".more")
more.addEventListener("click",()=>{
    page+=8;
    loadMore()
})

function DeleteFav(id){
    axios.delete(`http://localhost:3000/favorites/${id}`)
}

function AddFav(id){
  fetch(`http://localhost:3000/aranoz/${id}`)
  .then(res=>res.json())
  .then(data=>{
    axios.post(`http://localhost:3000/favorites`,data)
  })
}
const fav=document.querySelector("#fav")
fav.addEventListener("click",()=>{
    window.location="favorite.html"
})

const up=document.querySelector("#up")
up.addEventListener("click",()=>{
  window.scrollTo({
    top:0,
    left:0,
    behavior:"smooth"
  })
})

window.addEventListener("scroll",()=>{
  if(window.scrollY>800){
    up.style.display="block"
  }
  else{
    up.style.display=""
  }
})



