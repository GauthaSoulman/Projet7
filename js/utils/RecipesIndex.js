class RecipesIndex {
    constructor(recipes) {
    // Chaque map contient tout les valeurs disponible 
    // et la valeur qui corespond est un tableau de recette (ID) qui est associé a une valeur
        this._ingredients = {}
        this._appliances = {}
        this._ustensils = {}
    }

    init(recipes) {
        const addRef = (id, array, ref) => {

            if (!array[ref]) {
                array[ref] = []
            }
            array[ref].push(id)
        }

        recipes.forEach(recipe => {
            const idRecipe = recipe.id;

            // ingredients Index
            recipe.ingredients.forEach(ingredient => {
                addRef(idRecipe, this._ingredients, ingredient.normalizeName)
            });

            // appliances Index
            addRef(idRecipe, this._appliances, recipe.normalizeAppliance)

            // ustensils Index
            recipe.normalizeUstensils.forEach(ustensil => {
                addRef(idRecipe, this._ustensils, ustensil)
            });
        });
    }

    get ingredients() {
        return this._ingredients;
    }

    get appliances() {
        return this._appliances
    }

    get ustensils() {
        return this._ustensils;
    }
}

