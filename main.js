
$(document).ready( function() {
    var URL = "https://wind-bow.gomix.me/twitch-api";
    var twitchURL = "https://go.twitch.tv";
    var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
        
    var cellArr = [];
    // Populate the table of channels in the HTML 
    for (var user = 0; user < users.length; user++) {
        let u = users[user];
        // Get the JSONP and harvest the details for each channel 
        $.getJSON(URL + '/users/' + u + '?callback=?', function(userData) {
            $.getJSON(URL + '/channels/' + u + '?callback=?', function(channelData) {
                $.getJSON(URL + '/streams/' + u + '?callback=?', function(streamData) {
                    // Get logo from logoURL
                    logo = document.createElement("img");
                    logo.src       = userData['logo'];
                    logo.classList = "logo";

                    // Create username
                    let name = userData['name'];
                    userName = document.createElement("a")
                    userName.innerHTML = name;
                    userName.classList = "userLink";
                    userName.href      = twitchURL + '/' + name;

                    // Get status tagline
                    userStatus = document.createElement("p");
                    userStatus.innerHTML = channelData['status'];
                    
                    //Get online status
                    isOnline = document.createElement("p");
                    if (!streamData['stream']) {
                        isOnline.innerHTML = "Offline";
                    }
                    else {
                        isOnline.innerHTML = "Online Now";
                    }
                    // Define a new row
                    let row = document.getElementById("channels").insertRow();
                    // Add cells to the row
                    cellArr = [logo, userName, userStatus, isOnline];

                    cellArr.forEach(function(item, index) {
                        cell = row.insertCell(index);
                        cell.appendChild(item);
                    });
                });
            });
        });
    }
});


























