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
      <h3>${name}</h3>
      <h4>${baseExperience}</h4>
    `)
  })
}


