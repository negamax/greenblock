/**
 * New script file
 */
/*
 * @param {org.greenblock.model.grantCredit} credit
 * @transaction
 */
function grantCredit(tx) {

    var credit = tx.credit;

    var greenblockreg = null;

    return getAssetRegistry('org.greenblock.model.GreenCredit')
        .then(function(_greenblockreg) {
            greenblockreg = _greenblockreg;
            return _greenblockreg.get('EnergyCredit2017');
        })
        .then(function(epa) {
            // epa account
            epa.quantity -= tx.number;
            return greenblockreg.update(epa);

        })
        .then(function() {
            credit.quantity += tx.number;
            return greenblockreg.update(tx.credit);

        })
 		 .then(function () {
         var factory = getFactory();

           var basicEvent = factory.newEvent('org.greenblock.model', 'Granted');
           emit(basicEvent);
       })
        .catch(function(error) {
            // Add optional error handling here.
        });

}

/*
 * @param {org.greenblock.model.recordEmission} credit
 * @transaction
 */
function recordEmission(tx) {
	var currentParticipant = getCurrentParticipant();
 	currentParticipant.emissions.push(tx.emissions)

  return getParticipantRegistry('org.greenblock.model.CarSensor')
  .then(function (participantRegistry) {
    // Update the driver in the driver participant registry.
    return participantRegistry.update(currentParticipant);
  })
  .catch(function (error) {
    // Add optional error handling here.
  });
}

/*
 * @param {org.greenblock.model.recordEmissionHome} credit
 * @transaction
 */
function recordEmissionHome(tx) {
	var currentParticipant = getCurrentParticipant();
 	currentParticipant.emissions.push(tx.emissions)

  return getParticipantRegistry('org.greenblock.model.HomeSensor')
  .then(function (participantRegistry) {
    // Update the driver in the driver participant registry.
    return participantRegistry.update(currentParticipant);
  })
  .catch(function (error) {
    // Add optional error handling here.
  });
}
