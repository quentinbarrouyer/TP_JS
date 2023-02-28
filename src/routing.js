import { displayTodoList, displayTodoDetails } from "./ui";



/**
 * Appelle la fonction correspondante à une URL donnée
 * @param {string} url 
 */
export const applyRouting = (url) => {
    let params;

    // Si l'URL ressemble à /12/details
    if (params = url.match(/^\/(\d+)\/details$/)) {
        // On cherche à afficher le détail d'une tâche
        const id = +params[1];

        displayTodoDetails(id);
        return;
    }
    // Dans tous les autres cas, on présente la liste des tâches
    displayTodoList();
}



/**
 * Gestion du click sur un lien
 * @param {MouseEvent} e 
 */
 export const onClickLink = (e) => {
    // On empêche le comportement par défaut de l'événement
    // qui reviendrait à réellement naviguer vers l'URL
    e.preventDefault();

    // On récupère l'URL du lien
    const href = e.target.href;

    // On ajoute à l'historique du navigateur ce lien (et par là même, on modifie l'URL dans la barre d'adresse)
    window.history.pushState({}, '', href);

    // On déclenche manuellement un événement popstate afin que le routeur soit conscient qu'il doit retravailler
    window.dispatchEvent(new PopStateEvent('popstate'));
}



// On ajoute la gestion de l'événement popstate qui a lieu à chaque fois
// que l'historique du navigateur change
window.addEventListener('popstate', (e) => {
    console.log("Changement d'URL");
    applyRouting(window.location.pathname);
});