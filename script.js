const pokemonTypeURL = "https://pokeapi.co/api/v2/type/";
const pokemonSearchURL = "https://pokeapi.co/api/v2/pokemon" + "pokemonName";
const filterButton = document.getElementById("filterBtn");
const searchInput = document.getElementById("search");
// window.onload = fetchPokemonsTypes;

const nameURLMap = {};

async function fetchPokemonsTypes() {
  try {
    const response = await fetch(pokemonTypeURL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log(data);

    const selectTag = document.getElementById("pokemon-types");

    for (let i = 0; i < data.results.length; i++) {
      const type = data.results[i];
      const typeURL = type.url;
      const typeName = type.name;
      nameURLMap[typeName] = typeURL;
      const option = document.createElement("option");
      option.innerText = typeName;
      option.setAttribute("value", typeName);
      option.setAttribute("selected-url", typeURL);
      selectTag.appendChild(option);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

var pokemonName = "";
var pokemonBox = "";

async function fetchPokemonOnType() {
  const selectedValue = document.getElementById("pokemon-types").value;
  //   console.log("selectedPokemon : " + nameURLMap[selectedValue]);

  try {
    const response = await fetch(nameURLMap[selectedValue]);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const pokemonsData = data.pokemon;
    const pokemonsListLength =
      pokemonsData.length > 30 ? 30 : pokemonsData.length;
    pokemonBox = document.getElementById("pokemons-list");
    pokemonBox.innerHTML = "";

    for (let i = 0; i < pokemonsListLength; i++) {
      const pokemon = pokemonsData[i].pokemon;
      //   console.log("pokemon : " + JSON.stringify(pokemon));
      pokemonName = pokemon.name;
      //   console.log("pokemonName : " + JSON.stringify(pokemonName));
      const pokemonURL = pokemon.url;
      let imageSrcData = "";

      const image = await fetchPokemonData(pokemonURL);
      const pokemonDiv = document.createElement("div");
      const pokemonFrontPicture = document.createElement("img");
      const pokemonNameSpan = document.createElement("span");

      pokemonFrontPicture.setAttribute("src", image);
      pokemonDiv.classList.add("pokemon-card");
      pokemonNameSpan.innerText = pokemonName;
      pokemonDiv.append(pokemonFrontPicture, pokemonNameSpan);
      pokemonBox.append(pokemonDiv);
    }
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
}

async function fetchPokemonData(pokemonURL) {
  try {
    const response = await fetch(pokemonURL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const imageUrl = data.sprites.front_default;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return "";
  }
}

async function searchPokemonByName() {
  let searchURL = "";
  let pokemonName = searchInput.value;

  if (pokemonName) {
    searchURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  } else if (pokemonType) {
    searchURL = `https://pokeapi.co/api/v2/type/${pokemonType}`;
  } else {
    console.error(
      "Please provide either a Pokemon name or type for the search."
    );
    return;
  }

  try {
    const response = await fetch(searchURL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log(data);
    pokemonBox = document.getElementById("pokemons-list");
    pokemonBox.innerHTML = "";
    const image = await fetchPokemonData(searchURL);
    const pokemonDiv = document.createElement("div");
    const pokemonFrontPicture = document.createElement("img");
    const pokemonNameSpan = document.createElement("span");

    pokemonFrontPicture.setAttribute("src", image);
    pokemonDiv.classList.add("pokemon-card");
    pokemonNameSpan.innerText = pokemonName;
    pokemonDiv.append(pokemonFrontPicture, pokemonNameSpan);
    pokemonBox.append(pokemonDiv);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
}
