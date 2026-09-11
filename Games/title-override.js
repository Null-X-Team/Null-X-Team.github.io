// title-override.js
// This script overrides ALL page titles to "NullEducation"
// Place this in the Games folder and include it in all game index.html files

// Force title to NullEducation
document.title = "NullEducation";

// Block any scripts from changing the title
Object.defineProperty(document, 'title', {
  value: 'NullEducation',
  writable: false,
  configurable: false
});

// Also block common ways games try to change the title
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      const titleTag = document.querySelector('title');
      if (titleTag && titleTag.textContent !== 'NullEducation') {
        titleTag.textContent = 'NullEducation';
      }
    }
  });
});

const titleTag = document.querySelector('title');
if (titleTag) {
  observer.observe(titleTag.parentNode, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

// Force it one more time after a slight delay to catch eager scripts
setTimeout(function() {
  document.title = "NullEducation";
  const titleTag = document.querySelector('title');
  if (titleTag) titleTag.textContent = 'NullEducation';
}, 100);
