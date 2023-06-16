chrome.commands.onCommand.addListener((command) => {
    if (command === 'send_url') {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        var url = activeTab.url;
        console.log('Current URL:', url); // print the URL
  
        chrome.storage.sync.get(['bearerToken'], function(result) {
          var bearerToken = result.bearerToken;
  
          fetch('https://api.quivr.app/crawl/?enable_summarization=false', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + bearerToken
            },
            body: JSON.stringify({
              "url": url,
              "js": false,
              "depth": 1,
              "max_pages": 100,
              "max_time": 60
            })
          })
          .then(response => response.json()) // parse the response as JSON
          .then(data => {
            console.log('Response:', data); // print the response
  
            // Create a notification with the response
            chrome.notifications.create({
              type: 'basic',
              iconUrl: 'icon.png',
              title: 'URL Sender',
              message: JSON.stringify(data)
            });
          });
        });
      });
    }
  });