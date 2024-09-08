const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const searchBar = document.querySelector(".search-bar"); 
let URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemon = []; // Para almacenar todos los Pokémon
let filteredPokemon = []; // Para los Pokémon filtrados

// Cargar todos los Pokémon
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            allPokemon.push(data); 
            mostrarPokemon(data); 
        });
}

// Función para mostrar un Pokémon en la lista
function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');
    
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${poke.id}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

// Filtros por tipo con botones de encabezado
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            });
    }
}));

// Funcionalidad de la barra de búsqueda
searchBar.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase(); 

    listaPokemon.innerHTML = ""; 
   
    filteredPokemon = allPokemon.filter(poke => poke.name.toLowerCase().includes(searchTerm));
    
    filteredPokemon.forEach(poke => mostrarPokemon(poke));
});
