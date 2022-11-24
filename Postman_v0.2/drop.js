import users from './test/gb.json' assert{type:'json'};
// console.log(users)

const inputE1 = document.querySelector("#autocomplete-input");
inputE1.addEventListener("input",onInputChange);
let cityName = [];

cityName = users.map((name) =>
{
    return name.city;
});

// console.log(cityName);
function onInputChange()
{
    removeAutocompleteDropdown();

    const value = inputE1.value.toLowerCase();

    if(value.length === 0) return;

    const filteredName = [];

    cityName.forEach((cityName) =>
    {
        if (cityName.substr(0,value.length).toLowerCase() === value)
        filteredName.push(cityName);
    });
    createAutocompleteDropdown(filteredName);
}

function createAutocompleteDropdown(list)
{
    
    const listE1 = document.createElement("ul");
    listE1.className = "autocomplete-list";
    listE1.id = "autocomplete-list";

    list.forEach((name) =>
    {
        const listItem = document.createElement("li");
        const cityButton = document.createElement("button");
        cityButton.innerHTML = name;
        cityButton.addEventListener("click", onCityButtonClick);
        listItem.appendChild(cityButton);

        listE1.appendChild(listItem);
    });

    document.querySelector("#autocomplete-wrapper").appendChild(listE1);
}

function removeAutocompleteDropdown()
{
    const listE1 = document.querySelector("#autocomplete-list");
    if (listE1) listE1.remove();
}

function onCityButtonClick(event)
{
    event.preventDefault();
    const buttonE1 = event.target;
    inputE1.value = buttonE1.innerHTML;
    removeAutocompleteDropdown();
}