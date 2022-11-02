export default {
    adjustAmount(context, payload) {
        context.commit('adjustAmount', payload)
    },
    addAmount(context, payload) {
        const { ingredients, servings, recipeId } = payload

        const amount = {
            id: 'a1',
            recipeId,
            ingredients,
            servings
        }
        context.commit('addAmount', amount)

        return amount;
    }
}