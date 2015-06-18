Template.dialog.rendered = function() {
	if(Session.get('editDialog')) {
		var calevent = CalEvent.findOne({_id:Session.get('editDialog')});
		if(calevent){
			$('#title').val(calevent.title);
		}
	}
}

Template.dialog.events({
	"click .closeDialog": function(event, template) {
		Session.set('editing_event', null);
	},
	"click .saveBtn": function(e, t){
		var title = t.find("#title").value;
		Meteor.call('updateTitle', Session.get('editing_event'), title);
		Session.set('editing_event', null);
	},
	"click .delBtn": function(e, t){
		Meteor.call('delEvent', Session.get('editing_event'));
		Session.set('editing_event', null);
	}
});

Template.dialog.helpers({
	title: function(){
		var ce = CalEvent.findOne({_id:Session.get('editing_event')});
		return ce.title;
	}
});