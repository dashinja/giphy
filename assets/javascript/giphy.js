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

  let chosenTopic = $(this).attr('data-name');
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${chosenTopic}&limit=10`;

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

  function show10() {
    let chosenTopic = $(this).attr('data-name');
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${chosenTopic}&limit=10`;
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(res) {
      console.log(res);
      // Keeps graphic section from appending, shows only the most recent result check
      $('#insert-giphy').empty();
      for (let i = 0; i < topics.length; i++) {
        // these images
        let stillImage = res.data[i].images.fixed_height_still.url;
        let animated_url = res.data[i].images.fixed_height.url; //remove me?

        let dataPlace = res.data[i]; // unecessary?

        let imgHolder = $('<img>');

        // imgHolder.attr('data-imageType', stillImage );// remove me?

        imgHolder.attr('src', stillImage);
        imgHolder.attr('data-state', 'still');
        imgHolder.attr('data-still', stillImage);
        imgHolder.attr('data-animate', animated_url);
        imgHolder.attr('data-item', dataPlace);
        console.log(dataPlace);
        imgHolder.addClass('giphy-image');
        $('#insert-giphy').prepend(imgHolder);
        // $('#insert-giphy').prepend(`<img src="${stillImage )">`);
      }

      // let imagePieces
      // // {
      // //   stillImage: stillImage,
      // //   animated_url: animated_url
      // // };

      // return imagePieces = {
      //   stillImage: stillImage,
      //   animated_url: animated_url
      // };
    });
  }

  function AnimateOrNot() {
    // To Animate or Not to Animate
    console.log('I exist already and I got clicked!');
    console.log('First This :', this);
    let state = $(this).attr('data-state');
    console.log(state);
    let stillImage = $(this).attr('data-still');
    let animated_url = $(this).attr('data-animate');
    console.log('Still Image: ', stillImage);
    console.log('Animated Image: ', animated_url);
    if (state === 'still') {
      $(this).attr('src', animated_url);
      $(this).attr('data-state', 'animated');
      console.log("I'm the new source: ", $(this).attr('src'));
    } else if (state === 'animated') {
      $(this).attr('src', stillImage);
      $(this).attr('data-state', 'still');
      console.log("I'm the new source: ", $(this).attr('src'));
    } else {
      alert('You messed up bad!');
    }

    // $.ajax({
    //   url: queryURL,
    //   method: 'GET'
    // }).then(function() {
    //   let state = this;
    //   console.log(state);
    //   let stillImage = res.data[i].images.fixed_height_still.url;
    //   let animated_url = res.data[i].images.fixed_height.url;
    //   console.log(animated_url);
    //   if (state === 'still') {
    //     imgHolder.attr('src', animated_url);
    //     $(this).attr('data-state', 'animated');
    //   } else if (state === 'animated') {
    //     imgHolder.attr('src', stillImage);
    //     $(this).attr('data-state', 'still');
    //   } else {
    //     alert('You messed up bad!');
    //   }
    // });
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
  //     imgHolder.attr('src', stillImage );
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
