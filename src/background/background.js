// Background service worker script

console.log('background is running');

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'exportBookmarks') {
    // Fetch the bookmark tree
    chrome.bookmarks.getTree((bookmarkTree) => {
      // Send the bookmark data back to the sender
      sendResponse({ bookmarkTree });
    });
    // Return true to indicate that the response will be sent asynchronously
    return true;
  }

  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count);
  }
});
