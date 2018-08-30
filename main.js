console.log("axios", axios)

$('.player-1 button').click(e => {
  e.preventDefault()
  let val = $('.player-1 input').val()
  callPokeApi(val, 1)
})

$('.player-2 button').click(e => {
  e.preventDefault()
  let val = $('.player-2 input').val()
  callPokeApi(val, 2)
})

function callPokeApi(val, playerId) {
  axios.get('https://pokeapi.co/api/v2/pokemon/'+val)
  .then(response => {
    console.log(response.data);
    let name = response.data.name
    let baseExperience = response.data.base_experience
    let picture = response.data.sprites.front_default;
  
    console.log(name, baseExperience, picture);
  
    $(`.player-${playerId} .pokemon-info`).html(`
      <img class="poke-picture" src="${picture}" />
      <h3 class="name">${name}</h3>
      <h4 class="base-experience">${baseExperience}</h4>
    `)
  })
}

$('.fight-button').click(() => {
  let baseExperience1 = Number($('.player-1 .base-experience').text())
  let baseExperience2 = Number($('.player-2 .base-experience').text())
  console.log('DEBUG baseExperience1', baseExperience1);
  console.log('DEBUG baseExperience2', baseExperience2);

  if (baseExperience1 > 0 && baseExperience2 > 0) {
    let winnerId, loserId;
    if (Math.random() < baseExperience1 / (baseExperience1 + baseExperience2)) {
      winnerId = 1
      loserId = 2
    }
    else {
      winnerId = 2
      loserId = 1
    }
    let winnerName = $(`.player-${winnerId} .name`).text()

    $('.winner').text('The winner is ' + winnerName)
    $(`.player-${loserId} .pokemon-info`).html('')
  }
})

