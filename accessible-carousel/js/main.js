const MAX_ITEMS_PER_VIEWPORT = 3;
const SCROLL_SIZE_PER_PAGE = MAX_ITEMS_PER_VIEWPORT * 100;
const root = document.getElementById('carouselContainer');
const DELTA = 3;
const DELAY_BEFORE_AUTO_FOCUS = 1000; // in ms
const carouselMaxScroll = root.scrollWidth - root.clientWidth;

const options = {
  root,
  rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed 
  // visible amount of item shown in relation to root - 1.0: totally visible, 0: totally gone
  threshold: 1.0,
};

const callback = (changes) => {
  changes.forEach(change => {
    const {
      isIntersecting,
      target,
    } = change;
    if (target) {
      if (isIntersecting) {
        target.removeAttribute('tabIndex');
      } else {
        // target not visible - set to non-tabbable
        target.setAttribute('tabIndex', -1);
      }
    }
  });
};

const inob = new IntersectionObserver(callback, options);

const links = document.querySelectorAll('.carousel--item a');

links.forEach(link => inob.observe(link));

const carouselPrev = document.getElementById('prev');
const carouselNext = document.getElementById('next');

carouselPrev.setAttribute('disabled', 'true');

const updatePrevBtnState = (newScrollLeft) => {
  if (newScrollLeft - DELTA > 0) {
    carouselPrev.removeAttribute('disabled');
  } else {
    carouselPrev.setAttribute('disabled', 'true');
  }
};

const updateNextBtnState = (newScrollLeft) => {
  if (newScrollLeft >= carouselMaxScroll) {
    carouselNext.setAttribute('disabled', 'true');
  } else {
    carouselNext.removeAttribute('disabled');
  }
};

const setFocusToFirstVisibleItem = () => {
  setTimeout(() => {
    const firstVisibleItem = document.querySelector('.carousel--item a:not([tabindex])');
    console.log(firstVisibleItem);
    firstVisibleItem.focus();
  }, DELAY_BEFORE_AUTO_FOCUS);
}

carouselPrev.addEventListener('click', () => {
  const newScrollLeft = root.scrollLeft - SCROLL_SIZE_PER_PAGE;
  root.scrollLeft = newScrollLeft;

  updatePrevBtnState(newScrollLeft);
  updateNextBtnState(newScrollLeft);
  setFocusToFirstVisibleItem();
});

carouselNext.addEventListener('click', () => {
  const newScrollLeft = root.scrollLeft + SCROLL_SIZE_PER_PAGE;
  root.scrollLeft = newScrollLeft;

  updatePrevBtnState(newScrollLeft);
  updateNextBtnState(newScrollLeft);
  setFocusToFirstVisibleItem();
});