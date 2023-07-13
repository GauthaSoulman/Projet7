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
/* 
    createFilterV1() {
        const $wrapper = document.createElement('p')
        $wrapper.innerText = this._data
        
        return $wrapper;
    }
 */
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

/*     createTagCardV1() {
        const $wrapper = document.createElement('article')
        $wrapper.classList.add('card')
        $wrapper.classList.add(`bg-${this._filterType}`)
        $wrapper.classList.add('p-2')
        $wrapper.classList.add('border-0')
        $wrapper.style = "height: 3rem; width: fit-content"

        $wrapper.innerHTML = `
            <div class="card-body d-flex align-items-center fw-14 p-0 justify-content-between text-white">
                ${this._data}
                <i class="fa-regular fw-18 fa-circle-xmark ms-3"></i>
            </div>
        `;

        return $wrapper;
    }
 */
    get filterType() {
        return this._filterType
    }

    get name() {
        return this._data
    }
}
