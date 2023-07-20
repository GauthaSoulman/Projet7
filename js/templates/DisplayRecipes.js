class DisplayRecipes {
    constructor($wrapperRecipes, filters, $wrapperRecipesCount) {
      this._$wrapperRecipes = $wrapperRecipes;
      this._$wrapperRecipesCount = $wrapperRecipesCount;
      this._filters = filters;
    }
  
    render(recipes, activeFilters = new Map) {
      this._reset()
      const filtersData = this._initializeFilters();
      let recipesCount = 0
  
      if (recipes instanceof Map) {
        recipesCount = recipes.size
      } else if (recipes instanceof Array) {
        recipesCount = recipes.length
      } else {
        throw new Error(`recipes must be a map or an array`)
      }
  
      // Is there any recipes to display ?
      if (recipesCount > 0) {
        recipes.forEach(recipe => {
          const template = new RecipeCard(recipe);
          this._$wrapperRecipes.appendChild(template.createRecipeCard());
          this._updateFilters(recipe, filtersData, activeFilters);
        });
      } else {
        this._errorMsg()
      }
  
      const ghost = document.createElement('article')
      this._$wrapperRecipes.appendChild(ghost)
  
      this._updateRecipesCount(recipesCount);
  
      this._filters.update(filtersData);
    }
  

    // Recipes not found
    _errorMsg() {
      const errorMsg = `
        <p class="col-12 fs-18 fw-bold text-center"> Aucun recette ne correspond à votre recherche... vous pouvez chercher « tarte aux pommes », « poisson », etc. </p>
      `
      this._$wrapperRecipes.innerHTML = errorMsg;
    }
  
    _reset() {
      this._$wrapperRecipes.innerHTML = "";
    }
  
    _updateRecipesCount(recipesCount) {
      console.log(`recipesCount : ${recipesCount}`);
      this._$wrapperRecipesCount.innerHTML = `${recipesCount < 10 ? `0${recipesCount}` : `${recipesCount}`} ${recipesCount > 0 ? "recettes" : "recette"}`;
    }
  
    _initializeFilters() {
      return {
        ingredients: [],
        appliances: [],
        ustensils: []
      };
    }
  
    // display all the filters available without the ones already selected
    _updateFilters(recipe, filtersData, activeFilters) {
      recipe.ingredients.forEach(ingredient => {
        if (!activeFilters.has(ingredient.capitalizeName) && !filtersData.ingredients.includes(ingredient.capitalizeName)) {
          filtersData.ingredients.push(ingredient.capitalizeName);
        }
      })
  
      if (!activeFilters.has(recipe.capitalizeAppliance) && !filtersData.appliances.includes(recipe.capitalizeAppliance)) {
        filtersData.appliances.push(recipe.capitalizeAppliance);
      }
  
      recipe.capitalizeUstensils.forEach(ustensil => {
        if (!activeFilters.has(ustensil) && !filtersData.ustensils.includes(ustensil)) {
          filtersData.ustensils.push(ustensil);
        }
      });
    }
  }
  