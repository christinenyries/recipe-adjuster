export default {
    adjustAmount(state, payload) {
        const { recipeId, multiplier } = payload;
        const amount = state.amounts.find(amount => amount.recipeId === recipeId);

        for (const ingredientId of Object.keys(amount.ingredients)) {
            amount.ingredients[ingredientId] *= multiplier;
        }
        amount.servings *= multiplier;
    },
    addAmount(state, payload) {
        state.amounts.push(payload);
    },
}