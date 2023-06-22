import { useState } from 'react';
import './App.scss';
import OriginalRecipe from './modules/OriginalRecipe';
import Header from './modules/Header';
import Main from './modules/Main';

export default function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
