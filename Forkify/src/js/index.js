<<<<<<< HEAD
import Search from './models/Search';
import {elements,renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';

const state = {};

const controlSearch = async () =>{
    // Get query from view
    const query = searchView.getInput();


    if(query){
        //new search object and add to state
        state.search = new Search(query);
        
        //prepare UI for results
        searchView.clearImput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //search for recipes
        await state.search.getResults();

        //render results on UI
        clearLoader();
        searchView.renderResults(state.search.result)
        

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click',el => {
    const btn = el.target.closest('.btn-inline');

    if(btn){
        const goToPage =parseInt (btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
        
    }


})

const r = new Recipe(47746);
r.getRecipe();
console.log(r);
=======
// Global app controller
>>>>>>> parent of 9b27299... API, Search, pagination
