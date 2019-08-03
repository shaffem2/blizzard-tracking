$(document).ready(function() {

    $('input#idformsubmit').click(function() {

        var idString = 'user/' + $('input#idform').val();

        console.log('button clicked');
        $('#bottom').show();
        $.getJSON(idString, function(result) {
            var myResult = result[0];
            //container.append(myResult.firstname);
            console.log(myResult.firstname);
            $('#firstname').text(myResult.firstname);
            $('#lastname').text(myResult.lastname);
            $('#date').text(myResult.date);
            $('#id').text(myResult.id);
            $('#status').text(myResult.status);

            
        })
    })
});