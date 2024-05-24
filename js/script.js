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

  function preview(p)
  {
    titolo.innerHTML = p;
    immagine.src = "paesi/" + p + "/" + p + ".png";
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

function paesi_onclick(p)
{
  $('html, body').animate({
    scrollTop: $(document).height()
  }, 'slow');
  titolo_paese.innerHTML = p;
  immagine_paese.src = "paesi/" + p + "/" + p + ".png";
  var url = 'paesi/' + p + '/' + p + '.txt';
    $(document).ready(function(){
      $.ajax({
          url: url, // Sostituisci con il percorso del tuo file
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
function closePopup(num, c = 0) {
  var popup = document.getElementById("popup" + num);
  if(c == 0)
  {
    popup.style.animation = "fadeOut 0.5s ease"; // Applica l'animazione di chiusura
    setTimeout(function() {
      popup.style.display = "none";
      popup.style.animation = "";
       // Nasconde la finestra dopo l'animazione
       // Resetta l'animazione
  }, 500); // Tempo dell'animazione in millisecondi (0.5 secondi)
  }
  else{
    popup.style.display = "none";
  }
 
}

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Invio...';

   const serviceID = 'default_service';
   const templateID = 'template_2kar9ml';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Invia email';
    }, (err) => {
      btn.value = 'Invia email';
      alert(JSON.stringify(err));
    });
});
function focus_recensione(e)
{
  var recensione = document.getElementById('recensione');
  recensione.classList.add('open');
    if (document.getElementById('recensione').contains(e.target)){
      //dentro
    } else{
      //fuori
      if(document.getElementById('apri_recensione').contains(e.target))
      {
      }
      else
      {
        recensione.classList.remove('open');
        window.removeEventListener('click', focus_recensione);   
      }

    }
}
function recensione()
{
  var recensione = document.getElementById('recensione')

  closePopup(1, 1);
  closePopup(2,1);
  closePopup(3,1);
  recensione.style.display = "block";
  window.addEventListener('click', focus_recensione);
}
