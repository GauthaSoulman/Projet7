class Recipe extends StringUtils{
    constructor(data) {
        super()
        this._id = data.id;
        this._image = data.image;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients.map(el => new Ingredient(el));
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
    }

    get id() {
        return this._id;
    }

    get image() {
        return this._image;
    }

    get name() {
        return this._name;
    }

    get normalizeName() {
        return this.normalizeString(this.name)
    }

    get servings() {
        return this._servings;
    }

    get ingredients() {
        return this._ingredients;
    }

    get time () {
        return this._time;
    }

    get description() {
        return this._description;
    }

    get normalizeDescription() {
        return this.normalizeString(this.description)
    }

    get appliance() {
        return this._appliance;
    }

    get normalizeAppliance() {
        return this.normalizeString(this.appliance)
    }

    get capitalizeAppliance() {
        return this.capitalizeString(this.appliance)
    }

    get ustensils() {
        return this._ustensils;
    }

    get normalizeUstensils() {
        const normalizeUstensils = []
        
        this.ustensils.forEach(ustensil => {
            normalizeUstensils.push(this.normalizeString(ustensil))
        });

        return normalizeUstensils;
    }

    get capitalizeUstensils() {
        const capitalizeUstensils = []
        
        this._ustensils.forEach(ustensil => {
            capitalizeUstensils.push(this.capitalizeString(ustensil))
        });

        return capitalizeUstensils;
    }
}