

class App {
    constructor() {
      this.searchInput = document.querySelector('input[name="q"]');
      this.$wrapperRecipes = document.querySelector("#recipes");
      this.$wrapperRecipesCount = document.querySelector('#displayRecipesCount')
      this._filtersListsIds = ['ingredients', 'appliances', 'ustensils']
    }
  
    main() {
      // Contient tout les recettes avec leurs ID
      const recipes = new Map()
  
      recipesData.forEach((recipe) => {
        const recipeInstance = new Recipe(recipe);
        recipes.set(recipeInstance.id, recipeInstance);
      });
  
      // Genere 3 index pour chaque filtre
      const recipesIndex = new RecipesIndex(recipes);
      recipesIndex.init(recipes)
  
      // Systeme de recherche
      const searchRecipes = new SearchRecipes(recipesIndex, recipes)
  
      // Affiche tous les recettes
      const filters = new Filters(this._filtersListsIds, 'tags', searchRecipes)
  
      const displayRecipe = new DisplayRecipes(this.$wrapperRecipes, filters, this.$wrapperRecipesCount)
      displayRecipe.render(recipes)
  
      // Initialisation systeme de recherche
      searchRecipes.setupSearchInput(this.searchInput, displayRecipe)
    }
  }
  
  const app = new App();
  app.main();
  
  