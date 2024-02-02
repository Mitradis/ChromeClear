(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/index.tsx.db313a81.js")
    );
  })().catch(console.error);

})();