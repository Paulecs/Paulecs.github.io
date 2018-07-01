(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){const a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);const f=new Error(`Cannot find module '${o}'`);throw (f.code="MODULE_NOT_FOUND", f)}const l=n[o]={exports:{}};t[o][0].call(l.exports,e => {const n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(let o=0;o<r.length;o++)s(r[o]);return s})({1:[(require, module, exports) => {
  const staticCacheName = 'currency-static-v1';
  const contentImgsCache = 'currency-content-imgs';
  const allCaches = [staticCacheName, contentImgsCache];

  self.addEventListener('install', event => {
    event.waitUntil(caches.open(staticCacheName).then(cache => cache.addAll(['/skeleton', 'js/main.js','js/bootstrap.min.css', 'js/jQuery/jQuery-3.3.1.min.js', 'css/main.css', 'imgs/icon.png', 'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff', 'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff','https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js','js/bootstrap.min.js','https://fonts.googleapis.com/css?family=Work+Sans','https://use.fontawesome.com/releases/v5.1.0/css/all.css'])));
  });

  self.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.filter(cacheName => cacheName.startsWith('currency-') && !allCaches.includes(cacheName)).map(cacheName => caches['delete'](cacheName)))));
  });

  self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
  
    if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        event.respondWith(caches.match('/skeleton'));
        return;
      }
      if (requestUrl.pathname.startsWith('/photos/')) {
        event.respondWith(servePhoto(event.request));
        return;
      }
      // TODO: respond to avatar urls by responding with
      // the return value of serveAvatar(event.request)
    }
  
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
  });

  function serveAvatar(request) {
    // Avatar urls look like:
    // avatars/sam-2x.jpg
    // But storageUrl has the -2x.jpg bit missing.
    // Use this url to store & match the image in the cache.
    // This means you only store one copy of each avatar.
    const storageUrl = request.url.replace(/-\dx\.jpg$/, '');
  
    // TODO: return images from the "wittr-content-imgs" cache
    // if they're in there. But afterwards, go to the network
    // to update the entry in the cache.
    //
    // Note that this is slightly different to servePhoto!
  }

  function servePhoto(request) {
    const storageUrl = request.url.replace(/-\d+px\.jpg$/, '');
  
    return caches.open(contentImgsCache).then(cache => cache.match(storageUrl).then(response => {
      if (response) return response;

      return fetch(request).then(networkResponse => {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    }));
  }

  self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  });
},{}],2:[(require, module, exports) => {
  const r = FetchEvent.prototype.respondWith;
  FetchEvent.prototype.respondWith = function () {
    return new URL(this.request.url).search.endsWith("bypass-sw") ? void 0 : r.apply(this, arguments);
  };
},{}]},{},[1,2])

//# sourceMappingURL=sw.js.map