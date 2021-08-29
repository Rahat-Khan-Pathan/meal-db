function getInputValue(id) {
  const val = document.getElementById(id).value;
  document.getElementById(id).value = '';
  return val;

}
function fetchData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.meals));
}
function displayData(allData) {
    if(allData == null) {
        setVisible('result-message');
    }
    else {
        for(data of allData) {
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `
            <div class="card h-100">
                <img src="${data.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${data.strMeal}</h5>
                <p class="card-text">${data.strInstructions.slice(0,100)}</p>
                </div>
            </div>
            `
            document.getElementById('row').appendChild(col);
        }
    }
}
function setVisible(id) {
    document.getElementById(id).style.display = 'block';
}
function setInvisible(id) {
    document.getElementById(id).style.display = 'none';
}
document.getElementById("button-search").addEventListener("click", function (event) {
    setTimeout(() => {
        setInvisible('spinner');
    }, (200));
    const searchText = getInputValue("input-meal");
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    document.getElementById('row').textContent = '';
    setVisible('spinner');
    setInvisible('result-message');
    fetchData(url);
});
