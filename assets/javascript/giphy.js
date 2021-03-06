'use strict'
$(document).ready(function() {
  let giphyCard = `<div class="card" style="width: 18rem;">
<img class="card-img-top" src=".../100px180/?text=Image cap" alt="Card image cap">
<div class="card-body">
  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
</div>
</div>`

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
    'Sponge Bob',
  ]

  const apiKey = 'BaQP9zdxQzj0WoZ5JfWm92wsN34uwwNI'
  let buttonMaker

  let chosenTopic = $(this).attr('data-name')
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${chosenTopic}&limit=10`

  function buttonRender() {
    $('#insert-giphy').empty()

    for (let i = 0; i < topics.length; i++) {
      buttonMaker = $('<button>')
      buttonMaker.addClass('button button-topic btn-primary')
      buttonMaker.attr('data-name', topics[i])
      buttonMaker.text(topics[i])
      $('#insert-buttons').append(buttonMaker)
    }
  }

  function show10(topic = $(this).attr('data-name')) {
    let test = $(this).attr('data-name')

    if (topic) {
      chosenTopic = test
      queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${chosenTopic}&limit=10`
      queryURL = encodeURI(queryURL)
    } else {
      chosenTopic = topic
    }

    // Ajax Request
    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function(res) {
      // Keeps graphic section from appending, shows only the most recent result check
      $('#insert-giphy').empty()
      for (let i = 0; i < topics.length; i++) {
        let stillImage = res.data[i].images.fixed_height_still.url
        let animated_url = res.data[i].images.fixed_height.url

        let container = $('<div>')
        let imgHolder = $('<img>')
        let ratingHolder = $('<p>')
        let title = $('<p>')

        imgHolder.attr('src', stillImage)
        imgHolder.attr('data-state', 'still')
        imgHolder.attr('data-still', stillImage)
        imgHolder.attr('data-animate', animated_url)
        imgHolder.addClass('giphy-image')

        ratingHolder.addClass('rating')
        ratingHolder.html(
          `<strong>Rated:</strong> ${res.data[i].rating.toUpperCase()}`,
        )

        title.addClass('title')
        title.html(`<strong>Title:</strong> ${res.data[i].title}`)

        $('p').addClass('my-0')
        $('p.rating').addClass('mb-4 mt-0')
        $('div.form-holder').addClass('mt-3 mb-5')
        container.append(imgHolder)
        container.append(title)
        container.append(ratingHolder)

        $('#insert-giphy').append(container)
      }
    })
  }

  // To Animate or Not to Animate
  function AnimateOrNot() {
    let state = $(this).attr('data-state')
    let stillImage = $(this).attr('data-still')
    let animated_url = $(this).attr('data-animate')
    if (state === 'still') {
      $(this).attr('src', animated_url)
      $(this).attr('data-state', 'animated')
    } else if (state === 'animated') {
      $(this).attr('src', stillImage)
      $(this).attr('data-state', 'still')
    } else {
      alert('You messed up bad!')
    }
  }

  function addButton(event) {
    // Prevent form from submitting and causing errors
    event.preventDefault()

    // Empty the Gif Stack and Buttons
    $('#insert-giphy').empty()
    $('#insert-buttons').empty()

    let input = $('#input-text').val()
    topics.push(input)
    buttonRender()
    show10(input)
    $('#input-text').val('')
  }
  show10()

  $('.clickMon').on('click', '.button-topic', show10)
  $('.clickMon').on('click', '.giphy-image', AnimateOrNot)
  $('form').on('click', '.submit-button', addButton)
  buttonRender()
})