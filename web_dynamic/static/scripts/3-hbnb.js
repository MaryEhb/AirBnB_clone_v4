$(document).ready(function () {
  const checkboxes = $('.amenities input');
  const checked = {};

  checkboxes.on('change', function () {
      const checkbox = $(this);
      const text = [];

      if (checkbox.is(':checked')) {
          checked[checkbox.data('id')] = checkbox.data('name');
      } else {
          delete checked[checkbox.data('id')];
      }

      for (const id in checked) {
          text.push(checked[id]);
      }

      $('.amenities h4').text(text.join(', '));
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", (data) => {
        if (data.status === "OK") {
            $("#api_status").addClass("available");
        } else {
            $("#api_status").removeClass("available");
        }
    });

  // const placesURL = "http://0.0.0.0:5001/api/v1/places_search/"
  const placesURL = "http://localhost:5001/api/v1/cities/05b0b99c-f10e-4e3a-88d1-b3187d6998ee/places";
  $.get(placesURL, (data) => {
          const placesSection = $('.places');

          data.forEach(place => {
              const article = $('<article>');

              const titleBox = $('<div>').addClass('title_box');
              titleBox.append($('<h2>').text(place.name));
              titleBox.append($('<div>').addClass('price_by_night').text('$' + place.price_by_night));
              article.append(titleBox);

              const information = $('<div>').addClass('information');
              information.append($('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '')));
              information.append($('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '')));
              information.append($('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '')));
              article.append(information);

              if (place.user) {
                  const user = $('<div>').addClass('user').html('<b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name);
                  article.append(user);
              }

              const description = $('<div>').addClass('description').html(place.description);
              article.append(description);

              placesSection.append(article);
          });
      });
});