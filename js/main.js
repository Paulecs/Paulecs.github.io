let amount = document.querySelector("#amount");
  	let fromCurrency = document.querySelector("#fromCurrency");
  	let toCurrency = document.querySelector("#toCurrency");
  	let btnConvert = document.querySelector('#convert');

  	let url = 'https://free.currencyconverterapi.com/api/v5/currencies';

  	 fetch( url,{ method : "GET"})
			.then( function(response){ 
				return response.json();
			})
			.then( function(results){
				for(let result in results){
                  for(let id in results[result]){
                  	let optionA = `
                      <option value="${results[result][id]['id']}">
                         ${results[result][id]['currencyName']} (${results[result][id]['id']})
                      </option>
                  	`;
                  	let optionB = `
                      <option value="${results[result][id]['id']}">
                         ${results[result][id]['currencyName']} (${results[result][id]['id']})
                      </option>
                  	`;
                     fromCurrency.innerHTML += optionA;
                     toCurrency.innerHTML += optionB;
                 }
               }
			})
			.catch( function(error){
				console.log(error);
			});

function parseJSON(res){
  return res.json()
}		
//   *****************************************//

$("#convert").on("click", () => {
  const amount1 = $('#amount').val();
  const From = $('#fromCurrency option:selected').val();
  const To = $('#toCurrency option:selected').val(); 
  const query = `${From}_${To}`;
  const queryUrl = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`; 
  fetch(queryUrl)
    .then(parseJSON)
    .then(parsedData => {
      for(let rate in parsedData){
         let calc = (parsedData[rate].val); 
      let total = (Number(amount1) * calc);
      $('#output').val(Math.round(total * 100) / 100);
        
      }
    })
});