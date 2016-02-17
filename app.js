$('form').submit(function(e) {
  e.preventDefault();
  $('.heading').animate({marginTop: 0}, 400);
  $('#images').html('');
  fadeItemsIn();
  getWeather($('#zip').val());
});

function getWeather(zip) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&appid=eab260afa740611a83695f60bf70dd5c';
  $.getJSON(url)
    .done(function(data){
      $('#weatherResult').text(data.weather[0].main);
      $('#icon').attr('src', 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png');
      $('.results').fadeIn('slow');
      getImages(data.weather[0].main);
    });
}

function fadeItemsIn() {
  $('main').fadeIn('fast');
  $('.loading').fadeIn('fast');
}

function getImages(weather) {
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON( flickerAPI, {
    tags: weather+ ' weather',
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        $('<div>').addClass('imgResult').attr('id', i).appendTo('#images');
        $('<a>').attr({'href': item.link, 'id': 'link'+i}).appendTo('#'+i);
        $( "<img>" ).attr( "src", item.media.m ).addClass('img-responsive').appendTo( "#link"+i );
        if ( i === 2 ) {
          return false;
        }
      });
      $('.imageResults').fadeIn('slow');
      $('.loading').fadeOut('fast');
    });
}
