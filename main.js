//til að tengja firebase við skjalið
//sýna script tög í HTML skjali 

const db = firebase.firestore();
const auth = firebase.auth();

//þetta er HTML-element tenging 
const mainDiv = document.querySelector('.container');
const searchBtn = document.querySelector('#searchBtn');

// clickevent á leitartakkann í CMS kerfinu

searchBtn.addEventListener("click", () => {
    // breyta búin til fyrir leitarorðið og niðurstöður birtar á localhost og um leið breytt í JSON skrá 
    const keyword = document.querySelector("#search").value;
    //beintengt í index.js línu 17, þar sem req.query.plant kemur fyrir. 
    //Jóna skrifar Orchid, orchid verður search.value og keyword. og req.query.plant er beiðni frá Jónu yfir í Apann um upplýsingar  frá keyword.
    fetch("http://localhost:3000/plants?plant=" + keyword)
        .then(r => r.json())
        .then(data => {    
     //breytan promises fer í gegnum linkana í apanum til að fá myndirnar og breytir svo niðurstöðum í JSON.
     // data eru array úr apanum á JSON formi, en linkarnir eru ekki orðnir JSON svo það þarf að breyta þeim í JSON hér.       
            const promises = data.map(r =>{                
                return fetch("http://localhost:3000/images?link=" + r.link)
                .then(r => r.json())
            })
            //Promise lofar að keyra kóðann sem sýnir allar niðurstöður þegar búið er að fá svar frá öllum 30 promises 
            return Promise.all(promises).then(arr => {
                return {
                    // property af objecti
                    data:data, //comName sciName 
                    arr:arr     // image 
                }
            })
        })
        //þegar allt er reddí þá eru upplýsingarnar settar inn í card, 
        .then(all => {
            const data = all.data; //comName sciName 
            const arr = all.arr;   // image 
            //sett inn í template literals, sem fer beint inn í HTML og skilar út kortinu þar. 
            //Þarf að byrja á að tæma listann sem var fyrir, með þessum gæsalöppunum í línu 42. 
            mainDiv.innerHTML = "";
            // card búið til, -input fields sett á hvert object í niðurstöðum til að senda á birtingarsíðu, 
            //placeholder fyrir upplýsingar úr apa 
            data.forEach((data, i)  => {
             //Fyrir línu 51: ef engin mynd er til staðar [0], þá kemur þessi placeholder-mynd. (?= ternary operator)
             // 
                mainDiv.innerHTML +=
                    `
            <div class="card">
                <div class="sci-img">
                    <img src="${arr[i][0]?arr[i][0].url:"https://image.freepik.com/free-vector/floral-404-error-background_23-2147768652.jpg"}" class="plant-img"/>
                </div>
                <div>
                    <div class="card-input">
                        <h4 class="comName">${data.common_name}</h4>
                        <span class="sciName">${data.scientific_name}</span>
                    </div>
                    <div class="card-input">
                        <label for="info">Description:</label>
                        <input class="info" type="textarea"/>
                        <label for="price">Price:</label>
                        <input class="price" type="number">
                    </div>
                    <div id="img-input" class="card-input">
                        <label for="img">Image link:</label>
                        <input class="plant-image" type="text">
                    </div>
                </div>
                <button class="sendBtn">Send</button>
                
            </div>
            `
            })
        })
        // þegar cardið er komið inn í CMS kerfið, búið að fylla úr upplýsingar þá er hér ýtt á sendBtn 
        //
        .then(array => {
            const sendBtn = document.getElementsByClassName('sendBtn');
            // Hér þarf að forloop-a í gegnum öll spjöldin til að gefa hverju spjaldi auðkenni 
            // "click" er á hverjum takka til að senda inn. 
            //e.target.parentElement divið sem er parent utan um button er divið sem heldur utan um card-ið. 
            // 'e' er sett á til að vita hvaða takka er ýtt á / þ.a.l. rétt card sett inn. 
            for (i = 0; i < sendBtn.length; i++) {
                sendBtn[i].onclick = (e) => {
                    let comName = e.target.parentElement.querySelector('.comName').innerHTML;
                    let sciName = e.target.parentElement.querySelector('.sciName').innerHTML;
                    let inputInfo = e.target.parentElement.querySelector('.info').value;
                    let inputPrice = e.target.parentElement.querySelector('.price').value;
                    let image = e.target.parentElement.querySelector('.plant-image').value;
                   
                    // db er database inni í firestore og þetta function setur upplýsingarnar einnig inn í firebase
                    db.collection("plants").doc(comName).set({
                        // set er function sem tekur inn parameter. milli lína 96-100 er einn object. 
                       // name er property og comName er value af því. ( eins og var = value )
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






