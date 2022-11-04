import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

export default {
    namespaced: true,
    state() {
        return {
            sample: {
                recipe: {
                    id: 'r0',
                    name: 'Napa Cabbage Kimchi',
                    link: 'https://www.maangchi.com/recipe/tongbaechu-kimchi',
                    servingsId: ["s0"],
                    ingredientIds: ["i0", "i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9", "i10", "i11", "i12", "i13", "i14", "i15",]

                },
                servings: {
                    id: "s0",
                    amount: 1
                },
                ingredients: [
                    {
                        id: 'i0',
                        amount: 2.7,
                        unit: 'pounds',
                        name: 'napa cabbage',
                    },
                    {
                        id: 'i1',
                        amount: 0.5,
                        unit: 'cup',
                        name: 'kosher salt',
                    },
                    {
                        id: 'i2',
                        amount: 2,
                        unit: 'cups',
                        name: 'water',
                    },
                    {
                        id: 'i3',
                        amount: 2,
                        unit: 'tbsps',
                        name: 'sweet rice flour',
                    },
                    {
                        id: 'i4',
                        amount: 2,
                        unit: 'tbsp',
                        name: 'sugar',
                    },
                    {
                        id: 'i5',
                        amount: 2,
                        unit: 'cups',
                        name: 'korean radish',
                    },
                    {
                        id: 'i6',
                        amount: 1,
                        unit: 'cup',
                        name: 'carrot',
                    },
                    {
                        id: 'i7',
                        amount: 7,
                        unit: 'pieces',
                        name: 'green onions',
                    },
                    {
                        id: 'i8',
                        amount: 1,
                        unit: 'cup',
                        name: 'asian chives',
                    },
                    {
                        id: 'i9',
                        amount: 1,
                        unit: 'cup',
                        name: 'dropwort',
                    },
                    {
                        id: 'i10',
                        amount: 0.5,
                        unit: 'cup',
                        name: 'garlic',
                    },
                    {
                        id: 'i11',
                        amount: 2,
                        unit: 'tsp',
                        name: 'ginger',
                    },
                    {
                        id: 'i12',
                        amount: 1,
                        unit: 'piece',
                        name: 'onion',
                    },
                    {
                        id: 'i13',
                        amount: 0.5,
                        unit: 'cup',
                        name: 'fish sauce',
                    },
                    {
                        id: 'i14',
                        amount: 0.25,
                        unit: 'cup',
                        name: 'fermented salted shrimp',
                    },
                    {
                        id: 'i15',
                        amount: 2,
                        unit: 'cups',
                        name: 'red pepper flakes',
                    },
                ]
            },
            recipes: null
        }
    },
    getters,
    actions,
    mutations,
}