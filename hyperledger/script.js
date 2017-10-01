/**
 * New script file
 */
/*
 * @param {org.greenblock.model.grantCredit} credit
 * @transaction
 */
function grantCredit(tx) {
    console.log(tx.credit.entity);
    console.log(tx.credit.entity.name);
    console.log(tx.credit.name);
    console.log(tx.credit.quantity);

    var currentParticipant = getCurrentParticipant();


    console.log(currentParticipant);

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
        .catch(function(error) {
            // Add optional error handling here.
        });

}
