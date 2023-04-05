/*
    Полиморфный код - переиспользование кода (функции, классы)
    Инкапсуляция - код не должен выполнять то, что от него не требуется
    sum(a,b) {
        // console.log(a+b) - плохо
        return a + b;
    }
    sum(2,3)
*/
function createCard(pet, tag) {
    const card = document.createElement("div");
    card.className = "card";
    const cardImg = document.createElement("div");
    cardImg.className = "pic";
    if (pet.image) {
        cardImg.style.backgroundImage = `url(${pet.image})`;
    } else {
        cardImg.classList.add("tmp");
    }
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = pet.name;
    const cardLike = document.createElement("i");
    cardLike.className = "like fa-heart";
    cardLike.classList.add(pet.favorite ? "fa-solid" : "fa-regular");
    cardLike.addEventListener("click", e => {
        // поставить лайк (сердечко, id котика, явяляется ли любимчиком true/false)
        setLike(cardLike, pet.id, !pet.favorite); // (true => false; false => true)
    })
    // fa v5.15.0
    // cardLike.classList.add(pet.favorite ? "fas" : "far");
    card.append(cardImg, cardTitle, cardLike);
    tag.append(card);
    // cardImg.style.height = cardImg.offsetWidth + "px";
}

function setLike(el, id, like) {
    el.classList.toggle("fa-solid");
    el.classList.toggle("fa-regular");

    fetch(path + "/update/" + id, {
        method: "put",
        // без headers на сервер прийдет undefined
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({favorite: like})
    })
    .then(res => res.blob())
    .then(data => {
        console.log(data);
    })
}