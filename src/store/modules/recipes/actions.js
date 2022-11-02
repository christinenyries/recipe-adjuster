export default {
    addRecipe(context, payload) {
        const recipe = {
            id: 'r1',
            name: payload.name,
            link: payload.link,
            ingredients: payload.ingredients.map((ingredient, idx) => ({
                id: `i${idx}`,
                name: ingredient.name,
                unit: ingredient.unit
            }))
        };
        context.commit('addRecipe', recipe);
        return recipe;
    }
}