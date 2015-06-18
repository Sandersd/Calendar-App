Template.main.rendered = function() {
  var calendar = $('#calendar').fullCalendar({
      dayClick:function(date, allDay, jsEvent, view){
        var calendarEvent = {};
        calendarEvent.start = date;
        calendarEvent.end = date;
        calendarEvent.title = 'New Event';
        calendarEvent.owner = Meteor.userId();
        Meteor.call('saveCalEvent', calendarEvent);
      },
      events:function(start, end, callback) {
        var calEvents = CalEvent.find({owner: Meteor.userId()}).fetch();
        callback(calEvents);
      },
      editable: true,
      selectable: true,
      eventClick: function(calEvent, jsEvent, view) {
        Session.set('editing_event', calEvent._id);
        $('#title').val(calEvent.title);
      },
      eventDrop: function(reqEvent){
        Meteor.call('moveEvent', reqEvent);
      }
  }).data().fullCalendar;
  Deps.autorun(function() {
    CalEvent.find().fetch();
    if(calendar) {
      calendar.refetchEvents();
    }
  })
}

Template.main.helpers({
  editing_event: function(){
    return Session.get('editing_event');
  }
});
