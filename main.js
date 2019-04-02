const db = firebase.firestore();
const mainDiv = document.querySelector('.container');


const searchBtn = document.querySelector('#searchBtn');
console.log(searchBtn); 
searchBtn.addEventListener("click", ()=> { 
    const keyword = document.querySelector("#search").value;
    fetch("http://localhost:3000/plants?plant=" +keyword)
    .then(r => r.json())
    .then(data=>{
        mainDiv.innerHTML = "";
        data.forEach( data =>{
             
            mainDiv.innerHTML +=
            `
            <div class="card">
                <h2>${data.scientific_name}</h2>
            </div>
            `
        })
    })   
})


// const button = document.querySelector('button');
// button.onclick = ()=> {
//     let nameValue = document.getElementById('name').value;
    
//     console.log(nameValue);
    
//     db.collection("plants").doc(nameValue).set({
//         name: nameValue
//     })
// } 

