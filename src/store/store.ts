import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


import counterReducer from '../components/counter/counterSlice'
import answersReducer from '../components/organisms/test/Test.slice'

const rootReducer = combineReducers({
    counter: counterReducer,
    answers: answersReducer,
});




// react-persist configs
const persistConfig = {
    key: 'root',
    storage,
}

// react-persist configs
const persistedReducer = persistReducer(persistConfig, rootReducer)


export function makeStore() {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => // react-persist and redux-toolkit configs
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

// react-persist configs
export const persistor = persistStore(store);

export default store