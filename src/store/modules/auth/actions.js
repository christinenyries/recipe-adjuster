import { signup, login, logout, userStateChanged } from '@/firebase/index.js'

export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },
    async logout(context) {
        await logout();

        userStateChanged((user) => context.commit('setUser', { userId: user?.uid }))
    },
    async auth(context, payload) {
        const { mode, email, password } = payload
        const action = mode === 'login' ? login : signup;
        await action(email, password);

        userStateChanged((user) => context.commit('setUser', { userId: user?.uid }))
    },
}