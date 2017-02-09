
function speech() {

    var text = document.getElementById('text');
    console.log(text.value);
    var utterance = new SpeechSynthesisUtterance(text.value);
    window.speechSynthesis.speak(utterance);
    kqsearch()
}

function kqsearch(){
    var qtext = document.getElementById('text');
    console.log(qtext.value);
    var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
    var params = {
        'query': qtext.value.toString(),
        'limit': 10,
        'indent': true,
        'key' : 'AIzaSyACKr_KgxJaOUIKdqAQfZl4mppIbywi8dI',
    };
    $.getJSON(service_url + '?callback=?', params, function(response) {

        $.each(response.itemListElement, function(i, element) {
            $('<tr >', {text:element['result']['name']},'</tr>').appendTo('#display');
        });
    });

}
