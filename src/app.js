// Nous créons une fonction qui servira à ajouter un élément dans le UL à partir d'un objet tâche
const addTodo = (item) => {
    // On sélectionne le <ul>
const container = document.querySelector("ul");

// On ajoute du HTML à la fin du <ul>
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
};



const SUPABASE_URL = "https://nbiaxhslvvqyrjtugqem.supabase.co/rest/v1/todos";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaWF4aHNsdnZxeXJqdHVncWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MDc5MjQsImV4cCI6MTk5MzA4MzkyNH0.29GSRlgCEAY7kVEZBepiRjJQn5DaKZK1tIROgBm1Ihw";

// Lorsque les éléments du DOM sont tous connus
document.addEventListener("DOMContentLoaded", () => {
  // Appel HTTP vers Supabase
  fetch(`${SUPABASE_URL}?order=created_at`, {
    headers: {
      apiKey: SUPABASE_API_KEY,
    },
  })
    .then((response) => response.json())
    .then((items) => {
      items.forEach((item) => addTodo(item));
    });
});



// On souhaite réagir à chaque fois que le formulaire est soumis
document.querySelector("form").addEventListener("submit", (event) => {
    // On souhaite aussi empêcher le rechargement de la page
    event.preventDefault();

    // On récupère l'input
    const input = document.querySelector('input[name="todo-text"]');

    // On créé une nouvelle tâche avec pour text la valeur tapée dans l'input
    const item = {
        id: Date.now(),
        text: input.value,
        done: false,
    };

    // On appelle la fonction créée plus tôt qui ajoutera la tâche dans le <ul>
    addTodo(item);

    // On vide l'input et replace le curseur dedans
    input.value = "";
    input.focus();
});