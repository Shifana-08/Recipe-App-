document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const searchResults = document.getElementById("searchResults");
    const pastSearches = document.getElementById("pastSearches");

    let searchHistory = [];
    const API_KEY = "77fa2d259592413fa9421c9f6f8cec8f";  // Your Spoonacular API Key
    const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            searchHistory.push(query);
            updateSearchHistory();
            fetchRecipes(query);
        }
    });

    function fetchRecipes(query) {
        searchResults.innerHTML = `<p>Fetching recipes for "${query}"...</p>`;
        fetch(`${BASE_URL}?query=${query}&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => displayResults(data.results))
            .catch(error => {
                searchResults.innerHTML = `<p>Error fetching recipes. Please try again.</p>`;
                console.error("Error fetching recipes:", error);
            });
    }

    function displayResults(recipes) {
        searchResults.innerHTML = "";
        if (!recipes || recipes.length === 0) {
            searchResults.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        recipes.forEach(recipe => {
            if (!recipe.id) return;

            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p><a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a></p>
            `;
            searchResults.appendChild(recipeCard);
        });
    }

    function updateSearchHistory() {
        pastSearches.innerHTML = "";
        searchHistory.forEach(search => {
            const li = document.createElement("li");
            li.textContent = search;
            pastSearches.appendChild(li);
        });
    }
});



