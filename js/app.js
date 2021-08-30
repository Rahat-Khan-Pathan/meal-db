function getInputValue(id) {
  const val = document.getElementById(id).value;
  document.getElementById(id).value = '';
  return val;

}
function showError(errorMessage) {
    document.getElementById('error-message').innerText = errorMessage;
}
function fetchData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.meals))
    .catch(error => {
        setVisible('error-message');
        showError('Network Error!');
      });
}
function displayData(allData) {
    if(allData == null) {
        showError('No Result Found!');
        setVisible('error-message');
    }
    else {
        for(data of allData) {
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `
            <div class="card h-100">
                <img src="${data.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column align-items-center justify-content-center">
                    <h2 class="card-title">${data.strMeal}</h2>
                    <p class="card-text">${data.strInstructions.slice(0,100)}</p>
                    <a href="">Buy Now <i class="fas fa-long-arrow-alt-right"></i></a>
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
    setVisible('spinner');
    setInvisible('error-message');
    setTimeout(() => {
        setInvisible('spinner');
    }, (200));
    const searchText = getInputValue("input-meal");
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    document.getElementById('row').textContent = '';
    fetchData(url);
});
