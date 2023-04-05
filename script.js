
fetch(path + "/show")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        if (data.length) {
            for (let pet of data) {
                createCard(pet, block);
            }
        }
    })


addBtn.addEventListener("click", e => {
    mdBox.classList.toggle("active");
});
mdClose.addEventListener("click", e => {
    mdBox.classList.remove("active");
});
mdBox.addEventListener("click", e => {
    if (e.target === e.currentTarget) {
        mdBox.classList.remove("active");
    }
});
// addForm.elements.favorite.addEventListener("change", e => {
//     console.log(e.currentTarget.value);
//     console.log(e.currentTarget.checked);
// })
addForm.addEventListener("submit", e => {
    e.stopPropagation(); // Всплытие пузырька / bubble effect
    e.preventDefault(); // Остановить действие по умолчанию - запрограммировано браузером
    // http://127.0.0.1:5500/index.html?name=&image=

    console.log(addForm);
    console.log(e.currentTarget);
    console.log(addForm.children); // обращение ко всем дочерним тегам (прямые потомки)
    console.log(addForm.elements); // элемены формы (input / button / select / textarea)
    const body = {}
    for (let i = 0; i < addForm.elements.length; i++) {
        const el = addForm.elements[i];
        if (el.name) {
            if (el.name === "favorite") {
                body[el.name] = el.checked;
            } else {
                body[el.name] = el.value;
            }
        }
    }
    // console.log(body);
    fetch(path + "/ids")
        .then(res => res.json())
        .then(ids => {
            console.log(ids);
            body.id = ids[ids.length - 1] + 1;
            console.log(body);
            return fetch(path + "/add", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        })    
        .then(res => {
            console.log(res.status);
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
})


