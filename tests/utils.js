/**
 * Permet de simuler une attente dans nos tests
 * @returns Promise<null>
 */
 export const tick = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve());
    });
}