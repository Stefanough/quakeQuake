var allContent = $('body');

let overlay = '<div id="quake-overlay-zzz"><button type="button" id="close-overlay">close</button></div>';

allContent.prepend(overlay);

function overFade() {
    setTimeout(function(){ $('#quake-overlay-zzz').fadeIn(1000); }, 3000);
}

let recentGeo;
//set timeout 60s
function fetchGeo() {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            // console.log(myJson);
            if (recentGeo === undefined) {
                recentGeo = myJson.features[0];
                buildInfo(recentGeo);
                console.log(recentGeo.properties.mag)
                //$('#quake-overlay-zzz').append('HI');
                overFade();
                console.log(recentGeo);
            }
            if (JSON.stringify(myJson.features[0]) === JSON.stringify(recentGeo)) {
                // shakeFunc();
                console.log('nothing to report, madame and/or sir')
            } else {
                recentGeo = myJson.features[0];                
                shakeFunc();
                console.log(recentGeo);
            }
        });    
        setTimeout(fetchGeo, 10000);    
    }
fetchGeo();
// setTimeout(fetchGeo, 60000);

function buildInfo(data) {
    let mag = data.properties.mag;
    $('#quake-overlay-zzz').append(`magnitude: ${mag}`);
}

$('#close-overlay').on('click', function() {
    resetShake();
    $('#quake-overlay-zzz').css('display', 'none');
});

function shakeFunc() {
    $('div').not('#quake-overlay-zzz').addClass('play');
    console.log('start shake');
    setTimeout(resetShake, 10000);
}

function resetShake() {
    $('div').removeClass('play');
    $('div').addClass('pause');
    console.log('end shake');
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }  