import Search from './models/Search';
import {elements,renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (error) {
            console.log('Error procesing recipe !');
        }
    }
};


window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

//############################################
//--------------LIST CONTROLLER---------------
//############################################

const controlList = () =>{
    if(!state.List) state.list = new List();

    state.recipe.ingredients.forEach(el =>{
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);

        listView.deleteItem(id);
    }else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.val, 10);
        state.list.updateCount(id,val);
    }
});

//############################################
//--------------LIKE CONTROLLER---------------
//############################################

//TESTING


const controlLikes = () =>{
    if(!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;

    if(!state.likes.isLiked(currentID)){
        const newLike = state.likes.addLikes(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        likesView.toggleLikeBtn(true);
        likesView.renderLike(newLike);
        
    }else{

        state.likes.deleteLike(currentID);

        likesView.toggleLikeBtn(false);
        likesView.deleteLike(currentID);
    }
        
    likesView.toggleLikeMenu(state.likes.getNumberLikes());

    
};

window.addEventListener('load', () =>{
    state.likes = new Likes();

    state.likes.readStorage();

    likesView.toggleLikeMenu(state.likes.getNumberLikes());

    state.likes.likes.forEach(like => likesView.renderLike(like));
})


elements.recipe.addEventListener('click', e =>{
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    
    }else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();

    }else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }

});


