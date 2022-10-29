import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

export default {
    namespaced: true,
    state() {
        return {
            recipeId: 'r0',
            recipes: {
                'r0': {
                    id: 'r0',
                    name: 'Napa Cabbage Kimchi',
                    link: 'https://www.maangchi.com/recipe/tongbaechu-kimchi',
                    ingredients: [
                        {
                            id: 'i0',
                            unit: 'pounds',
                            name: 'napa cabbage',
                        },
                        {
                            id: 'i1',
                            unit: 'cup',
                            name: 'kosher salt',
                        },
                        {
                            id: 'i2',
                            unit: 'cups',
                            name: 'water',
                        },
                        {
                            id: 'i3',
                            unit: 'tbsps',
                            name: 'sweet rice flour',
                        },
                        {
                            id: 'i4',
                            unit: 'tbsp',
                            name: 'sugar',
                        },
                        {
                            id: 'i5',
                            unit: 'cups',
                            name: 'korean radish',
                        },
                        {
                            id: 'i6',
                            unit: 'cup',
                            name: 'carrot',
                        },
                        {
                            id: 'i7',
                            unit: 'pieces',
                            name: 'green onions',
                        },
                        {
                            id: 'i8',
                            unit: 'cup',
                            name: 'asian chives',
                        },
                        {
                            id: 'i9',
                            unit: 'cup',
                            name: 'dropwort',
                        },
                        {
                            id: 'i10',
                            unit: 'cup',
                            name: 'garlic',
                        },
                        {
                            id: 'i11',
                            unit: 'tsp',
                            name: 'ginger',
                        },
                        {
                            id: 'i12',
                            unit: 'piece',
                            name: 'onion',
                        },
                        {
                            id: 'i13',
                            unit: 'cup',
                            name: 'fish sauce',
                        },
                        {
                            id: 'i14',
                            unit: 'cup',
                            name: 'fermented salted shrimp',
                        },
                        {
                            id: 'i15',
                            unit: 'cups',
                            name: 'red pepper flakes',
                        },
                    ]
                },
            }
        }
    },
    getters,
    actions,
    mutations,
}