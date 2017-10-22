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
                    var h = document.getElementsByTagName("h3")[0].style = "color: white";
                });
            });
        });
    }
});
function showAll() {
    /**
     * Shows all users
     */
    var isOnline;
    var rows = document.getElementById("channels").rows;
    for (var i = 1; i < rows.length; i++) {
            rows[i].style.display = '';

    }
}

function showOnline() {
    /**
     * Hides non-online users
     */
    showAll();
    var isOnline;
    var rows = document.getElementById("channels").rows;
    for (var i = 1; i < rows.length; i++) {
        isOnline = rows[i].cells[3].getElementsByTagName('p')[0].innerHTML;
        if (isOnline == "Offline") {
            rows[i].style.display = 'none';

        }
    }
}


function showOffline() {
    /**
     * Hides online users
     */
    showAll();
    console.log("Clicked  show Offline");
    var isOnline;
    var rows = document.getElementById("channels").rows;
    for (var i = 1; i < rows.length; i++) {
        isOnline = rows[i].cells[3].getElementsByTagName('p')[0].innerHTML;
        if (isOnline == "Online Now") {
            rows[i].style.display = 'none';

        }
    }
}






















