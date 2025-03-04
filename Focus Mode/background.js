function updateRules(urls) {
  chrome.declarativeNetRequest.getDynamicRules((oldRules) => {
    const oldRuleIds = oldRules.map(rule => rule.id);
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: oldRuleIds,
      addRules: urls.map((url, index) => ({
        id: index + 1,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: { url: chrome.runtime.getURL('blocked.html') }
        },
        condition: {
          urlFilter: `*${url}*`,
          resourceTypes: ['main_frame']
        }
      }))
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ blockedUrls: [] }, (data) => {
    updateRules(data.blockedUrls);
  });
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedUrls) {
    updateRules(changes.blockedUrls.newValue);
  }
});
