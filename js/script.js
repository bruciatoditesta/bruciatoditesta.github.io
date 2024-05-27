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
  document.querySelector('#testo-paese').scrollIntoView({
    behavior: 'smooth'
});
}

function backToMap() {
  // Mostra la mappa principale
  // Nascondi i dettagli del paese
  document.getElementById("container-mappa").style.display = "block";
  document.getElementById('titolo_paese').innerText = '';
  document.getElementById('testo_paese').innerText = '';
  document.getElementById('immagine_paese').src = '';
  
  // Nascondi il pulsante "Torna alla Mappa"
  document.querySelector('#container-mappa').scrollIntoView({
    behavior: 'smooth'
});
  document.getElementById('back-to-map').style.display = 'none';
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

const img = document.getElementById('zoom-image');
let scale = 1;
let startDistance = 0;
let isZooming = false;

img.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
        event.preventDefault();
        startDistance = getDistance(event.touches[0], event.touches[1]);
        isZooming = true;
    }
}, { passive: false });

img.addEventListener('touchmove', (event) => {
    if (isZooming && event.touches.length === 2) {
        event.preventDefault();
        const currentDistance = getDistance(event.touches[0], event.touches[1]);
        scale = Math.max(1, Math.min(4, scale * (currentDistance / startDistance))); // Limita lo zoom tra 1x e 4x
        img.style.transform = `scale(${scale})`;
        startDistance = currentDistance;
    }
}, { passive: false });

img.addEventListener('touchend', (event) => {
    if (event.touches.length < 2) {
        isZooming = false;
    }
}, { passive: false });

function getDistance(touch1, touch2) {
    return Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
}