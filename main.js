
$(document).ready( function() {
    var URL = "https://wind-bow.gomix.me/twitch-api";
    var twitchURL = "https://go.twitch.tv";
    var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
        
    // Populate the table of channels in the HTML 
    for (var user = 0; user < users.length; user++) {
        let u = users[user];
        // Get the JSONP and harvest the details for each channel 
        $.getJSON(URL + '/users/' + u + '?callback=?', function(userData) {
            $.getJSON(URL + '/channels/' + u + '?callback=?', function(channelData) {
                $.getJSON(URL + '/streams/' + u + '?callback=?', function(streamData) {
                    console.log(arguments);
                    // Get logo from logoURL
                    var logo = document.createElement("img");
                    logo.src       = userData['logo'];
                    logo.classList = "logo";

                    // Create username
                    var userName = document.createElement("a")
                    userName.innerHTML = userData['name'];
                    userName.classList = "userLink";
                    userName.href      = twitchURL + '/' + userData['name'];

                    // Get status tagline
                    var userStatus = document.createElement("p");
                    userStatus.innerHTML = channelData['status'];
                    
                    //Get online status
                    var onlineStatus = document.createElement("p");
                    if (!streamData['stream']) {
                        onlineStatus.innerHTML = "Offline";
                    }
                    else {
                        onlineStatus.innerHTML = "Online Now";
                    }
                    // Define a new row
                    var row = document.getElementById("channels").insertRow();
                    // Add cells to the row
                    var cell = row.insertCell(0);
                    cell.appendChild(logo);
                    var cell = row.insertCell(1);
                    cell.appendChild(userName);
                    var cell = row.insertCell(2);
                    cell.appendChild(userStatus);
                    var cell = row.insertCell(3);
                    cell.appendChild(onlineStatus);


                });
            });
        });
    }
});
























