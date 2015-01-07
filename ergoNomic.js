DiceRolls = new Mongo.Collection('diceRolls');

if (Meteor.isClient) {
  Template.body.events ({
    "click .roll-dice": function (event) {
    // This function is called when the new task form is submitted

    var result = Math.floor(Math.random() * 6) + 1;

    DiceRolls.insert({
      result: result,
      createdAt: new Date(), // current time
      player: Meteor.user()
    });

    alert(result)
    return false  
  });

  Template.body.helpers ({

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
