class FilterTemplate {
    constructor(filterType, data) {
        this._filterType = filterType
        this._data = data
    }

    createFilter() {
        const $wrapper = document.createElement('li');
        $wrapper.classList.add('list-group-item');
        $wrapper.classList.add('py-2');
        $wrapper.classList.add('px-1');
        $wrapper.innerText = this._data;

        return $wrapper
    }

    createTagCard() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('col')

        $wrapper.innerHTML = `
            <div class="card">
                <div class="card-body btn btn-primary d-flex align-items-center justify-content-between" style="height: 3.13rem;">
                    ${this._data}            
                    <button type="button" class="btn-close" aria-label="Close"></button>
                </div>
            </div>
        `
        return $wrapper;
    }

    get filterType() {
        return this._filterType
    }

    get name() {
        return this._data
    }
}
