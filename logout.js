// logout
//þetta er takkinn til þess að skrá sig út úr CMS kerfinu og fara til baka í Vefverslun 
// const logout til að sækja hnappinn i HTML 
const logout = document.querySelector('#logout');
// setjum eventlistener til að hann virki þegar á hann er smellt
logout.addEventListener('click', (e) => {
 // firebase sér um að logga út út með auth. og glugginn fer yfir í vefverslun. 
  auth.signOut().then(() => {
    console.log('user signed out');
    window.location.replace("../frontend/index.html");
  })
});