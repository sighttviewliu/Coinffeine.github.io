function aboutUsTimeline (panel, timeline) {
    if (panel.size()) {
        var startDate = new Date(timeline['start-time-year'], timeline['start-time-month']).getTime(),
            endDate = new Date(timeline['end-time-year'], timeline['end-time-month']).getTime(),
            totalSeconds = endDate - startDate;
            html = '';
        
        var datePointSplit = timeline['datePoints'].map(function(datePoint){
            return datePoint.split(',');
        });

        var datePoints = datePointSplit.map(function(datePoint){
            return new Date(datePoint[0], datePoint[1]).getTime();
        });

        var datePointsPosition = datePoints.map(function(datePoint){
            return (datePoint - startDate) * 100 / totalSeconds;
        });

        _.zip(datePointsPosition, datePointSplit).forEach(function(pair){
            html += '<div class="datePoint ' + pair[1][3]+ '" style="left:' + parseInt(pair[0]) + '%"><em>' + pair[1][2] + '</em></div>';
        });

        var eventsPosition = timeline['events'].map(function(ev){
            var time = new Date(ev.year, ev.month).getTime();
            return (time - startDate) * 100 / totalSeconds;
        });

        _.zip(eventsPosition, timeline['events']).forEach(function(tuple){
            html += '<div class="event" data-event-height="' + tuple[1].height +'" style="left:' + parseInt(tuple[0]) + '%"><em>' + tuple[1].text + '</em></div>';
        });

        panel.addClass('timeline')
            .append(html);

        panel.find('.datePoint').each(function(index) {
            $(this).delay(300*index).fadeIn(300);
        });

        panel.find('.event').each(function(index) {
            $(this).delay(600*index)
                .show()
                .animate({
                    'padding-bottom': $(this).attr('data-event-height'),
                    'opacity': 1
                },1000);
        });
    }
}
