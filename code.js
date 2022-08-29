let oldName = "";
let mapIdName = [];
let selectId = -1;
const userAction = async (value) => {

const response = await fetch('https://software.appvizer.com/graphql', {
    method: 'POST',
    body: `{"query": "{softwareByPartialName(domain: FR take:10 partialName: \\"`+ value +`\\" orderBy: CLAIMABLE_FIRST) {id name hasOwner logo {url}}}"}`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); 
  let content = "<table style='width: 100%'>";
  
  if(myJson.data.softwareByPartialName.length) {
    content = content + '<tr><td colspan=3><label class="title_rules">Génial, votre logiciel existe peut-être déjà sur Appvizer !</label></td></tr>';
    content = content + '<tr><td colspan=3><label class="title_rules">Vous pouvez réclamer une page existante :</label></td></tr>';
  }
  myJson.data.softwareByPartialName.slice(0, 10).forEach( service => {
    content = content + '<tr class="proposition"><td><img src="'+service.logo.url+'" style="width: 50px; height: 50px"></td><td style="text-align: left"><label for="'+service.id+'" class="service_name" style="padding: 5px;">'+service.name+'</label></td><td style="width: 15px"><input type="radio" id="'+service.id+'" name="service" value="'+service.id+'" '+(service.name.toUpperCase() === value.toUpperCase()?'checked':'')+'><svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6668 1L5.50016 10.1667L1.3335 6" stroke="#122959" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg></td><tr/>';
    mapIdName[service.id]= service;
  });
  if(myJson.data.softwareByPartialName.length) {
    content = content + '<tr><td colspan=3><label class="title_rules">Ou créer une nouvelle page :</label></td></tr>'
    content = content + '<tr><td colspan=3><label class="rules">Des vérifications seront faites par notre équipe pour s’assurer qu’il ne s’agit pas d’un doublon.</label></td></tr>'
    content = content + '<tr class="proposition"><td><svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1996 2.82158V12.1C16.1996 13.0548 15.8203 13.9704 15.1452 14.6456C14.4701 15.3207 13.5544 15.7 12.5996 15.7H3.32121C3.53185 16.0648 3.83481 16.3678 4.19964 16.5784C4.56448 16.7891 4.97833 16.9 5.39961 16.9H12.5996C13.8726 16.9 15.0935 16.3943 15.9937 15.4941C16.8939 14.5939 17.3996 13.373 17.3996 12.1V4.89998C17.3996 4.4787 17.2887 4.06484 17.0781 3.70001C16.8674 3.33518 16.5644 3.03221 16.1996 2.82158ZM10.7996 7.89998C10.9587 7.89998 11.1114 7.83676 11.2239 7.72424C11.3364 7.61172 11.3996 7.45911 11.3996 7.29998C11.3996 7.14085 11.3364 6.98823 11.2239 6.87571C11.1114 6.76319 10.9587 6.69998 10.7996 6.69998H8.39961V4.29998C8.39961 4.14085 8.3364 3.98823 8.22387 3.87571C8.11135 3.76319 7.95874 3.69998 7.79961 3.69998C7.64048 3.69998 7.48787 3.76319 7.37534 3.87571C7.26282 3.98823 7.19961 4.14085 7.19961 4.29998V6.69998H4.79961C4.64048 6.69998 4.48787 6.76319 4.37535 6.87571C4.26282 6.98823 4.19961 7.14085 4.19961 7.29998C4.19961 7.45911 4.26282 7.61172 4.37535 7.72424C4.48787 7.83676 4.64048 7.89998 4.79961 7.89998H7.19961V10.3C7.19961 10.4591 7.26282 10.6117 7.37534 10.7242C7.48787 10.8368 7.64048 10.9 7.79961 10.9C7.95874 10.9 8.11135 10.8368 8.22387 10.7242C8.3364 10.6117 8.39961 10.4591 8.39961 10.3V7.89998H10.7996ZM12.5996 0.0999756C13.2361 0.0999756 13.8466 0.352832 14.2967 0.802919C14.7468 1.25301 14.9996 1.86346 14.9996 2.49998V12.1C14.9996 12.7365 14.7468 13.3469 14.2967 13.797C13.8466 14.2471 13.2361 14.5 12.5996 14.5H2.99961C2.36309 14.5 1.75264 14.2471 1.30255 13.797C0.852466 13.3469 0.599609 12.7365 0.599609 12.1V2.49998C0.599609 1.86346 0.852466 1.25301 1.30255 0.802919C1.75264 0.352832 2.36309 0.0999756 2.99961 0.0999756H12.5996ZM13.7996 2.49998C13.7996 2.18172 13.6732 1.87649 13.4481 1.65145C13.2231 1.4264 12.9179 1.29998 12.5996 1.29998H2.99961C2.68135 1.29998 2.37612 1.4264 2.15108 1.65145C1.92604 1.87649 1.79961 2.18172 1.79961 2.49998V12.1C1.79961 12.4182 1.92604 12.7235 2.15108 12.9485C2.37612 13.1735 2.68135 13.3 2.99961 13.3H12.5996C12.9179 13.3 13.2231 13.1735 13.4481 12.9485C13.6732 12.7235 13.7996 12.4182 13.7996 12.1V2.49998Z" fill="#122959"/></svg></td><td style="text-align: left"><label for="-1" class="service_name" style="padding: 5px;">'+value+'</label></td><td ><input type="radio"  id="-1" name="service" value="-1" ><svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6668 1L5.50016 10.1667L1.3335 6" stroke="#122959" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg></td><tr/>';
  } else {
    content = content + '<tr><td colspan=3><label class="title_rules">Créer une page pour votre logiciel :</label></td></tr>'
    content = content + '<tr><td><svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1996 2.82158V12.1C16.1996 13.0548 15.8203 13.9704 15.1452 14.6456C14.4701 15.3207 13.5544 15.7 12.5996 15.7H3.32121C3.53185 16.0648 3.83481 16.3678 4.19964 16.5784C4.56448 16.7891 4.97833 16.9 5.39961 16.9H12.5996C13.8726 16.9 15.0935 16.3943 15.9937 15.4941C16.8939 14.5939 17.3996 13.373 17.3996 12.1V4.89998C17.3996 4.4787 17.2887 4.06484 17.0781 3.70001C16.8674 3.33518 16.5644 3.03221 16.1996 2.82158ZM10.7996 7.89998C10.9587 7.89998 11.1114 7.83676 11.2239 7.72424C11.3364 7.61172 11.3996 7.45911 11.3996 7.29998C11.3996 7.14085 11.3364 6.98823 11.2239 6.87571C11.1114 6.76319 10.9587 6.69998 10.7996 6.69998H8.39961V4.29998C8.39961 4.14085 8.3364 3.98823 8.22387 3.87571C8.11135 3.76319 7.95874 3.69998 7.79961 3.69998C7.64048 3.69998 7.48787 3.76319 7.37534 3.87571C7.26282 3.98823 7.19961 4.14085 7.19961 4.29998V6.69998H4.79961C4.64048 6.69998 4.48787 6.76319 4.37535 6.87571C4.26282 6.98823 4.19961 7.14085 4.19961 7.29998C4.19961 7.45911 4.26282 7.61172 4.37535 7.72424C4.48787 7.83676 4.64048 7.89998 4.79961 7.89998H7.19961V10.3C7.19961 10.4591 7.26282 10.6117 7.37534 10.7242C7.48787 10.8368 7.64048 10.9 7.79961 10.9C7.95874 10.9 8.11135 10.8368 8.22387 10.7242C8.3364 10.6117 8.39961 10.4591 8.39961 10.3V7.89998H10.7996ZM12.5996 0.0999756C13.2361 0.0999756 13.8466 0.352832 14.2967 0.802919C14.7468 1.25301 14.9996 1.86346 14.9996 2.49998V12.1C14.9996 12.7365 14.7468 13.3469 14.2967 13.797C13.8466 14.2471 13.2361 14.5 12.5996 14.5H2.99961C2.36309 14.5 1.75264 14.2471 1.30255 13.797C0.852466 13.3469 0.599609 12.7365 0.599609 12.1V2.49998C0.599609 1.86346 0.852466 1.25301 1.30255 0.802919C1.75264 0.352832 2.36309 0.0999756 2.99961 0.0999756H12.5996ZM13.7996 2.49998C13.7996 2.18172 13.6732 1.87649 13.4481 1.65145C13.2231 1.4264 12.9179 1.29998 12.5996 1.29998H2.99961C2.68135 1.29998 2.37612 1.4264 2.15108 1.65145C1.92604 1.87649 1.79961 2.18172 1.79961 2.49998V12.1C1.79961 12.4182 1.92604 12.7235 2.15108 12.9485C2.37612 13.1735 2.68135 13.3 2.99961 13.3H12.5996C12.9179 13.3 13.2231 13.1735 13.4481 12.9485C13.6732 12.7235 13.7996 12.4182 13.7996 12.1V2.49998Z" fill="#122959"/></svg></td><td style="text-align: left"><label for="-1" class="service_name" style="padding: 5px;">'+value+'</label></td><td ><input type="radio"  id="-1" name="service" value="-1" ></td><tr/>';
  }
  
  
  mapIdName[-1]= {name : value};
  content = content + "</table>";
  const divServices = document.getElementById('lst-services');

  divServices.innerHTML = content;
  divServices.style.width = '100%';

  var radios = document.getElementsByName("service");
  const divService = document.getElementById('select-service');
  radios.forEach(radio => {
    radio.addEventListener( "change", (event) => {
      radios.forEach(radioToUpdate => {
          radioToUpdate.parentNode.parentNode.classList.remove("radio_select");
      });
      radio.parentNode.parentNode.classList.add("radio_select");
      selectId = radio.value;
      divService.innerHTML = '<h1 class="service_name"><img src="'+mapIdName[radio.value].logo.url+'" style="width: 50px; height: 50px">'+mapIdName[radio.value].name+'</h1>';
    });
  });
}

var page = 0;
setTimeout(()=> {
  var previousArrow = document.getElementById("previous-arrow");
  var nextArrow = document.getElementById("next-arrow");
  var previous = document.getElementById("previous");
  var next = document.getElementById("next");
  var serviceName = document.getElementById("service_name");
  next.addEventListener("click", () => {
    next.textContent = 'Continuer →';
    page++;
   nextArrow.classList.add("continue");
    if(page === 1 || page === 4) {
      previousArrow.style.visibility = "hidden";
    	previous.style.display = "none";
    	next.style.display = "none";
    } else {
      previousArrow.style.visibility = "visible";
      previous.style.display = "inline-block";
    }
    if (page === 2 ) {
    	const divServices = document.getElementById('lst-services');
       divServices.innerHTML = '<p>⌛</p>'
       userAction(serviceName.value);
    } if (page === 4) {
    	const title = document.getElementById('title_success');
      const sentence = document.getElementById('sentence_success');
      if(selectId === -1 ) {
      	title.innerText = "Nous avons bien reçu votre demande de création de page pour votre logiciel !";
        sentence.innerText = "Vous allez recevoir un email sur votre adresse pierre.paul@moo.com, surveillez votre boite de réception.";
      } else {
      	title.innerText = "Nous avons bien reçu votre demande de réclamation de page pour votre logiciel !";
        sentence.innerText = "Nous allons procéder à des vérifications d’usage et nous vous recontacterons prochainement. Surveillez votre boite de réception pierre.paul@moo.com.";
      }
    }
    console.log(page);
  });
  previous.addEventListener("click", () => {
    page--;
    if(page === 1) {
      previousArrow.style.visibility = "hidden";
      previous.style.display = "none";
    } else {
      previousArrow.style.visibility = "visible";
      previous.style.display = "inline-block";
    }
  });
  serviceName.addEventListener('keyup', (event) => {
    if(serviceName.value.length > 1) {
    	next.style.display = "inline-block";
    } else {
    	next.style.display = "none";
    }
  });
}, 1000);


function onSubmitHubspot(forms) {
  console.log(forms);
}
