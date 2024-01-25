const nomePokemon = document.querySelector('.nome__pokemon');
const numeroPokemon = document.querySelector('.numero__pokemon');
const imagemPokemon = document.querySelector('.imagem__pokemon');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const botaoAnterior = document.querySelector('.btn-anterior');
const botaoProximo = document.querySelector('.btn-proximo');

let buscaPokemon = 1; 

const fetchPokemon = async (pokemon) => {
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
  return data;
  }
}

const renderPokemon = async (pokemon) => {

    nomePokemon.innerHTML = 'Procurando...';
    numeroPokemon.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data) {
      imagemPokemon.style.display = 'block';
      nomePokemon.innerHTML = data.name;
      numeroPokemon.innerHTML = data.id;
      imagemPokemon.src = data['sprites'] ['versions'] ['generation-v'] ['black-white'] ['animated'] ['front_default'];
      input.value = '';
      buscaPokemon = data.id;
    } else {
      imagemPokemon.style.display = 'none';
      nomePokemon.innerHTML = ' Não existe :c';
      numeroPokemon.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

renderPokemon(buscaPokemon);

botaoAnterior.addEventListener('click', () => {
  if (buscaPokemon > 1) {
    buscaPokemon -= 1;
  renderPokemon(buscaPokemon);
  }
});

  botaoProximo.addEventListener('click', () => {
    buscaPokemon += 1;
    renderPokemon(buscaPokemon);
});