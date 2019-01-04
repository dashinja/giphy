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

  const apiKey = 'BaQP9zdxQzj0WoZ5JfWm92wsN34uwwNI';
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
      console.log(res);
      // let body = res.json
      // console.log(body);
      // return body
      $('#insert-giphy').empty();
      for (let i = 0; i < topics.length; i++) {
        let fixed_height_still_url = res.data[i].images.fixed_height_still.url;
        let animated_url = res.data[i].images.looping.mp4;

        let imgHolder = $('<img>');

        imgHolder.attr('data-imageType', fixed_height_still_url);
        // let makeMove = imgHolder.attr("data-imageType", fixed_height_still_url)

        imgHolder.attr('src', fixed_height_still_url);
        imgHolder.attr('data-state', 'still');
        imgHolder.attr('data-still', fixed_height_still_url);
        imgHolder.attr('data-animate', animated_url);
        imgHolder.addClass('giphy-image');
        $('#insert-giphy').prepend(imgHolder);
        // $('#insert-giphy').prepend(`<img src="${fixed_height_still_url}">`);


        
      }
    });
  };

  function AnimateOrNot () {
        // To Animate or Not to Animate
        console.log('I exist already and I got clicked!');
        let state = $(this).attr('data-state');
        if (state === 'still') {
          imgHolder.attr('src', animated_url);
          $(this).attr('data-state', 'animated');
        } else if (state === 'animated') {
          imgHolder.attr('src', fixed_height_still_url);
          $(this).attr('data-state', 'still');
        } else {
          alert('You messed up bad!');
        }
  }
  // When specific image is clicked, make animate, or stop animation
  // $('.giphies').on('click', 'giphy-image', function() {
  //   // let gifInQuestion = $(this).("data-imageType")

  //   // To Animate or Not to Animate
  //   console.log('I exist already and I got clicked!');
  //   let state = $(this).attr('data-state');
  //   if (state === 'still') {
  //     imgHolder.attr('src', animated_url);
  //     $(this).attr('data-state', 'animated');
  //   } else if (state === 'animated') {
  //     imgHolder.attr('src', fixed_height_still_url);
  //     $(this).attr('data-state', 'still');
  //   } else {
  //     alert('You messed up bad!');
  //   }
  // });

  show10();
  // .then(function (body) {
  //   console.log(body);

  // })

  $('.clickMon').on('click', '.button-topic', show10);
  $('.clickMon').on('click', '.giphy-image', AnimateOrNot);

  buttonRender();
});
