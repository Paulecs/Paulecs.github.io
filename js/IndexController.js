// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("currency", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("converter", {keyPath: "id"});
    var index = store.createIndex("CurrencyIndex", ["currency.from", "currency.to"]);
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("converter", "readwrite");
    var store = tx.objectStore("converter");
    var index = store.index("CurrencyIndex");

    // Add some data
   
    
    // Query the data
    

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}