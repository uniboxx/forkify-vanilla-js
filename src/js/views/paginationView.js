import View from './View.js';
//- import icons
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );
    const _previousButton = `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
  `;
    const _nextButton = `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  `;

    //- Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return _nextButton;
    }

    //- last page
    if (curPage === numPages && numPages > 1) {
      return _previousButton;
    }
    //- other page
    if (curPage < numPages) {
      return _previousButton + _nextButton;
    }
    //- Page 1, and there are no other pages
    return '';
  }

  _generateMarkupPreview() {
    return `
      
      
    `;
  }
}

export default new PaginationView();
