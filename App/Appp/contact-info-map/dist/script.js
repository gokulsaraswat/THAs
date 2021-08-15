const mySelect = document.querySelector('.form-select'),
storesArticle = document.getElementsByClassName('stores-map');

mySelect.addEventListener("change", changeFunction);

function changeFunction(){
    const idStore = "store_"+mySelect.value;
    const findIdStore = document.getElementById(idStore);
    var allStores = document.querySelectorAll('.stores-map__main');

    allStores = Array.from(allStores);
    allStores.forEach(function (store) {
        store.style.display="none"
    });

    findIdStore.style.display = "block";


}