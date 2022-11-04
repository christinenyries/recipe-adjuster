// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBm1Hf_uMjBpnyYedAPqDRR8rrqFpeW9xo",
    authDomain: "recipe-adjuster-8369f.firebaseapp.com",
    databaseURL: "https://recipe-adjuster-8369f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "recipe-adjuster-8369f",
    storageBucket: "recipe-adjuster-8369f.appspot.com",
    messagingSenderId: "357840224889",
    appId: "1:357840224889:web:bbf19795e838edff1a0aa8",
    measurementId: "G-HSCL331X3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Auth and get a reference to the service
const auth = getAuth(app);

// Add Data
function addRecipe(userId, name, link, servings, ingredients) {
    const ingredientIds = addIngredients(userId, ingredients);
    const servingsId = addServings(userId, servings);

    const recipeId = push(ref(database, `recipes/${userId}`), {
        name,
        link,
        ingredientIds,
        servingsId
    }).key;

    return { recipeId, ingredientIds, servingsId };
}

function addIngredients(userId, ingredients) {
    const ingredientIds = []
    for (const ingredient of ingredients) {
        const ingredientId = push(ref(database, `ingredients/${userId}`), ingredient).key;
        ingredientIds.push(ingredientId)
    }
    return ingredientIds;
}


function addServings(userId, servings) {
    const servingsId = push(ref(database, `servings/${userId}`), servings).key;
    return servingsId;
}

// Remove Data
function removeRecipe(userId, recipeId, ingredientIds, servingsId) {
    removeIngredients(userId, ingredientIds);
    removeServings(userId, servingsId);
    remove(ref(database, `recipes/${userId}/${recipeId}`));
}

function removeIngredients(userId, ingredientIds) {
    for (const ingredientId of ingredientIds) {
        remove(ref(database, `ingredients/${userId}/${ingredientId}`));
    }
}

function removeServings(userId, servingsId) {
    remove(ref(database, `servings/${userId}/${servingsId}`));
}


// Read Data
function load(path, callback) {
    const dataRef = ref(database, path);

    return onValue(dataRef, (snapshot) => {
        callback(snapshot.val());
    })
}

// Update Data
function updateIngredient(ingredient) {
    return update(ref(database, `ingredients`), ingredient)
}

function updateServings(servings) {
    return update(ref(database, `servings`), servings)
}

// Authentication
async function signup(email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
}

async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
}

async function logout() {
    await signOut(auth);
}

function userStateChanged(callback) {
    onAuthStateChanged(auth, callback);
}

export { addRecipe, load, updateIngredient, updateServings, signup, login, logout, userStateChanged, removeRecipe };
