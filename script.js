
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#pokemon-search");

const message = document.querySelector("#message");
const pokemonCard = document.querySelector("#pokemon-card");

const pokemonName = document.querySelector("#pokemon-name");
const pokemonImage = document.querySelector("#pokemon-image");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonType = document.querySelector("#pokemon-type");
const pokemonHeight = document.querySelector("#pokemon-height");
const pokemonWeight = document.querySelector("#pokemon-weight");
const pokemonAbilities = document.querySelector("#pokemon-abilities");

// Listen for the search form submission
searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        message.textContent = "Please enter a Pokémon name or ID.";
        return;
    }

    getPokemon(searchTerm);

});

// Retrieve Pokémon information from the API
async function getPokemon(name) {

    message.textContent = "Loading Pokémon information...";
    pokemonCard.hidden = true;

    try {

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`
        );

        if (!response.ok) {
            throw new Error("Pokémon not found.");
        }

        const data = await response.json();

        // Display Pokémon information
        pokemonName.textContent =
            data.name.charAt(0).toUpperCase() + data.name.slice(1);

        pokemonImage.src = data.sprites.front_default;
        pokemonImage.alt = `Image of ${data.name}`;

        pokemonId.textContent = `Pokédex Number: #${data.id}`;

        pokemonType.textContent =
            "Type: " + data.types.map(item => item.type.name).join(", ");

        pokemonHeight.textContent =
            `Height: ${data.height / 10} meters`;

        pokemonWeight.textContent =
            `Weight: ${data.weight / 10} kilograms`;

        pokemonAbilities.textContent =
            "Abilities: " +
            data.abilities.map(item => item.ability.name).join(", ");

        message.textContent = "Pokémon found!";

        pokemonCard.hidden = false;

    } catch (error) {

        message.textContent =
            "Pokémon not found. Please check the spelling and try again.";

        console.error(error);

    }

}
