import Search from './models/Search';
import {elements,renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';

const state = {};

//############################################
//------------SEARCH CONTROLLER---------------
//############################################

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

        try{
            //search for recipes
            await state.search.getResults();

            //render results on UI
            clearLoader();
            searchView.renderResults(state.search.result)
        } catch (error ) {
            alert('Something went wrong wit search!');
            clearLoader();
        }

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


});

//############################################
//------------RECIPE CONTROLLER---------------
//############################################

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        //Prepare Ui for changes
        renderLoader(elements.recipe);
        recipeView.clearRecipe();

        //highlight selected item
        
       if(state.search){
        searchView.highlightSelected(id);
       }

        //Create new recipe object
        state.recipe = new Recipe(id);

        try{
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calculate servings and time
            state.recipe.calcCookTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            console.log('Error procesing recipe !');
        }
    }
};


window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

