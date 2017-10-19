var URL = "https://wind-bow.gomix.me/twitch-api";
var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready( function() {
    // Populate the list of users in the HTML 
    for (var user = 0; user < users.length; user++) {
        
        // Get the JSONP and harvest the details for each user-block
        $.getJSON(URL + '/users/' + users[user] + '?callback=?', function(data) {
            var userListEl = document.createElement("li");
            
            // Get logo from logoURL
            var logo = document.createElement("img");
            logo.src = data['logo'];
            logo.style = "height:50px; width:50px";

            // Create username
            var userName = document.createElement("p")
            userName.innerHTML = data['name'];
            userListEl.appendChild(logo);
            userListEl.appendChild(userName);
            document.getElementsByTagName("ul")[0].appendChild(userListEl);
        });
    }
});
























