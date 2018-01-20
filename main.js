const URL = "https://wind-bow.gomix.me/twitch-api";
const twitchURL = "https://go.twitch.tv";
const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

// Populate the table of channels in the HTML 
function populateTable() {
    let cellArr = [];

    for (var user = 0; user < users.length; user++) {
        let u = users[user];
        // Get the JSONP and harvest the details for each channel 
        $.getJSON(URL + "/users/" + u + "?callback=?", function(userData) {
            $.getJSON(URL + "/channels/" + u + "?callback=?", function(channelData) {
                $.getJSON(URL + "/streams/" + u + "?callback=?", function(streamData) {
                    //let row = document.getElementById("channels").insertRow(),
                    let name = userData['name'],
                        h = document.getElementsByTagName("h3")[0].style = "color: white",
                        logo = $('<img>').attr('src', userData['logo']),
                        cell = $('<td>'),
                        row = $('<tr>');


                        row.append(cell.append(logo))
                    
                    $('#channels tbody').append(row);
                    // Get logo from logoURL
                    /*
                    logo = document.createElement("img");
                    logo.src       = userData["logo"];
                    logo.classList = "logo";


                    // Create username
                    userName = document.createElement("a")
                    userName.innerHTML = name;
                    userName.classList = "userLink";
                    userName.href      = twitchURL + "/" + name;

                    // Get status tagline
                    userStatus = document.createElement("p");
                    userStatus.innerHTML = channelData["status"];
                    
                    //Get online status
                    isOnline = document.createElement("p");
                    if (!streamData['stream']) {
                        isOnline.innerHTML = "Offline";
                    }
                    else {
                        isOnline.innerHTML = "Online Now";
                    }
                    // Add cells to the row
                    cellArr = [logo, userName, userStatus, isOnline];

                    cellArr.forEach(function(item, index) {
                        cell = row.insertCell(index);
                        cell.appendChild(item);
                    });
                    // Remove the loading placeholder when channels are displayed
                    document.getElementById("loadText").style.display = "none";
                    */
                });
            });
        });
    }
}

function showAll() {
    /**
     * Shows all users
     */
    let isOnline = undefined,
        rows = document.getElementById("channels").rows,
        i = 1;
    for (i; i < rows.length; i++) {
            rows[i].style.display = "";
    }
}

function showOnline() {
    /**
     * Hides non-online users
     */
    showAll();
    let isOnline = undefined,
        rows = document.getElementById("channels").rows;

    for (i; i < rows.length; i++) {
        isOnline = rows[i].cells[3].getElementsByTagName("p")[0].innerHTML;
        if (isOnline == "Offline") {
            rows[i].style.display = "none";

        }
    }
}

function showOffline() {
    /**
     * Hides online users
     */
    showAll();
    let isOnline,
        rows = document.getElementById("channels").rows,
        i = 1;

    for (i; i < rows.length; i++) {
        isOnline = rows[i].cells[3].getElementsByTagName("p")[0].innerHTML;
        if (isOnline == "Online Now") {
            rows[i].style.display = "none";

        }
    }
}

populateTable();
