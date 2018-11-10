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
  selectedItem: null,

  init(toggleButtonEl, itemsListEl) {
    this._toggleButtonEl = toggleButtonEl;
    this._itemsListEl = itemsListEl;

    this.initSelectedItem();
    this.setItemToFocus();

    this.setupListeners();
  },

  initSelectedItem() {
    const itemsList = this._itemsListEl;
    const itemsListOptions = itemsList.querySelectorAll('li[role="option"]');

    this.selectedItem = itemsListOptions[0];
    this.selectedItem.classList.add('selected');
    this.selectedItem.setAttribute('aria-selected', 'true');
    this.setToggleButtonLabel(this.selectedItem);
  },

  setItemToFocus() {
    const itemsList = this._itemsListEl;
  
    itemsList.setAttribute('aria-activedescendant', this.selectedItem.id);
    this.selectedItem.classList.add('focused');
  },

  getSelectedItemValue() {
    return (this.selectedItem && this.selectedItem.innerHTML) || '';
  },

  getActiveDescendant() {
    const itemsList = this._itemsListEl;
    const activeDescendant = itemsList.getAttribute('aria-activedescendant');

    return itemsList.querySelector('#' + activeDescendant);
  },

  setToggleButtonLabel(selectedItem) {
    this._toggleButtonEl.innerHTML = selectedItem.innerHTML;
  },

  focusOnActiveDescendant() {
    const activeElement = this.getActiveDescendant();

    activeElement.classList.add('focused');
  },

  updateFocusedEl(activeElement, nextActiveElement) {
    if (activeElement && nextActiveElement) {
      const itemsList = this._itemsListEl;
      const toggleButton = this._toggleButtonEl;

      activeElement.classList.remove('focused');
      nextActiveElement.classList.add('focused');

      itemsList.setAttribute('aria-activedescendant', nextActiveElement.id);
    }
  },

  updateSelectedItem() {
    const activeElement = this.getActiveDescendant();

    this.selectedItem.classList.remove('selected');
    this.selectedItem.removeAttribute('aria-selected');
  
    this.selectedItem = activeElement;
  
    this.selectedItem.classList.add('selected');
    this.selectedItem.setAttribute('aria-selected', 'true');
  
    this.setToggleButtonLabel(this.selectedItem);

    console.log('Current selected item - ', this.getSelectedItemValue());
  },

  updateScrollPosition() {
    const itemsList = this._itemsListEl;
    const activeDescendant = itemsList.getAttribute('aria-activedescendant');
    const activeElement = itemsList.querySelector('#' + activeDescendant);
    const itemsListHeight = itemsList.clientHeight;
    const itemsListScrollTop = itemsList.scrollTop;
    const activeElementOffsetTop = activeElement.offsetTop;

    if (itemsList.scrollHeight > itemsListHeight) {
      const scrollBottom = itemsListHeight + itemsListScrollTop;
      const elementBottom = activeElementOffsetTop + activeElement.offsetHeight;
      if (elementBottom > scrollBottom) {
        itemsList.scrollTop = elementBottom - itemsListHeight;
      }
      else if (activeElement.offsetTop < itemsListScrollTop) {
        itemsList.scrollTop = activeElementOffsetTop;
      }
    }
  },

  setupListeners() {
    const toggleButton = this._toggleButtonEl;
    const itemsList = this._itemsListEl;

    toggleButton.addEventListener('click', () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded');
      if (!isExpanded || isExpanded === 'false') {
        this.setItemToFocus();
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

      if (keyCode === this._keyCodes.UP_ARROW || keyCode === this._keyCodes.DOWN_ARROW) {
        event.preventDefault();
        const nextActiveElement = (keyCode === this._keyCodes.UP_ARROW) ?
          activeElement.previousElementSibling :
          activeElement.nextElementSibling;
        this.updateFocusedEl(activeElement, nextActiveElement);
        this.updateScrollPosition();
      } else if (keyCode === this._keyCodes.ENTER || keyCode === this._keyCodes.ESC) {
        event.preventDefault();
        toggleButton.setAttribute('aria-expanded', false);
        itemsList.classList.add('hide');
        itemsList.removeAttribute('tabindex');

        if (keyCode === this._keyCodes.ENTER) {
          this.updateSelectedItem();
        }

        // return focus to button
        toggleButton.focus();              
      }
    });
  }
};

const toggleButton = document.querySelector('.toggle-button');
const itemsList = document.querySelector('.items-list');

window.sw.a11y.CollapsableList.init(toggleButton, itemsList);
