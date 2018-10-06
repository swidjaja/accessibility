var tabsList = document.querySelector('.tabs-list');
var tabs = tabsList.querySelectorAll('.tab');
var activeTab = null;

tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    if (!activeTab || (activeTab && activeTab !== tab)) {
      if (activeTab) {
        activeTab.removeAttribute('aria-selected');
      }
      tab.setAttribute('aria-selected', true);
      activeTab = tab;
      console.error('TAB SELECTED = ', tab.innerHTML);
    } else if (activeTab === tab) {
      // Do nothing
    }
  });
});
