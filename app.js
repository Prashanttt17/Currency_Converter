// const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://v6.exchangerate-api.com/v6/11a4d90cc6e34d3d5b2fc40a/latest';
// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
// const BASE_URL = "https://cdn.jsdelivr.net/gh/ismartcoding/currency-api@main/latest/data";
// const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_7V6Mxh5BA3nSBulJMldIEF4AWmHAXLpUmIIbWdDj";
// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// const url = 'https://api.exchangerate-api.com/v4/latest/USD';



const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");




// to add all country code in dropdown.
for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = 'selected';
        } 
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (event) => {     
        updateFlag(event.target);
    })
}


// function that update the flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}



//  function for amount section
window.addEventListener('load' , () => {
   preventDefault(); // it stop refreshing page when we click button

});

btn.addEventListener('click' , (evt) => {
    evt.preventDefault(); // it stop refreshing page when we click button
    getExchangeRate();
});




function getExchangeRate() {
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if (amtVal < 1 || amtVal === "") {
        amtVal = 1;
        amount.value = "1";
    }

    let url = `https://v6.exchangerate-api.com/v6/11a4d90cc6e34d3d5b2fc40a/latest/${fromCurr.value}`;
      fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurr.value];
        // console.log(exchangeRate);
        let totalExchangeRate = (amtVal * exchangeRate).toFixed(2);
        // console.log(totalExchange);
        const exchangeRateTxt = document.querySelector(".msg");
        exchangeRateTxt.innerText = `${amtVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
       })
}

// btn.addEventListener('click' , getExchangeRate);