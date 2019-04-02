const db = firebase.firestore();

const button = document.querySelector('button');
button.onclick = ()=> {
    let nameValue = document.getElementById('name').value;
    
    console.log(nameValue);
    
    db.collection("plants").doc(nameValue).set({
        name: nameValue
    })
} 
console.log(db.collection("plants"))