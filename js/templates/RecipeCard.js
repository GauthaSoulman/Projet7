class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe;
    }

    createRecipeCard() {
        const $wrapper = document.createElement('article');
        $wrapper.classList.add('card');
        $wrapper.classList.add('overflow-hidden');
        $wrapper.classList.add('rounded-21');
        $wrapper.classList.add('border-0');
        $wrapper.classList.add('shadow');
        $wrapper.classList.add('px-0');

        $wrapper.style.width = "23.75rem";
        $wrapper.style.height = "45.69rem";

        const ingredients = this._recipe.ingredients.map(ingredient => `
        <div class="col">
            <h4 class="fs-5 fw-500 fs-14">${ingredient.name}</h4>
            <p class="fs-5 text-secondary fs-14">${ingredient.quantity}</p>
        </div>
        `);
        const ingredientsHTML = ingredients.join('');

        const card = `
                <p class="rounded-pill bg-primary p-2 position-absolute top-2 end-5 fs-12">${this._recipe.time}min</p>

                <img src="assets/recette/${this._recipe.image}" class="card-img-top object-fit-cover" style="height: 15.81rem" alt="...">

                    <div class="card-body px-3">
                        <h2 class="card-title font-accent fs-18 mt-4">${this._recipe.name}</h2>

                        <h3 class="text-uppercase fw-bold text-secondary fs-12 mt-4 mb-3">recette</h3>
                        <p class="card-text overflow-hidden fr-14" style="height: 4.75rem">${this._recipe.description}</p>

                        <h3 class="text-uppercase text-secondary fw-bold fs-12 mt-4 mb-3">ingrédients</h3>
                        <div class="row row-cols-2 gy-2">
                            ${ingredientsHTML}
                        </div>
                    </div>
        `

        $wrapper.innerHTML = card;
        return $wrapper;
    }
}