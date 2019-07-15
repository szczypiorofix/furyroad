import React from 'react';
import './App.css';
import { Game } from './components/game/Game';

import { store, unsubscribe } from './redux/store';
import { addTodo, changeVisibility, SET_VISIBILITY_FILTER } from './redux/actions';


function App() {
  // console.log(store.getState());
  
  // store.subscribe(store.getState());

  store.dispatch(addTodo('Hello !!!'));
  // store.dispatch(addTodo('Hola !!!'));
  // store.dispatch(addTodo('Guten morgen !!!'));
  // store.dispatch(addTodo('Siemanko !!!'));
  store.dispatch(changeVisibility(SET_VISIBILITY_FILTER));

  unsubscribe();

  return (
    <Game />
  );
}

export default App;
