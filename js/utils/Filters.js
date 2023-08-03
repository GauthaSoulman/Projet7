/* La classe filters gere la fonctionalité du filtre 
filterlistID :Tableau des id des category de filtre
wrapperTagsid:Id du wrapper ou les tag seront ajouté
searchRecipes : l'instance utilisé pour gerer la recherche des recettes

 */

class Filters extends StringUtils {
    constructor(filtersListId, wrapperTagsId, searchRecipes) {
        super();
        this._filtersListId = filtersListId;  
        this._$wrapperFiltersList = this._getWrappers();
        this._$wrapperTags = document.querySelector(`#${wrapperTagsId}`);
        this._searchRecipes = searchRecipes;
    }
    //ID 
    _getWrappers() {
        return this._filtersListId.map(id => document.querySelector(`#${id}`));
    }
    //Met a jour le dropdown des filtres
    update(filtersData) {
        this._$wrapperFiltersList.forEach($wrapperFilter => {
            const filterType = $wrapperFilter.id;

            this._clearFilterAndReset(filtersData[filterType], $wrapperFilter, filterType)
            this._clearInput($wrapperFilter)

            this._setupInputFilter($wrapperFilter, filtersData[filterType], filterType);
        });
    }
    //Met a jour le dopdon des filtres avec l'inputs des utilisateur
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

    //Gere l'evenement du click lorsque l'utilisateur choisi un filtre
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

    //Clear le dropdown du filtre et reset le dropdown
    _clearFilterAndReset(filterData, $wrapperFilter, filterType) {
        $wrapperFilter.innerHTML = "";

        filterData.forEach(filter => {
            const filterTemplate = new FilterTemplate(filterType, filter);

            const template = filterTemplate.createFilter();
            template.addEventListener('click', () => this._handleFilterClick(filterTemplate, template));

            $wrapperFilter.appendChild(template);
        });
    }

    //filtre et affiche les filtre qui match avec l'input de l'utilisateur
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
    //Clear la zone de l'input dand le dropdown
    _clearInput($wrapperFilter) {
        const input = this._getInput($wrapperFilter)
        input.value = ""
    }

    //recupere le input dans le dropdown
    _getInput($wrapperFilter) {
        return $wrapperFilter.parentElement.parentElement.querySelector('input')
    }
}
