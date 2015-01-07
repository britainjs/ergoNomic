DiceRolls = new Mongo.Collection('diceRolls');

if (Meteor.isClient) {
  Template.body.events ({
    "click .roll-dice": function (event) {
      // This function is called when the new task form is submitted

      var result = Math.floor(Math.random() * 6) + 1;
      var player = Meteor.user().profile ? Meteor.user().profile.name : Meteor.user().username;

      DiceRolls.insert({
        result: result,
        createdAt: new Date(), // current time
        player: player
      });

      Session.set("result", result)
      return false
    }  
  });

  Template.body.helpers ({
    previousRolls: function () {
      return DiceRolls.find({}, {limit: 6, sort: {createdAt: -1}  });
    },
    result: function () {
      result = Session.get("result")
      
      result ? result : null;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
