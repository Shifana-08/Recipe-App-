const apiKey = "77fa2d259592413fa9421c9f6f8cec8f";
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const pastSearchList = document.getElementById("past-search-list");
const favoritesList = document.getElementById("favorites-list");
const mealPlanList = document.getElementById("meal-plan-list");
let pastSearches = [];
let favorites = [];
let mealPlan = [];

function searchRecipes() {
    const query = searchInput.value;
    if (!query) return;
    
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.results);
            savePastSearch(query);
        })
        .catch(error => console.error("Error fetching recipes:", error));
}

function displaySearchResults(results) {
    searchResults.innerHTML = "";
    results.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <br>
            <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
            <button onclick="addToFavorites(${recipe.id}, '${recipe.title}', '${recipe.image}')">Add to Favorites</button>
            <button onclick="addToMealPlan(${recipe.id}, '${recipe.title}', '${recipe.image}')">Add to Meal Plan</button>
        `;
        searchResults.appendChild(recipeCard);
    });
}

function viewRecipe(recipeId) {
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(recipe => {
            window.open(recipe.sourceUrl, "_blank");
        })
        .catch(error => console.error("Error fetching recipe details:", error));
}

function addToFavorites(id, title, image) {
    if (!favorites.some(recipe => recipe.id === id)) {
        favorites.push({ id, title, image });
        updateFavorites();
    }
}

function updateFavorites() {
    favoritesList.innerHTML = favorites.map(recipe => `
        <li>
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
        </li>
    `).join('');
}

function addToMealPlan(id, title, image) {
    if (!mealPlan.some(recipe => recipe.id === id)) {
        mealPlan.push({ id, title, image });
        updateMealPlan();
    }
}

function updateMealPlan() {
    mealPlanList.innerHTML = mealPlan.map(recipe => `
        <li>
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
        </li>
    `).join('');
}

function savePastSearch(query) {
    if (!pastSearches.includes(query)) {
        pastSearches.push(query);
        const listItem = document.createElement("li");
        listItem.innerText = query;
        listItem.onclick = () => {
            searchInput.value = query;
            searchRecipes();
        };
        pastSearchList.appendChild(listItem);
    }
}



