class SearchRecipes extends StringUtils {
    constructor(recipesIndex, recipes, version) {
      super()
      this._allRecipes = recipes;
      this._recipesIndex = recipesIndex;
      this._activeFiltersIndex = new Map();
      this._resultMainSearch = [...this._allRecipes.keys()];
      this._version = version;
    }
  
    setupSearchInput(searchInput, displayRecipe) {
      this._displayRecipe = displayRecipe;
  
      searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.trim();
        
        if (searchValue.length >= 3) {
          this._resultMainSearch = this._mainSearch(searchValue)
          this._updateDisplayRecipes()
        } else if (searchValue == "") {
          this._resultMainSearch = [...this._allRecipes.keys()];
          this._updateDisplayRecipes()
        }      
      });
  
      const searchBtn = searchInput.nextElementSibling.querySelector('button')
  
      searchBtn.addEventListener('click', () => {
        const searchValue = searchInput.value.trim();
        
        if (searchValue != "") {
          this._resultMainSearch = this._mainSearch(searchValue)
          this._updateDisplayRecipes() 
        }
      })
    }
  
    // Apelle les elements du filtre selectionner
    searchByFilter(filterType, filter) {
        this._addFilter(filterType, filter)
        this._updateDisplayRecipes() 
    }
    // Algo 2
    // Retourne L'id corespondant avec le nom,l'ingredient ou la description de tous les recettes
    _mainSearch(searchTerm) {
      const filtredIdRecipes = []
      const normalizedSearch = this.normalizeString(searchTerm)
      const recipes = Array.from(this._allRecipes.values())
  
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
  
        if (recipe.normalizeName.includes(normalizedSearch) ||
          recipe.normalizeDescription.includes(normalizedSearch)
        ) {
          filtredIdRecipes.push(recipe.id)
        } else {
          for (let ingredient of recipe.ingredients) {
            if (ingredient.normalizeName.includes(normalizedSearch)) {
              filtredIdRecipes.push(recipe.id)
            }
          }
        }
      }

      return filtredIdRecipes;
    }
  



    
    // Ajouter nouveau filtre a _activeFiltersIndex
    _addFilter(filterType, filter) {
      this._activeFiltersIndex.set(filter, filterType)
    }
  
    removeFilter(filter) {
      this._activeFiltersIndex.delete(filter)
      this._updateDisplayRecipes()
    }
  
    _updateDisplayRecipes() {
      const recipesFromIds = (recipesIds) => {
        return recipesIds.map((id) => this._allRecipes.get(id));
      }
  
      const recipesIds = this._getRecipesFiltered()
  
      this._version === 1 ? this._displayRecipe.renderV1(recipesFromIds(recipesIds), this._activeFiltersIndex) :
      this._displayRecipe.render(recipesFromIds(recipesIds), this._activeFiltersIndex)
    }
  
    // Retourne tous les id corespondant au filtre
    _getRecipesFiltered() {
      const idsByFilters =  this._idsByFilters()
  
      return idsByFilters.length > 0 ? this._resultMainSearch.filter((value) => idsByFilters.includes(value))
       : this._resultMainSearch
    }
  
    //Fait un tableau des des id des filtres actives
    _idsByFilters() {
      let commonIds = []
      this._activeFiltersIndex.forEach((filterType, filter) => {
        const ids = this._recipesIndex[filterType][this.normalizeString(filter)];
  
        if (commonIds.length === 0) {
          commonIds = ids
        } else {
          commonIds = commonIds.filter(id => ids.includes(id))
        }
      })
      return commonIds
    }
  }
  
