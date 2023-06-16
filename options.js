document.getElementById('options-form').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from being submitted normally
    
    var bearerToken = document.getElementById('bearer-token').value;
    
    chrome.storage.sync.set({bearerToken: bearerToken}, function() {
      console.log('Bearer token saved');
    });
  });

  
  