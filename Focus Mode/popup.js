document.addEventListener('DOMContentLoaded', () => {
  // Load saved URLs from storage
  chrome.storage.local.get({ blockedUrls: [] }, (data) => {
    document.getElementById('urls').value = data.blockedUrls.join('\n');
  });

  // Save button click event
  document.getElementById('save').addEventListener('click', () => {
    const urls = document.getElementById('urls').value
      .split('\n')
      .map(url => url.trim())
      .filter(url => url);

    // Save URLs to storage
    chrome.storage.local.set({ blockedUrls: urls }, () => {
      alert('Settings saved!');
      window.close(); // Close the popup after saving
    });
  });
});
