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
                        logo = $('<img>').attr('src', userData['logo'])
                            .addClass('logo'),
                        userName = $('<a>')
                            .html(name)
                            .addClass('userLink')
                            .attr('href', twitchURL + '/' + name),
                        userStatus = $('<p>').html(channelData['status']),
                        isOnline = $('<p>').html(getStatus(streamData))
                        row = $('<tr>');

                        row.append($('<td>').append(logo))
                        row.append($('<td>').append(userName))
                        row.append($('<td>').append(userStatus))
                        row.append($('<td>').append(isOnline))
                    
                    $('#channels tbody').append(row);
                    document.getElementById("loadText").style.display = "none";
                });
            });
        });
    }
}

function showAll() {
    $('#channels > tbody > tr').each(function() {
        console.log($(this))
        $(this).show();
    })
}

function showChannelsWithStatus(status) {
    let isOnline = undefined,
    i = 1,

    rows = $("#channels > tbody > tr").each(function() {
        isOnline = $(this).find('td:nth-child(4)').find('p').html()
        if (isOnline == status) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
}

function showOnline() {
    showChannelsWithStatus('Online Now');
}

function showOffline() {
    showChannelsWithStatus('Offline');
}

function getStatus(streamData) {
    if (!streamData['stream']) {
        return "Offline";
    } else {
        return "Online Now";
    }
}
populateTable();
