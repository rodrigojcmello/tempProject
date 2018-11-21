import { combineReducers, createStore } from 'redux';
import loader from './loader/loaderReducers';
import barraSuperior from "./barrasuperior/baraReducers";

export const reduxStore = createStore(combineReducers({
    loader,
    barraSuperior
}));