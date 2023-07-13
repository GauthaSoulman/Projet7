class Filters extends StringUtils {
    constructor(filtersListId, wrapperTagsId, searchRecipes) {
        super();
        this._filtersListId = filtersListId;
        this._$wrapperFiltersList = this._getWrappers();
        this._$wrapperTags = document.querySelector(`#${wrapperTagsId}`);
        this._searchRecipes = searchRecipes;
    }

    _getWrappers() {
        return this._filtersListId.map(id => document.querySelector(`#${id}`));
    }

    update(filtersData) {
        this._$wrapperFiltersList.forEach($wrapperFilter => {
            const filterType = $wrapperFilter.id;

            this._clearFilterAndReset(filtersData[filterType], $wrapperFilter, filterType)
            this._clearInput($wrapperFilter)

            this._setupInputFilter($wrapperFilter, filtersData[filterType], filterType);
        });
    }

    _setupInputFilter($wrapperFilter, filterData, filterTemplate) {
        const input = this._getInput($wrapperFilter);

        input.addEventListener('input', () => {
            const searchValue = input.value.trim();
            if (searchValue === "") {
                this._clearFilterAndReset(filterData, $wrapperFilter, filterTemplate); // display ALL filters available
            } else {
                this._filterAndDisplayMatchingValues(searchValue, filterData, $wrapperFilter, filterTemplate);
            }
        });
    }

    _handleFilterClick(filterTemplate, template) {
        const tagTxt = template.textContent;
        const $wrapper = filterTemplate.createTagCard(tagTxt);

        this._searchRecipes.searchByFilter(filterTemplate.filterType, tagTxt);

        const btnClose = $wrapper.querySelector('button');
        btnClose.addEventListener('click', () => {
            $wrapper.remove();
            this._searchRecipes.removeFilter(tagTxt);
        });

        this._$wrapperTags.appendChild($wrapper);
    }

    _clearFilterAndReset(filterData, $wrapperFilter, filterType) {
        $wrapperFilter.innerHTML = "";

        filterData.forEach(filter => {
            const filterTemplate = new FilterTemplate(filterType, filter);

            const template = filterTemplate.createFilter();
            template.addEventListener('click', () => this._handleFilterClick(filterTemplate, template));

            $wrapperFilter.appendChild(template);
        });
    }

    _filterAndDisplayMatchingValues(searchValue, filterData, $wrapperFilter, filterType) {
        const matchingValues = filterData.filter(filter => {
            const normalizeSearch = this.normalizeString(searchValue);
            return this.normalizeString(filter).includes(normalizeSearch);
        });

        $wrapperFilter.innerHTML = "";
        if (matchingValues.length > 0) {
           this._clearFilterAndReset(matchingValues, $wrapperFilter, filterType)
        } else {
            $wrapperFilter.innerHTML = "Aucune valeur trouvée";
        }
    }

    _clearInput($wrapperFilter) {
        const input = this._getInput($wrapperFilter)
        input.value = ""
    }

    _getInput($wrapperFilter) {
        return $wrapperFilter.parentElement.parentElement.querySelector('input')
    }
}
