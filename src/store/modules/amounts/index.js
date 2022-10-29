import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

export default {
    namespaced: true,
    state() {
        return {
            ingredients: {
                'r0': {
                    'i0': 2.7,
                    'i1': 0.5,
                    'i2': 2,
                    'i3': 2,
                    'i4': 2,
                    'i5': 2,
                    'i6': 1,
                    'i7': 7,
                    'i8': 1,
                    'i9': 1,
                    'i10': 0.5,
                    'i11': 2,
                    'i12': 1,
                    'i13': 0.5,
                    'i14': 0.25,
                    'i15': 2,
                }
            },
            servings: { 'r0': 1 }
        }
    },
    getters,
    actions,
    mutations,
}