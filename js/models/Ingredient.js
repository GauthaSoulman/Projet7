class Ingredient extends StringUtils {
    constructor(data) {
        super()
        this._ingredient = data.ingredient;
        this._quantity = data.quantity;
        this._unit = data.unit;
    }

    get name() {
        return this._ingredient;
    }

    get normalizeName() {
        return this.normalizeString(this.name)
    }

    get capitalizeName() {
        return this.capitalizeString(this.name)
    }

    get unit() {
        return !this._unit ? '' : (this._unit === 'grammes' ? 'g' : (this._unit.length > 2 ? ` ${this._unit}` : this._unit)); 
    }

    get quantity() {
        return this._quantity ? `${this._quantity}${this.unit}` : '';
    }

    get hasQuantity() {
        return this._quantity ? true : false;
    }
}