app.filter('timeFilter', function() {
    return function(seconds) {
        var mins, secs, time = "";
        mins = parseInt(seconds / 60);
        secs = seconds % 60;
        if (secs < 10) {
            secs = "0" + secs;
        }
        return mins + ":" + secs;
    }
});
