self.addEventListener('install', function(){
});
self.addEventListener('fetch', function(){
console.log(event.request);
});