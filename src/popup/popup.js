// Add an event listener to the export button
document.getElementById("exportButton").addEventListener("click", exportBookmarks);

// Function to export bookmarks
function exportBookmarks() {
  // Send a message to the background script to fetch bookmarks
  chrome.runtime.sendMessage({ action: 'exportBookmarks' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error fetching bookmarks:", chrome.runtime.lastError);
      return;
    }
    const bookmarkTree = response.bookmarkTree;
    // Convert the bookmark tree to JSON format
    const bookmarksJson = JSON.stringify(bookmarkTree, null, 2);
    // Trigger a download of the JSON data
    downloadJson(bookmarksJson, "bookmarks.json");
  });
}

// Function to download JSON data as a file
function downloadJson(data, filename) {
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

