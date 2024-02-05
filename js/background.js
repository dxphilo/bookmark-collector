
chrome.runtime.onInstalled.addListener(function () {
  console.log('Bookmark Collector installed');
});

// Check if context menu item already exists with the same ID
chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create({
    title: 'Share Link',
    contexts: [
      'page',
      'frame',
      'selection',
      'link',
      'editable',
      'image',
      'video',
      'audio',
      'browser_action',
      'page_action',
    ],
    id: 'performAction',
  });
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId === 'performAction') {
    console.log('info',info)
    console.log('tab',tab)
    const url = tab.url || (info.linkUrl || info.srcUrl || info.pageUrl);
    if (url) {
      await handleShare(url);
    } else {
      console.error('Error: Unable to retrieve the URL.');
    }
  }
});


// Function to handle sharing
async function handleShare(url) {
  try {
    const urlEndpoint = 'https://mio-u5uy.onrender.com/links';
    const res = await fetch(urlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link:url,
      }),
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    console.log('Link shared successfully!');
  } catch (error) {
    console.log('Error sharing the link. Please try again.', error);
  }
}
