function getMissionPatch() {
    fetch('https://api.spacexdata.com/v3/launches')
    .then(response => response.json())
    .then(responseJson => displayMissionPatch(responseJson));
  }
  
  function displayMissionPatch(responseJson) {
    for (let i=0; i<responseJson.length; i++ ){
      if (responseJson[i].links.mission_patch !== null) {
       $('.mission').append(`<div class="mission-container" id="${responseJson[i].flight_number - 1}"><h3 class="flight-number">Flight Number ${responseJson[i].flight_number}</h3><h3 class="mission-name">${responseJson[i].mission_name}</h3><img src="${responseJson[i].links.mission_patch}" class="mission-patch"></div>`);
    }
    }
  }
  
  function watchMissionPatch() {
    
    $('.mission').on('click', '.mission-container', function(event) {
       let num = $(this).attr('id');
      $('.mission').hide();
      //$('.individual-mission').show();
      getIndividualMission(num);
      //alert(num);
    });  
  }
  
  
  function getIndividualMission(index) {
    fetch('https://api.spacexdata.com/v3/launches')
    .then(response => response.json())
    .then(responseJson => displayMissionDetail(responseJson[index]));
  }
  
  
  function displayMissionDetail(responseJson) {
    if (responseJson.links.flickr_images.length > 0) {
      for (let i=0; i < responseJson.links.flickr_images.length; i++) {
        $('.mission-images').append(`<img src="${responseJson.links.flickr_images[i]}">`);
      }
    }
    $('.mission-details').append(`<h3 class="flight-number">${responseJson.mission_name}</h3><ul><li><span class="bold-text">Launch Year:</span> ${responseJson.launch_year}</li><li><span class="bold-text">Launch Date:</span> ${responseJson.launch_date_local}</li><li><span class="bold-text">Rocket Name:</span> ${responseJson.rocket.rocket_name}</li><li><span class="bold-text">Launch Site:</span> ${responseJson.launch_site.site_name_long}</li>
    <li><span class="bold-text">Launch Sucess:</span> ${responseJson.launch_success}</li><li><span class="bold-text">Details:</span> ${responseJson.details}</li></ul>`);
  }
  
  function back() {
    $('.aTag').click(function() {
      event.preventDefault();
      $('.mission').show();
      $('.mission-images').empty();
      $('.mission-details').empty();
      
    });
  }
  
  $(function() {
    getMissionPatch();
    watchMissionPatch();
    back();
    //displayMissionDetail();
  })