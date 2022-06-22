let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  loadToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', function(e){
        // console.log(e.target.name.value)
        addNewToy(e)
        e.preventDefault()
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function loadToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys =>{

    toys.forEach(toy =>{
    const h2 = document.createElement('h2')
    h2.textContent = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    const p = document.createElement('p')
    p.textContent = toy.likes

    const btn = document.createElement('button')
    btn.id = toy.id
    btn.className = 'like-btn'
    btn.innerText = 'like'

    btn.addEventListener('click', (e) => {
      console.log(e.target.previousElementSibling.innerText);
      addLike(e)
    })
    
    let toyCard = document.createElement('div')
    toyCard.className = 'card'
  
    toyCard.append(h2,img, p, btn)
    document.querySelector('#toy-collection').appendChild(toyCard)
    })
  })
}
function addLike(like){
  let newLikes =  parseInt(like.target.previousElementSibling.innerText, 10)+1
  fetch(`http://localhost:3000/toys/${like.target.id}`, {
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body:JSON.stringify({
      'likes':newLikes
    })
  })
  .then(response =>response.json())
  .then(data =>{
    like.target.previousElementSibling.textContent  = data.likes;
  })
  .catch(error =>{
    console.log(error)
  })
}
function addNewToy(e){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Application' : 'application/json'
    },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes" : 0
    })
  })
  .then(response => response.json())
  .then(data=>{
    loadToys()
  })

}