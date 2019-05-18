//let state = getMissionPatch();
let local = localStorage.getItem('index');
function getMissionPatch() {
    fetch('https://api.spacexdata.com/v3/launches')
    .then(response => response.json())
    .then(responseJson => displayMissionPatch(responseJson));
  }
  
  function displayMissionPatch(responseJson) {
    for (let i=0; i<responseJson.length; i++ ){
      if (responseJson[i].links.mission_patch !== null) {
       $('.mission').append(`<a href="mission.html"><div class="mission-container" id="${responseJson[i].flight_number - 1}"><h3 class="flight-number">Flight Number ${responseJson[i].flight_number}</h3><h3 class="mission-name">${responseJson[i].mission_name}</h3><img src="${responseJson[i].links.mission_patch}" class="mission-patch"></div></a>`);
    }
    }
  }


// function initialize() {
//   window.history.replaceState(state, null, "");
//   render(state);
// };
 

  function watchMissionPatch() {
    
    $('.mission').on('click', '.mission-container', function() {
       let num = $(this).attr('id');
       
      $('.mission').hide();
      local = localStorage.setItem('index', num);
    });  
  }
 
  function getIndividualMission(local) {
    fetch('https://api.spacexdata.com/v3/launches')
    .then(response => response.json())
    .then(responseJson => displayMissionDetail(responseJson[parseInt(local)]));
  }
  
  function displayMissionDetail(responseJson) {
    if (responseJson.links.flickr_images.length > 0) {
      for (let i=0; i < responseJson.links.flickr_images.length; i++) {
        $('.mission-images').append(`<img src="${responseJson.links.flickr_images[i]}">`);
      }
    }
    $('.mission-details').append(`
    <h3 class="flight-number">${responseJson.mission_name}</h3>
    <ul><li><span class="bold-text">Flight Numer:</span> ${responseJson.flight_number}</li>
    <li><span class="bold-text">Launch Year:</span> ${responseJson.launch_year}</li>
    <li><span class="bold-text">Launch Date:</span> ${responseJson.launch_date_local}</li>
    <li><span class="bold-text">Rocket Name:</span> ${responseJson.rocket.rocket_name}</li>
    <li><span class="bold-text">Launch Site:</span> ${responseJson.launch_site.site_name_long}</li>
    <li><span class="bold-text">Launch Sucess:</span> ${responseJson.launch_success}</li>
    <li><span class="bold-text">Video:</span> <a href="${responseJson.links.video_link}" target="_blank">YouTube Video</a></li>
    <li><span class="bold-text">Details:</span> ${responseJson.details}</li>
    </ul>`);
  }
  
  // function back() {
  //   $('.aTag').click(function() {
  //     event.preventDefault();
  //     $('.mission').show();
  //     $('.mission-images').empty();
  //     $('.mission-details').empty();
      
  //   });
  // }

  // function handleButtonClick() {
  //   state = watchMissionPatch();
  //   window.history.pushState(state, null, "");
  //   render(state);
  // }

  
window.onpopstate = function (event) {
  if (event.state) { state = event.state; }
  render(state);
};
  
  $(function() {
    //initialize();
    
    getMissionPatch();
    
    watchMissionPatch();
    getIndividualMission(local);
    
  })