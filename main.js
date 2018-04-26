var allContent = $('body');

let overlay = '<div id="quake-overlay-zzz"><button type="button" id="close-overlay">close</button></div>';
let overlayButton = '<button type="button" id="close-overlay">close</button>';

$('#quake-overlay-zzz').append(overlayButton);

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
                $('#overlay').append('HI');
                overFade();
                console.log(recentGeo);
            }
            if (JSON.stringify(myJson.features[0]) === JSON.stringify(recentGeo)) {
                shakeFunc();
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

// function buildInfo(data) {
//     put data from recentGeo objec into the aside that will fade in
// }

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

