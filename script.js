//Création modal
let modal = document.createElement("div");
modal.id = "modal";
document.body.appendChild(modal);

let overlay = document.createElement("div");
overlay.id = "overlay";
document.body.appendChild(overlay);
overlay.addEventListener("click", closeModal);
function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}
// Tu doit stocker les données des utilisateurs dans une variable
let usersData;

let url = "https://reqres.in/api/users?per_page=12";
fetch(url)
  .then((response) => response.json())
  .then((json) => {
    usersData = json.data;

    const markup = usersData.map((el) => {
      return `<div class="all-users">
        <li class="user">
        
            <div class="image-container"  id="${el.id}">
              <img class="img ll" id="${el.id}" src="${el.avatar}" alt="avatar-user">
            </div>
            <div class="name-container ll id="${el.id}""> 
                <span class="firstName ll id="${el.id}"">${el.first_name}</span>
                <span class="lastName ll id="${el.id}"">${el.last_name}</span>
            </div> 
            
            <a class="contact-btn" href="mailto:${el.email}">Contacter</a>
            </li>
            
        </div>`;
    });

    document.querySelector("#root").innerHTML = markup.join("");

    document.querySelectorAll(".ll").forEach((elem) =>
      elem.addEventListener("click", function () {
        // Transmettre l'ID de l'utilisateur à la fonction afficheModal
        afficheModal(elem.getAttribute("id"));
      })
    );
  });

function afficheModal(userId) {
  modal.style.display = "block";
  overlay.style.display = "block";

  // Trouver l'utilisateur grace à son ID
  const user = usersData.find((u) => u.id == userId);

  const markup = `
        <div class="popup">
            
            
              <img  src="${user.avatar}" alt="avatar-user">
            
                
                    <h2>${user.first_name} ${user.last_name} </h2>
                    <p>👏Employé(e) 👏 du mois 👏👑🎊🎉✨</p>
                
                <button type="button" class="close-btn" >Fermer</button>
            
            
        </div>`;

  document.querySelector("#modal").innerHTML = markup;
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", close);
  function close() {
    modal.style.display = "none";
    overlay.style.display = "none";
  }
}
