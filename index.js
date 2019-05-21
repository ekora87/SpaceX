//let state = getMissionPatch();
let local = localStorage.getItem('index');
let slideIndex = 1;
function getMissionPatch() {
    fetch('https://api.spacexdata.com/v3/launches')
    .then(response => response.json())
    .then(responseJson => displayMissionPatch(responseJson));
  }
  
function displayMissionPatch(responseJson) {
    for (let i=0; i < responseJson.length; i++ ){
      if (responseJson[i].links.mission_patch !== null) {
        $('.mission').append(`<a href="mission.html"><div class="mission-container" id="${responseJson[i].flight_number - 1}"><h3 class="flight-number">Flight Number ${responseJson[i].flight_number}</h3><h4 class="mission-name">${responseJson[i].mission_name}</h4><img src="${responseJson[i].links.mission_patch}" class="mission-patch"></div></a>`);
        }
    }
}
 

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
    $('.mission-images').append(`<div class="slide-control"><a class="prev" onclick="plusSlides(-1)">PREV</a>
    <span class="numbertext"></span>
    <a class="next" onclick="plusSlides(1)">NEXT</a></div>`);
    let imageCount = responseJson.links.flickr_images.length;
    if (imageCount > 0) {
      for (let i=0; i < imageCount; i++) {
        
        $('.mission-images').append(`<div class="mySlides fade">
        <img class="images" src="${responseJson.links.flickr_images[i]}">
        </div>

        `);
      }
    }
    showSlides(slideIndex);
    $('.individual-mission').prepend(`<div class="mission-details">
    <h3 class="name">${responseJson.mission_name}</h3>
    <ul><li><span class="bold-text">Flight Numer:</span> ${responseJson.flight_number}</li>
    <li><span class="bold-text">Launch Year:</span> ${responseJson.launch_year}</li>
    <li><span class="bold-text">Launch Date:</span> ${responseJson.launch_date_local}</li>
    <li><span class="bold-text">Rocket Name:</span> ${responseJson.rocket.rocket_name}</li>
    <li><span class="bold-text">Launch Site:</span> ${responseJson.launch_site.site_name_long}</li>
    <li><span class="bold-text">Launch Sucess:</span> ${responseJson.launch_success}</li>
    <li><span class="bold-text">Video:</span> <a href="${responseJson.links.video_link}" target="_blank">YouTube Video</a></li>
    <li><span class="bold-text">Details:</span> ${responseJson.details}</li>
    </ul></div>`);
  }
  
// window.onpopstate = function (event) {
//   if (event.state) { state = event.state; }
//   render(state);
// };





function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {

  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
      slideIndex = 1;
      n = 1;
    }    
  if (n < 1) {
      slideIndex = slides.length;
      n = slides.length;
    }
  for (let i =0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
slides[slideIndex - 1].style.display = "block";  
$('.numbertext').text(`${n}/${slides.length}`);
//   dots[slideIndex-1].className += " active";
}
  
  $(function() {
    getMissionPatch();
    watchMissionPatch();
    getIndividualMission(local);
    showSlides(slideIndex);
  })