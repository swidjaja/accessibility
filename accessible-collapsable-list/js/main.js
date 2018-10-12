/**
 * Accessible collapsable dropdown listbox
 * This widget is implemented based on WAI-ARIA 1.1 suggestion.
 * @author  Sugi
 */
window.sw = window.sw || {};
window.sw.a11y = window.sw.a11y || {};

window.sw.a11y.CollapsableList = {
  _toggleButtonEl: null, // Button to show the dropdown
  _itemsListEl: null, // The dropdown element
  _keyCodes: { 
    ENTER: 13,
    ESC: 27,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
  },

  init(toggleButtonEl, itemsListEl) {
    this._toggleButtonEl = toggleButtonEl;
    this._itemsListEl = itemsListEl;

    this.setToggleButtonLabel();
    this.focusOnActiveDescendant();

    this.setupListeners();
  },

  getSelectedOption() {
    const itemsList = this._itemsListEl;
    const activeDescendant = itemsList.getAttribute('aria-activedescendant');
    const activeElement = itemsList.querySelector('#' + activeDescendant);

    return {
      id: activeElement.id,
      value: activeElement.innerHTML
    };
  },

  setToggleButtonLabel() {
    const itemsList = this._itemsListEl;
    const itemsListOptions = itemsList.querySelectorAll('li[role="option"]');

    this._toggleButtonEl.innerHTML = itemsListOptions[0].innerHTML;
  },

  focusOnActiveDescendant() {
    const itemsList = this._itemsListEl;
    const activeDescendant = itemsList.getAttribute('aria-activedescendant');
    const activeElement = itemsList.querySelector('#' + activeDescendant);

    activeElement.classList.add('focused');
  },

  updateSelectedEl(activeElement, nextActiveElement) {
    if (activeElement && nextActiveElement) {
      const itemsList = this._itemsListEl;
      const toggleButton = this._toggleButtonEl;

      activeElement.classList.remove('focused');
      activeElement.removeAttribute('aria-selected');
      nextActiveElement.classList.add('focused');
      nextActiveElement.setAttribute('aria-selected', true);

      itemsList.setAttribute('aria-activedescendant', nextActiveElement.id);
      toggleButton.innerHTML = nextActiveElement.innerHTML;
    }
  },

  setupListeners() {
    const toggleButton = this._toggleButtonEl;
    const itemsList = this._itemsListEl;

    toggleButton.addEventListener('click', () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded');
      if (!isExpanded || isExpanded === 'false') {
        toggleButton.setAttribute('aria-expanded', true);
        itemsList.classList.remove('hide');
        itemsList.setAttribute('tabindex', -1);
        itemsList.focus();
      } else {
        toggleButton.setAttribute('aria-expanded', false);
        itemsList.classList.add('hide');
        itemsList.removeAttribute('tabindex');
      }
    });

    itemsList.addEventListener('keydown', (event) => {
      const keyCode = event.keyCode;
      const activeDescendant = itemsList.getAttribute('aria-activedescendant');
      const activeElement = itemsList.querySelector('#' + activeDescendant);

      if (keyCode === this._keyCodes.LEFT_ARROW || keyCode === this._keyCodes.UP_ARROW) {
        event.preventDefault();
        const nextActiveElement = activeElement.previousElementSibling;
        this.updateSelectedEl(activeElement, nextActiveElement);
      } else if (keyCode === this._keyCodes.RIGHT_ARROW || keyCode === this._keyCodes.DOWN_ARROW) {
        event.preventDefault();
        const nextActiveElement = activeElement.nextElementSibling;
        this.updateSelectedEl(activeElement, nextActiveElement);
      } else if (keyCode === this._keyCodes.ENTER || keyCode === this._keyCodes.ESC) {
        event.preventDefault();
        toggleButton.setAttribute('aria-expanded', false);
        itemsList.classList.add('hide');
        itemsList.removeAttribute('tabindex');

        // return focus to button
        toggleButton.focus();              
      }
    });
  }
};

const toggleButton = document.querySelector('.toggle-button');
const itemsList = document.querySelector('.items-list');

window.sw.a11y.CollapsableList.init(toggleButton, itemsList);
