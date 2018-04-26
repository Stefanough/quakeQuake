var allContent = $('body');

allContent.prepend('<aside id="overlay"></aside>')

function overFade() {
    setTimeout(function(){ $('#overlay').fadeIn(1000); }, 3000);
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
                $('#overlay').append = 'HI';
                overFade();
                console.log(recentGeo);
            }
            if (JSON.stringify(myJson.features[0]) === JSON.stringify(recentGeo)) {
                shakeFunc();
                console.log('nothing to report, madame and/or sir')
            } else {
                recentGeo = myJson.features[0];                
                shakeFunc();
            }
        });    
        setTimeout(fetchGeo, 10000);    
    }
fetchGeo();
// setTimeout(fetchGeo, 60000);

function buildInfo(data) {
    let info = 
}

function shakeFunc() {
    $('div').addClass('play');
    console.log('start shake');
    setTimeout(resetShake, 10000);
}

function resetShake() {
    $('div').removeClass('play');
    $('div').addClass('pause');
    console.log('end shake');
}

