$('body').click(() => {
  if (isMobile()) {
    requestFullscreen()
  }
})

let pokemonsOnField = new Array(2)
let nbOfPokeballs = [6,6]

displayNbOfPokeballs()


$('.player-1 button').click(e => {
  e.preventDefault()
  let val = $('.player-1 input').val()
  $('.player-1 input').val('')
  summonPokemon(val, 1)
})

$('.player-2 button').click(e => {
  e.preventDefault()
  let val = $('.player-2 input').val()
  $('.player-2 input').val('')
  summonPokemon(val, 2)
})

function summonPokemon(val, playerNb) {
  $('.winner').html('')
  $(`.player-${playerNb} .pokemon-info`).html(`
    <h3 class="my-5"><img src="images/poke-ball.png"></h3>
  `)

  nbOfPokeballs[playerNb-1]--
  displayNbOfPokeballs()

  
  axios.get('data/pokemon.json')
  .then(response => {
    let pokemon = response.data.find(p => p.species_id === Number(val) || p.identifier === val.toLowerCase().trim())
    console.log('DEBUG pokemon', pokemon);
    if (!pokemon) {
      pokemon = response.data[Math.floor(Math.random() * 718)]
    }
    
    console.log('DEBUG pokemon', pokemon);

    let name = capitalze(pokemon.identifier)
    let baseExperience = pokemon.base_experience
    let picture = `images/pokemons/${pokemon.species_id}.png`
    let life = 100

    pokemonsOnField[playerNb-1] = { name, baseExperience, picture, life }
  
    console.log(name, baseExperience, picture);
    
    setTimeout(() => {
      displayPokemon(playerNb-1)
    }, 2000)
  })
}

$('.fight-button').click(() => {
  if (!pokemonsOnField[0] || !pokemonsOnField[1]) return;

  let intervalId = setInterval(() => {
    let baseExperience1 = pokemonsOnField[0].baseExperience
    let baseExperience2 = pokemonsOnField[1].baseExperience
  
    if (baseExperience1 > 0 && baseExperience2 > 0) {
      let winnerId, loserId;
      if (Math.random() < baseExperience1*baseExperience1 / (baseExperience1*baseExperience1 + baseExperience2*baseExperience2)) {
        winnerId = 0
        loserId = 1
      }
      else {
        winnerId = 1
        loserId = 0
      }
  
      pokemonsOnField[loserId].life -= 10
  
      if (pokemonsOnField[loserId].life > 0) {
        displayPokemon(loserId)
      }
      else {
        displayWinner(winnerId, loserId)
        pokemonsOnField[loserId] = undefined
        displayNbOfPokeballs()
        clearInterval(intervalId)
      }
    }
  }, 200)
})


function displayPokemon(playerId) {
  let { name, picture, baseExperience, life } = pokemonsOnField[playerId]
  $(`.player-${playerId+1} .pokemon-info`).html(`
    <img class="poke-picture" src="${picture}" />
    <h3 class="name">${name}</h3>
    <h4 class="base-experience">${baseExperience}</h4>
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: ${life}%" aria-valuenow="${life}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  `)
}

function displayWinner(winnerId, loserId) {
  let winnerName = pokemonsOnField[winnerId].name

  $('.winner').text('The winner is ' + winnerName)
  $(`.player-${loserId+1} .pokemon-info`).html('')
}

function displayNbOfPokeballs() {
  $('.player-1 .score').html('')
  for (let i = 0; i < nbOfPokeballs[0]; i++) {
    $('.player-1 .score').append(`<img src="images/poke-ball.png">`)
  }

  $('.player-2 .score').html('')
  for (let i = 0; i < nbOfPokeballs[1]; i++) {
    $('.player-2 .score').append(`<img src="images/poke-ball.png">`)
  }
} 