$(document).ready(function () {
  const checkboxes = $('.amenities input');
  const checked = {};

  const getCheckedAmenities = () => {
    const checkedAmenities = [];
    $('.amenities input:checked').each(function () {
        checkedAmenities.push($(this).data('id'));
    });
    return checkedAmenities;
  }

  const loadPlaces = () => {
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ amenities: getCheckedAmenities() }),
        success: (data) => {
            const placesSection = $('.places');
            placesSection.empty();

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

                const description = $('<div>').addClass('description').html(place.description);
                article.append(description);

                placesSection.append(article);
            });
        },
        error: (xhr, status, error) => {
            console.error("Error:", error);
        }
    });
  }

  checkboxes.on('change', () => {
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

    $('button').on('click', () => {
        loadPlaces();
    }
  );

  loadPlaces();
  
});