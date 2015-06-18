Meteor.startup(function() {
	Meteor.methods({
		'saveCalEvent':function(ce){
			CalEvent.insert(ce);
		},
		'updateTitle': function(id, title){
			return CalEvent.update({_id:id}, {$set:{title:title}});
		},
		'moveEvent': function(event) {
			return CalEvent.update({_id: event._id}, {$set: {
				start: event.start,
				end: event.end
			}});
		},
		'delEvent': function(id) {
			CalEvent.remove({_id: id});
		}

	})
});