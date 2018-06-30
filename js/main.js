const currencies_url = 'https:/free.currencyconverterapi.com/api/v5/currencies';
fetch(currencies_url).then(response =>{
    if(response.staus!== 200){
        console.log("App not responding correctly"+response.status);
    return;
    }
    response.json().then(currencies =>{
        console.log(currencies);
        let currencyFrom = document.getElementById('currency-from');
        let currencyTo = getElementById('currency-to');
        for (const currency of currencies){
            for (const id in currencies[currency]){
                currencyFrom.innerHTML += `<option value="${currencies[currency][id].id}"> ${currencies[currency][id].id}`
                currencyTo.innerHTML +=`<option value="${currencies[currency][id].id}"> ${currencies[currency][id].id}`
            }
        }
    })
})