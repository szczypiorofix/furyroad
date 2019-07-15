import React from 'react';
import './App.css';
import { Game } from './components/game/Game';

import { store, unsubscribe } from './redux/store';
import { addTodo, changeVisibility } from './redux/actions';


function App() {
  console.log(store.getState());

  store.dispatch(addTodo('Hello !!!'));
  store.dispatch(addTodo('Hola !!!'));
  store.dispatch(addTodo('Guten morgen !!!'));
  store.dispatch(addTodo('Siemanko !!!'));


  store.dispatch(changeVisibility("myfilter"));

  unsubscribe();

  return (
    <Game />
  );
}

export default App;
