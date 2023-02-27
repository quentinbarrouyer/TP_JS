// On importe dans notre module principal des fonctions en provenance
// du module api.js
import {
    loadTodoItemsFromApi,
    toggleComplete,
    saveTodoItemToApi,
} from "./api.js";



// Dès le chargement des élements du DOM
document.addEventListener("DOMContentLoaded", () => {
    // On appelle l'API pour récupérer les tâches
    loadTodoItemsFromApi().then((items) => {
        // Pour chaque tâche, on l'affiche dans l'interface
        items.forEach((item) => addTodo(item));
    });
});
  
/**
 * Gestion du click sur une Checkbox
 * @param {MouseEvent} e
 */
const onClickCheckbox = (e) => {
    // On récupère l'identifiant de la tâche cliquée (todo-1 ou todo-12 par exemple)
    const inputId = e.target.id;
    // On ne garde que la partie numérique (1 ou 12 par exemple)
    const id = +inputId.split("-").pop();
    // On récupère le fait que la checkbox soit cochée ou pas lors du click
    const isDone = e.target.checked;

    // On annule le comportement par défaut de l'événement (cocher ou décocher la case)
    // Car on ne souhaite cocher / décocher que si le traitement va au bout
    e.preventDefault();

    // On appelle l'API afin de changer le statut de la tâche
    toggleComplete(id, isDone).then(() => {
        // Lorsque c'est terminé, on coche ou décoche la case
        e.target.checked = isDone;
    });
};

/**
 * Permet d'ajouter visuellement une tâche dans l'interface
 * @param {{id: number, text: string, done: boolean}} item
 */
const addTodo = (item) => {
    // On récupère le <ul>
    const container = document.querySelector("ul");

    // On intègre le HTML de la tâche à la fin du <ul>
    container.insertAdjacentHTML(
        "beforeend",
        `
            <li>
                <label>
                    <input type="checkbox" id="todo-${item.id}" ${item.done ? "checked" : ""} /> 
                    ${item.text}
                </label>
            </li>
        `
    );

    // Alors que la tâche a été ajoutée, on attache au click sur la checkbox la fonction onClickCheckbox
    document
        .querySelector("input#todo-" + item.id)
        .addEventListener("click", onClickCheckbox);
};

// Gestion de la soumission du formulaire
document.querySelector("form").addEventListener("submit", (e) => {
    // On annule le comportement par défaut de la soumission 
    // (qui aurait pour effet de recharger la page, ce qu'on ne souhaite pas vu qu'on souhaite gérer nous-même le comportement)
    e.preventDefault();

    // On récupère l' <input /> du formulaire
    const input = document.querySelector('input[name="todo-text"]');

    // On créé une tâche avec la valeur de l'<input />
    const item = {
        text: input.value,
        done: false,
    };

    // On appelle l'API afin de sauver la nouvelle tâche
    saveTodoItemToApi(item).then((items) => {
        // La réponse de l'API est un tableau avec les tâches
        // touchées par le traitement, on prend la première (la seule en fait)
        // Et on l'affiche dans l'interface
        addTodo(items[0]);

        // On vide l'<input /> et on remet le curseur dessus
        input.value = "";
        input.focus();
    });
});