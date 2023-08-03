//La classe SearchRecipes gere la recherche de recette, les inputs de l'uitlisateur et les filtre active

class SearchRecipes extends StringUtils {
    constructor(recipesIndex, recipes, version) {
      super()
      this._allRecipes = recipes;
      this._recipesIndex = recipesIndex;
      this._activeFiltersIndex = new Map();
      this._resultMainSearch = [...this._allRecipes.keys()];
      this._version = version;
    }
    //SetupSearchInput gere le input de la recherche principale 
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
    //Appeler quand l'utilisateur selection un filtre dans le dropdown
    searchByFilter(filterType, filter) {
        this._addFilter(filterType, filter)
        this._updateDisplayRecipes() 
    }
 
    // Fonction qui boucle sur tous les recettes pour trouver les recettes corespondant au searchTerm
    _mainSearch(searchTerm) {
      const filteredRecipes = [...this._allRecipes.values()].filter((recipe) => {
        const normalizedSearch = this.normalizeString(searchTerm);
        if (
          recipe.normalizeName.includes(normalizedSearch) ||
          recipe.normalizeDescription.includes(normalizedSearch)
        ) {
          return true;
        }
  

      }
    );

    return filteredRecipes.map((recipe) => recipe.id);
  }
    
  



    
    // Ajouter nouveau filtre a _activeFiltersIndex et met a jour l'affichage des recette
    _addFilter(filterType, filter) {
      this._activeFiltersIndex.set(filter, filterType)
    }
    

    //Supprimer le diltre  a activeFiltersIndex et met a jour l'affichage des recette
    removeFilter(filter) {
      this._activeFiltersIndex.delete(filter)
      this._updateDisplayRecipes()
    }
  

    //Met a jour  les recettes affiché a partir de l'input et des filtres actives
    _updateDisplayRecipes() {
      const recipesFromIds = (recipesIds) => {
        return recipesIds.map((id) => this._allRecipes.get(id));
      }
  
      const recipesIds = this._getRecipesFiltered()
  
      this._version === 1 ? this._displayRecipe.renderV1(recipesFromIds(recipesIds), this._activeFiltersIndex) :
      this._displayRecipe.render(recipesFromIds(recipesIds), this._activeFiltersIndex)
    }
  
    // Retourne tous les id qui match  avec la recherche principale et les filtres active
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
  
