var titolo = document.getElementById('card-title')
var immagine = document.getElementById('card-img');
var testo = document.getElementById('card-text');
var titolo_paese = document.getElementById('titolo_paese');
var testo_paese = document.getElementById('testo_paese');
var immagine_paese = document.getElementById('immagine_paese');

function zoomin() {
    var myImg = document.getElementById("immagine");
    var currWidth = myImg.clientWidth;
    if (currWidth == 2500 ) return false;
    else {
      myImg.style.width = (currWidth + 100) + "px";
    }
  }
  
  function zoomout() {
    var myImg = document.getElementById("immagine");
    var currWidth = myImg.clientWidth;
    if (currWidth == 100) return false;
    else {
      myImg.style.width = (currWidth - 100) + "px";
    }
  }

  function informazioni(paese)
  {
      switch (paese) {
        case "Condofuri":
            condofuri();
          break;
        case "Melito di Porto Salvo":
            melito();
        case "Bova":
            bova();
        default:
          break;
      }
  }

  function condofuri()
  {
    titolo.innerHTML = "Condofuri";
    immagine.src = "img/condofuri.png";
    testo.innerHTML = "Condofuri è un comune italiano di 4 656 abitanti. Il comune è inserito nell'area linguistico-geografica Grecanica per la presenza di una lingua parlata e scritta strettamente imparentata con il greco antico."
  }
  
  function melito()
  {
    titolo.innerHTML = "Melito di Porto Salvo";
    immagine.src = "img/condofuri.png";
    testo.innerHTML = "blabla";
  }

  function bova()
  {
    titolo.innerHTML = "Bova";
    immagine.src = "img/bova.png";
    testo.innerHTML = " Bova è un comune italiano di 400 abitanti. Inserito nel circuito de: I borghi più belli d'Italia,il paese è considerato capitale della cultura greca di Calabria."
  }

  function bova_onclick()
{
  $('html, body').animate({
    scrollTop: $(document).height()
  }, 'slow');
  titolo_paese.innerHTML = "Bova";
  immagine_paese.src = "img/bova.png"
    $(document).ready(function(){
      $.ajax({
          url: 'txt/bova.txt', // Sostituisci con il percorso del tuo file
          dataType: 'text',
          success: function(data) {
              testo_paese.innerText = data;
          },
          error: function(xhr, status, error) {
              console.error('Errore durante il recupero del file:', status, error);
          }
      });
  });
}

function openPopup(num) {
  var popup = document.getElementById("popup" + num);
  popup.style.display = "block";
}

// Funzione per chiudere la finestra popup
function closePopup(num) {
  var popup = document.getElementById("popup" + num);
  popup.style.animation = "fadeOut 0.5s ease"; // Applica l'animazione di chiusura
  setTimeout(function() {
      popup.style.display = "none"; // Nasconde la finestra dopo l'animazione
      popup.style.animation = ""; // Resetta l'animazione
  }, 500); // Tempo dell'animazione in millisecondi (0.5 secondi)
}