var titolo = document.getElementById('card-title')
var immagine = document.getElementById('card-img');
var testo = document.getElementById('card-text');
var titolo_paese = document.getElementById('titolo_paese');
var testo_paese = document.getElementById('testo_paese');
var immagine_paese = document.getElementById('immagine_paese');

function zoomin() {
    var myImg = document.getElementById("immagine");
    var currWidth = myImg.clientWidth;
    //if (currWidth == 2500 ) return false;
    //else {
      myImg.style.width = (currWidth + 100) + "px";
    //}
  }
  
  function zoomout() {
    var myImg = document.getElementById("immagine");
    var currWidth = myImg.clientWidth;
    if (currWidth < 1000) return false;
    else {
      myImg.style.width = (currWidth - 100) + "px";
    }
  }

  function preview(p)
  {
    titolo.innerHTML = p;
    immagine.src = "paesi/" + p + "/" + p + ".png";
  }

function paesi_onclick(p)
{
  immagine_paese.style.display = "block";
  titolo_paese.innerHTML = p;
  immagine_paese.src = "paesi/" + p + "/" + p + ".png";
  document.getElementById('back-to-map').style.display = 'block';
  document.getElementById("container-mappa").style.display = "none";
  document.getElementById("informazioni").style.display = "block";
  document.getElementById("footer").style.display = "none";
  for(var x = 1; x <= 3; x++)
  {
    document.getElementById("immagine" + x).src = "paesi/" + p + "/" + x + ".jpg";
  }
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
  })
  setTimeout(function(){
    var footer = document.getElementById("footer1");
    var footerTop = footer.getBoundingClientRect().top + window.scrollY;
    document.getElementById("max-height").style.height = footerTop + 100 + "px";
    document.getElementById("max-height1").style.height = footerTop + 100 + "px";
}, 200);

}

function backToMap() {
  // Mostra la mappa principale
  // Nascondi i dettagli del paese
  document.getElementById("container-mappa").style.display = "block";
  document.getElementById('titolo_paese').innerText = '';
  document.getElementById('testo_paese').innerText = '';
  document.getElementById('immagine_paese').src = '';
  document.getElementById('back-to-map').style.display = 'none';
  document.getElementById("informazioni").style.display = "none";
  document.getElementById("footer").style.display = "block";
  immagine_paese.style.display = "none";
  setTimeout(function(){
    var footer = document.getElementById("footer");
    var footerTop = footer.getBoundingClientRect().top + window.scrollY;
    document.getElementById("max-height").style.height = footerTop + 100 + "px";
    document.getElementById("max-height1").style.height = footerTop + 100 + "px";
}, 200);
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
  if(document.URL.includes("chi_siamo.html"))
  {
    closePopup(1, 1);
    closePopup(2,1);
    closePopup(3,1);
  }
  recensione.style.display = "block";
  window.addEventListener('click', focus_recensione);
}