$(function () {
  var count = $("#count_address").val();

  $(document).on("click", "#add_row", function () {
    count++;
    var total = $("#total_address").val(count);
    var html_code = "";
    var parent = $("#div_parent_" + count);
    html_code += '<div id="div_parent_' + count + '">';
    html_code += "<hr>";
    html_code += '<h5 className="font-NunitoSans font-light my-2">' + 'Address' + " " + count + "</h5>";
    html_code += '<div class="row">';

    html_code +=
      '<div class="col-md-4 mb-3">' +
      '<div class="form-group" >' +
      '<label class="control-label col-form-label">' +
      'Country' +
      "</label>" +
      '<select  class="select2 form-control custom-select" name="country[]" id="country' +
      count +
      '">' +
      "</select>" +
      "</div >" +
      "</div > ";

    html_code +=
      '<div class="col-md-4 mb-3">' +
      '<div class="form-group" >' +
      '<label class="control-label col-form-label">' +
      'State' +
      "</label>" +
      '<select  disabled class="select2 form-control custom-select" name="state[]" id="state' +
      count +
      '">' +
      "</select>" +
      "</div >" +
      "</div > ";

    html_code +=
      '<div class="col-md-4 mb-3">' +
      '<div class="form-group" >' +
      '<label class="control-label col-form-label">' +
      'City' +
      "</label>" +
      '<select  disabled class="select2 form-control custom-select" name="city[]" id="city' +
      count +
      '">' +
      "</select>" +
      "</div >" +
      "</div > ";

    html_code +=
      '<div class="col-md-4">' +
      '<div class="form-group">' +
      '<label class="control-label col-form-label">' +
      'Postal Code' +
      "</label>" +
      '<input type="text" class="form-control" name="postal[]" id="postal' +
      count +
      '" >' +
      "</div>" +
      "</div>";

    html_code +=
      '<div class="col-md-4">' +
      '<div class="form-group">' +
      '<label class="control-label col-form-label">' +
      'Address' +
      "</label>" +
      '<input type="text" class="form-control" name="address[]" id="address' +
      count +
      '" >' +
      "</div>" +
      "</div>";

    html_code += '<div class="col-md-4">';
    html_code += "   <label> &nbsp;</label>";
    html_code += '  <div class="form-group">';
    html_code +=
      '      <button type="button" name="remove_row" id="' +
      count +
      '"  class="text-white btn remove_row filterBtn text-sm" style="width: 140px;">' +
      '<span class="fa fa-trash"></span>' +
      '&nbsp;Delete address' +
      "" +
      "</button >" +
      "</div >" +
      "</div >";

    html_code += "</div>"; //div parent

    $("#div_address_multiple").append(html_code);

    //cdp_load_countries(count);
    //cdp_load_states(count);
    //cdp_load_cities(count);
  });

  
 


});


