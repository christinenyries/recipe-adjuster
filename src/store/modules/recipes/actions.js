import { addRecipe, load, updateIngredient, updateServings, removeRecipe } from "@/firebase/index.js";

export default {
    removeRecipe(context, payload) {
        const userId = context.rootGetters['userId'];
        const { recipeId, ingredientIds, servingsId } = payload;

        removeRecipe(userId, recipeId, ingredientIds, servingsId);
    },
    addRecipe(context, payload) {
        const userId = context.rootGetters['userId'];

        const recipe = {
            name: payload.name,
            link: payload.link,
            servings: payload.servings,
            ingredients: payload.ingredients,
        }

        addRecipe(
            userId,
            recipe.name,
            recipe.link,
            recipe.servings,
            recipe.ingredients
        )
    },
    loadRecipes(context, payload) {
        const userId = context.rootGetters['userId'];
        const { callback } = payload;
        const recipes = context.getters.recipes;

        if (recipes) {
            callback(recipes);
            return;
        }

        load(`recipes/${userId}`, (data) => {
            const recipes = []
            for (const recipeId in data) {
                recipes.push({
                    id: recipeId,
                    ...data[recipeId]
                })
            }
            context.commit('setRecipes', recipes)
            callback(recipes);
        });
    },
    adjustAmounts(context, payload) {
        const userId = context.rootGetters['userId'];
        const { ingredients, servings } = payload;

        for (const ingredient of ingredients) {
            updateIngredient({
                [`${userId}/${ingredient.id}/amount`]: ingredient.amount
            });
        }

        updateServings({
            [`${userId}/${servings.id}`]: servings.amount
        });
    }
}