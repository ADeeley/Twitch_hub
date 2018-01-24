const URL = "https://wind-bow.gomix.me/twitch-api";
const twitchURL = "https://go.twitch.tv";
const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

function populateTable() {
    let cellArr = [];

    for (var user = 0; user < users.length; user++) {
        let u = users[user];
        $.getJSON(URL + "/users/" + u + "?callback=?", function(userData) {
            $.getJSON(URL + "/channels/" + u + "?callback=?", function(channelData) {
                $.getJSON(URL + "/streams/" + u + "?callback=?", function(streamData) {
                    let name = userData['name'],
                        logo = $('<img>').attr('src', userData['logo'])
                            .addClass('logo'),
                        userName = $('<a>')
                            .html(name)
                            .addClass('userLink')
                            .attr('href', twitchURL + '/' + name),
                        userStatus = $('<td>').html(channelData['status']),
                        isOnline = $('<td>').html(getStatus(streamData))
                        row = $('<tr>');

                        row.append($('<td>').append(logo))
                        row.append($('<td>').append(userName))
                        row.append((userStatus))
                        row.append(isOnline)
                    
                    $('#channels tbody').append(row);
                    $('#loadText').hide();
                });
            });
        });
    }
}

function showChannelsWithStatus(status) {
    let isOnline = undefined,
    i = 1,

    rows = $("#channels > tbody > tr").each(function() {
        isOnline = $(this).find('td:nth-child(4)').html()
        if (isOnline == status) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
}

function showAll() {
    $('#channels > tbody > tr').each(function() {
        $(this).show();
    })
}

function showOnline() {
    showChannelsWithStatus('Online Now');
}

function showOffline() {
    showChannelsWithStatus('Offline');
}

function getStatus(streamData) {

    return streamData['stream'] ? 'Online Now' : 'Offline';
}
populateTable();
