if ('serviceWorker in navigator'){
	navigator.serviceWorker.register('/serviceworker.js').then(function(registration){
	console.log('ServiceWorker registration succeeded:', registration);
	}).catch(function(error){
		console.log('Service Worker registration failed', error);
	});
} else{
		console.log('Service Workers not supported');
	}
	
	if (!navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      indexController._updateReady(reg.waiting);
      return;
    }

    if (reg.installing) {
      indexController._trackInstalling(reg.installing);
      return;
    }

    reg.addEventListener('updatefound', function() {
      indexController._trackInstalling(reg.installing);
    });
  });

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload".
  var refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
};