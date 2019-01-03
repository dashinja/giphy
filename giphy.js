'use strict';
$(document).ready(function() {
  let giphyCard = `<div class="card" style="width: 18rem;">
<img class="card-img-top" src=".../100px180/?text=Image cap" alt="Card image cap">
<div class="card-body">
  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
</div>
</div>`;

  let topics = [
    'My Little Pony',
    'Looney Toons',
    'Dota2',
    'Frozen',
    'Board Game',
    'Animaniacs',
    'Dragon Ball Super',
    'Bleach',
    'Naruto',
    'Sword Art Online',
    'Free Ravin',
    'Sponge Bob'
  ];

  let apiKey = 'BaQP9zdxQzj0WoZ5JfWm92wsN34uwwNI';
  let buttonMaker;

  function buttonRender() {
    $('#insert-giphy').empty();

    for (let i = 0; i < topics.length; i++) {
      buttonMaker = $('<button>');
      buttonMaker.addClass('button button-topic');
      buttonMaker.attr('data-name', topics[i]);
      buttonMaker.text(topics[i]);
      $('#insert-buttons').append(buttonMaker);
    }
  }

  let show10 = function() {
    let chosenTopic = $(this).attr('data-name');
    let queryURL10 = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${chosenTopic}&limit=10`;

    $.ajax({
      url: queryURL10,
      method: 'GET'
    }).then(function(res) {
      let body = res.json
      return body
    })
    .then(function (body) {
      console.log(body);

    }) 
    
    ////////////////////////////////////
    /////// fetch way <-- needs fixing////
    /*
  fetch(`${queryURL10}`)
    .then(res => res.json())
    .then(function(res) {
      // console.log(JSON.stringify(res));
    })
    .then(function(res) {
      let body = JSON.stringify(res);
      // console.log(body.images.fixed_height_still.url);
      console.log(body)
      console.log(JSON.stringify(res))
      $('#insert-giphy').html(`<img src= "${body.data[0].url}">`);
    });
}
*/ $(
      '.clickMon'
    ).on('click', '.button-topic', show10);

    buttonRender();
  };

  buttonRender();
});
