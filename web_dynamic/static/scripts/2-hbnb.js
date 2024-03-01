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
});