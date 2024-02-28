const app = document.getElementById("app");
let data;
let pokemonImg = "";
let pokemonImgBack = "";
let pokemonType = "";
let PKMNname = "";
let hp = "";
let attack = "";
let defence = "";
let specialAttack = "";
let specialDefence = "";
let speed = "";
async function fetchData() {

try{
    const input = document.getElementById("input");
    const pokemonName = input.value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)


    if (!response.ok) {
        document.querySelector(".error").innerHTML = /*HTML*/`
        <h1>${pokemonName} er ikkje ein pokemon</h1>
    `

        throw new Error ("Could not fetch resource");

    }

    data = await response.json();

    console.log(data);

    //Bilde og type
    PKMNname = "#" + data.id + " " + data.name;
    pokemonImg = "class='image' src=" + data.sprites.front_default;
    pokemonImgBack = "class='image' src=" + data.sprites.back_default;
    pokemonType = "Type: " + data.types[0].type.name;

    //stats
    hp = "HP: " + data.stats[0].base_stat;
    attack = "Attack: " + data.stats[1].base_stat;
    defence = "Defence: " + data.stats[2].base_stat;
    specialAttack = "Sp-Attack: " + data.stats[3].base_stat;
    specialDefence = "Sp-Defence: " + data.stats[4].base_stat;
    speed = "Speed: " + data.stats[5].base_stat;


    if (data.types.length > 1) {
    pokemonType += " & " + data.types[1].type.name;
}

    updateView();
}   

catch(error) {
    console.error(error);
}
}

function updateView() {
    app.innerHTML = /*HTML*/`
    <div class="container">
        <div class="imgContainer">
            <img ${pokemonImg}>
            <img ${pokemonImgBack}>
        </div>
        <div class="name">
            <h3>${PKMNname}</h3>
        </div>
        
        <div class="stats">
            <h3>${pokemonType}</h3>
            <h3>${hp}</h3>
            <h3>${attack}</h3>
            <h3>${defence}</h3>
            <h3>${specialAttack}</h3>
            <h3>${specialDefence}</h3>
            <h3>${speed}</h3>
        </div>
        <div id="søk">
            <input id="input" type="text" placeholder="Pokemon">
            
            <button onclick="fetchData()">Søk</button>
        </div>
        <div class="error"></div>
    </div>
    `
}
updateView();