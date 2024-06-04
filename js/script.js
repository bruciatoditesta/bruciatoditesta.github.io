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
  let currentScale = 1;
  let translateX = 0;
  let translateY = 0;
  let isZoomed = false; // Track zoom state

  img.addEventListener('dblclick', (e) => {
      const rect = img.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check if the click is inside the image
      if (
          clickX >= 0 && clickX <= rect.width &&
          clickY >= 0 && clickY <= rect.height
      ) {
          if (!isZoomed) {
              // Calculate the new translation to center the clicked point
              translateX = (container.clientWidth / 2 - clickX) / currentScale;
              translateY = (container.clientHeight / 2 - clickY) / currentScale;
              currentScale = 2; // Example zoom scale
          } else {
              // Reset translation and scale to original
              translateX = 0;
              translateY = 0;
              currentScale = 1;
          }

          img.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
          isZoomed = !isZoomed; // Toggle zoom state
      }
  });
});
