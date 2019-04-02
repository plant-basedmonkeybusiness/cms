const db = firebase.firestore();
const mainDiv = document.querySelector('.container');


const searchBtn = document.querySelector('#searchBtn');
console.log(searchBtn);
searchBtn.addEventListener("click", () => {
    const keyword = document.querySelector("#search").value;
    fetch("http://localhost:3000/plants?plant=" + keyword)
        .then(r => r.json())
        .then(data => {
            const promises = data.map(r =>{
                return fetch("http://localhost:3000/images?link=" + r.link)
                .then(r => r.json())
            })
            return Promise.all(promises).then(arr => {
                return {
                    data:data,
                    arr:arr
                }
            })
        })
        .then(all => {
            const data = all.data;
            const arr = all.arr;
            console.log(all)
            mainDiv.innerHTML = "";
            data.forEach((data, i)  => {
                mainDiv.innerHTML +=
                    `
            <div class="card">
                <h2 class="comName">${data.common_name}</h2>
                <span class="sciName">${data.scientific_name}</span>
                <img src="${arr[i][0]?arr[i][0].url:"#"}"/>
                <label for="info">Description</label>
                <input class="info" type="textarea"/>
                <img class="img" src="#"/>
                <label for="price">Price</label>
                <input class="price" type="number">
                <button class="sendBtn">Send</button>
            </div>
            `
            })
        })
        .then(array => {
            const sendBtn = document.getElementsByClassName('sendBtn');
            for (i = 0; i < sendBtn.length; i++) {
                sendBtn[i].onclick = (e) => {
                    let comName = e.target.parentElement.querySelector('.comName').innerHTML;
                    let sciName = e.target.parentElement.querySelector('.sciName').innerHTML;
                    let inputInfo = e.target.parentElement.querySelector('.info').value;
                    let inputPrice = e.target.parentElement.querySelector('.price').value;
                    let image = e.target.parentElement.querySelector('.img').value;


                    db.collection("plants").doc(comName).set({
                        name: comName,
                        sciName: sciName,
                        price: inputPrice,
                        info: inputInfo,
                        image: image
                    })
                }
            }
        })
})






