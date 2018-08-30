console.log("axios", axios)

axios.get('https://pokeapi.co/api/v2/pokemon/pikachu')
.then(response => {
  console.log(response.data);
  let name = response.data.name
  let baseExperience = response.data.base_experience
  let picture = response.data.sprites.front_default;

  console.log(name, baseExperience, picture);

  $('.player-1 .pokemon-info').html(`
    <img src="${picture}" />
  `)
  
})
