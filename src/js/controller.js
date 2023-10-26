//- import MODEL
import * as model from './model.js';

//- imports from config.js
import { MODAL_CLOSE_SEC } from './config.js';

//- import views
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

async function controlRecipes() {
  try {
    //- ottenere l'id dall'hash (da 290)
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    //- renderizzare uno spinner
    recipeView.renderSpinner();

    //- update results view and bookmarks view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //- caricare la ricetta
    await model.loadRecipe(id);

    //- RENDERIZZARE LA RICETTA (288)
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
}

async function controlSearchResults() {
  try {
    //- render spinner
    resultsView.renderSpinner();
    //- ottiene la query di ricerca
    const query = searchView.getQuery();
    if (!query) return;

    //- Carica i risultati di ricerca
    await model.loadSearchResults(query);

    //- Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //- render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
}

function controlPagination(goToPage) {
  //- Render new results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  //- render new pagination buttons
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  //- update le porzioni delle ricetta (in state)
  model.updateServings(newServings);
  //- update la view della ricetta
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe.bookmarked);
  // update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {
  try {
    // console.log(newRecipe);
    //- show loading spinner
    addRecipeView.renderSpinner();

    //- upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //- render recipe
    recipeView.render(model.state.recipe);

    //- success message
    addRecipeView.renderMessage();

    //- render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //- change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //- close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
}

function init() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();

//==========================================================
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

//- L'ARCHITETTURA MVC (291) (teoria)

//- REFACTORING PER MVC (292)

//- HELPERS E FILE DI CONFIGURAZIONE (293)

//- GESTORI DI EVENTI MVC: PATTERN PUBLISHER SUBSCRIBER (294)

//- IMPLEMENTARE MESSAGGI DI ERRORE E SUCCESSO (295)

//- IMPLEMENTARE I RISULTATI DI RICERCA - PARTE 1 (296)

//- IMPLEMENTARE I RISULTATI DI RICERCA - PARTE 2 (297)

//- IMPLEMENTARE LA PAGINAZIONE - PARTE 1 (298)

//- IMPLEMENTARE LA PAGINAZIONE - PARTE 2 (299)

//- PIANIFICAZIONE II DEL PROGETTO (300)

//- AGGIORNARE LE PORZIONI DELLE RICETTE (301)

//- SVILUPPARE UN ALGORITMO DI AGGIORNAMENTO DEL DOM (302)

//- IMPLEMENTARE I SEGNALIBRI - PARTE 1 (303)

//- IMPLEMENTARE I SEGNALIBRI - PARTE 2 (304)

//- STORING BOOKMARKS WITH localStorage (305)

//- PIANIFICAZIONE III DEL PROGETTO (306)

//- CARICARE UNA NUOVA RICETTA - PARTE 1 (307)

//- CARICARE UNA NUOVA RICETTA - PARTE 2 (308)

//- CARICARE UNA NUOVA RICETTA - PARTE 3 (309)

//- WRAPPING UP: FINAL CONSIDERATIONS (310)
