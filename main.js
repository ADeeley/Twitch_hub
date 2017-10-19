var URL = "https://wind-bow.gomix.me/twitch-api";

function doSomething(data) {
    console.log(data[0]);
}

window.onload = function() {
    $.getJSON(URL + '/users/FreeCodeCamp?callback=?', function(data) {
        var image = document.createElement("img");
        image.src = data['logo'];
        image.style = "width:50px; height: 50px;";
        document.getElementById('FreeCodeCamp:logo').appendChild(image);
    });

}
























