const inputid = document.querySelector("#id");
const inputUsername = document.querySelector("#username");
const inputDarab = document.querySelector("#darab");
const buttonRead = document.querySelector("#read");
const buttonCreate = document.querySelector("#create");
const buttonUpdate = document.querySelector("#update");
const buttonDelete = document.querySelector("#delete");
const divCards = document.querySelector("#cards");

window.addEventListener("load", getAllUsers); //-- a lap betöltésekor is ...
buttonRead.addEventListener("click", getAllUsers);

async function getAllUsers() {
    let endpoint = "https://retoolapi.dev/Hfa9uy/data";
    try {
        const response = await fetch(endpoint);
        const users = await response.json();
        showAllUsers(users);
    } catch (error) {
        console.log(error);
    }

}

//--- megjeleníti az összes usert ---------------------
function showAllUsers(users) {
    let html = "";
    users.forEach(async (user) => {
        let imageUrl = `https://picsum.photos/200?random=${Math.random()}`;
        try {
            html += `
                <div class="card m-1" style="width: 18rem;">
                    <img src="${imageUrl}" class="card-img-top" alt="noimage.jpg">
                    <div class="card-body">
                        <h5 class="card-title">${user.id}. ${user.username}</h5>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, illum! Labore iure quam quasi sed perferendis tempora amet tenetur assumenda consequatur, dicta corrupti dolores. Nam enim ratione dignissimos quos quasi.</p>
                        <p class="card-text">Darab: ${user.darab}</p>
                        <button class="btn btn-primary" onClick="betoltInputMezobe(${user.id})">Kiválaszt</button>
                    </div>
                </div>
            `;
        } catch (error) {
            console.log(error);
        }
    });
    divCards.innerHTML = html;
}

async function betoltInputMezobe(id) {
    let url = `https://retoolapi.dev/Hfa9uy/data/${id}`;
    try {
        const response = await fetch(url);
        const users = await response.json();
        inputid.value = users.id;
        inputUsername.value = users.username;
        inputDarab.value = users.darab;
        location.href = "#formEleje";
    } catch (error) {
        console.log(error);
    }
}

//-- új user létrehozása -------------------------------
buttonCreate.addEventListener("click", async () => {
    let url = "https://retoolapi.dev/Hfa9uy/data";
    let data = {
        username: inputUsername.value,
        darab: inputDarab.value
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const user = await response.json();
        beviteliMezokAlaphelyzetbe();
        getAllUsers();
    } catch (error) {
        console.log(error);
    }
});

//-- user módosítása ------------------------------------
buttonUpdate.addEventListener("click", async () => {
    let url = `https://retoolapi.dev/Hfa9uy/data/${inputid.value}`;
    let data = {
        username: inputUsername.value,
        darab: inputDarab.value
    };
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const user = await response.json();
        beviteliMezokAlaphelyzetbe();
        getAllUsers();
    } catch (error) {
        console.log(error);
    }
});

//-- user törlése ----------------------------------------
buttonDelete.addEventListener("click", async () => {
    let url = `https://retoolapi.dev/Hfa9uy/data/${inputid.value}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        const user = await response.json();
        beviteliMezokAlaphelyzetbe();
        getAllUsers();
    } catch (error) {
        console.log(error);
    }
});

function beviteliMezokAlaphelyzetbe() {
    inputid.value = "";
    inputUsername.value = "";
    inputDarab.value = "1";
}