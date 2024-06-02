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

document.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('zoom-container');
  const img = document.getElementById('immagine');
  let initialDistance = 0;
  let currentScale = 1;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  let panning = false;

  function getDistance(touches) {
      const [touch1, touch2] = touches;
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      return Math.sqrt(dx * dx + dy * dy);
  }

  function limitTranslation() {
      const rect = img.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const minX = Math.min(0, containerRect.width - rect.width);
      const maxX = 0;
      const minY = Math.min(0, containerRect.height - rect.height);
      const maxY = 0;

      translateX = Math.max(minX, Math.min(translateX, maxX));
      translateY = Math.max(minY, Math.min(translateY, maxY));
  }

  img.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
          initialDistance = getDistance(e.touches);
      } else if (e.touches.length === 1) {
          panning = true;
          startX = e.touches[0].clientX - translateX;
          startY = e.touches[0].clientY - translateY;
          img.style.cursor = 'grabbing';
      }
  });

  img.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
          e.preventDefault(); // Previeni lo scrolling durante il pinch

          const currentDistance = getDistance(e.touches);
          const scaleChange = currentDistance / initialDistance;
          currentScale = Math.min(Math.max(1, scaleChange), 3); // Limita lo zoom tra 1x e 3x

          img.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
      } else if (e.touches.length === 1 && panning) {
          translateX = e.touches[0].clientX - startX;
          translateY = e.touches[0].clientY - startY;

          limitTranslation();

          img.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
      }
  });

  img.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
          initialDistance = 0;
      }
      if (e.touches.length === 0) {
          panning = false;
          img.style.cursor = 'grab';
      }
  });

  img.addEventListener('touchcancel', (e) => {
      panning = false;
      img.style.cursor = 'grab';
  });
});