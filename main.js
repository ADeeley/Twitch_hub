var URL = "https://wind-bow.gomix.me/twitch-api";
var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready( function() {
    var twitchURL = "https://go.twitch.tv";
    // Populate the list of users in the HTML 
    for (var user = 0; user < users.length; user++) {
        
        // Get the JSONP and harvest the details for each user-block
        $.getJSON(URL + '/users/' + users[user] + '?callback=?', function(data) {
            var userListEl = document.createElement("li");
            
            // Get logo from logoURL
            var logo = document.createElement("img");
            logo.src       = data['logo'];
            logo.style     = "height:50px; width:50px";
            logo.classList = "logo";

            // Create username
            var userName = document.createElement("a")
            userName.innerHTML = data['name'];
            userName.classList = "userLink";
            userName.href      = twitchURL + '/' + data['name'];

            // Get status tagline
            $.getJSON(URL + '/channels/' + data['name'] + '?callback=?', function(channelData) {

                var status = document.createElement("p");
                status.style = "font-size: 16px; margin: 0 0 0 50%;";
                status.innerHTML = channelData['status'];
                
                //Get online status
                $.getJSON(URL + '/streams/' + data['name'] + '?callback=?', function(streamData) {
                var onlineStatus = document.createElement("p");
                    if (!streamData['stream']) {
                        onlineStatus.innerHTML = "Offline";
                    }
                    else {
                        onlineStatus.innerHTML = "Online Now";
                    }
                    // Add everything to the list element
                    userListEl.appendChild(logo);
                    userListEl.appendChild(userName);
                    userListEl.appendChild(status);
                    userListEl.appendChild(onlineStatus);

                    document.getElementsByTagName("ul")[0].appendChild(userListEl);
                });
            });
        });
    }
});
























