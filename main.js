//recupero html del template
var source = $("#entry-template").html();
//creo la funzione di handlebars
var template = Handlebars.compile(source);
//creo oggetto contenente i miei placeholder
var context = { square_class: "square", number_class: "number" };
//creo html compilato
var html = template(context);
//lo inserisco nella griglia 36 volte
// !!!ricorda che quando 'appendi' l'oggetto e' dinamico perche' non presente alla creazione dell'html
for (var i = 0; i < 36; i++) {
    $(".grid").append(html);
}

// quindi al click su un oggetto dinamico devo ricordare di usare il metodo $(<selettore_statico>).on(metodo, <selettore_dinamico_discendente>, <funzione>)
$(".grid").on("click", ".square", function () {
    //mi salvo .square in una variabile
    var currentSquare = $(this);

    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/random/intg",
        method: "GET",
        success: function (data) {
            //leggo il contenuto di .number
            var currentNumber = currentSquare.find(".number").text();
            //se non ha contenuto posso fare la richiesta al server
            if (!currentNumber) {
                // recupero il numero restituito dall'api
                var numero_pc = data.response;
                //lo inserisco in .number
                currentSquare.find(".number").text(numero_pc);
                //valuto che classe assegnare
                var classe = chooseClass(numero_pc);
                //e la assegno
                currentSquare.addClass(classe);
            } else {
                //se ha contenuto significa che ho gia' clickato su quell'elemento
                alert(`hai gia' clickato su questo elemento`);
            }
        },
        error: function (request, status, error) {
            //visualizzo schermata html di errore
            document.write(request.responseText);
            console.log(request); //{readyState: 4, getResponseHeader: ƒ, getAllResponseHeaders: ƒ, setRequestHeader: ƒ, overrideMimeType: ƒ, …}
            console.log(status); //error
            console.log(error); //Not Found
        },
    });
});

function chooseClass(num) {
    if (num <= 5) {
        return "yellow";
    } else {
        return "green";
    }
}
