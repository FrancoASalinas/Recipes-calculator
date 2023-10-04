import { Navigate, Route } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Homepage from '../pages/Homepage';
import { lazy } from 'react';
const NewRecipe = lazy(() => import('../pages/NewRecipe'));

export const routes = (

  <Route path='/Recipes-calculator/' element={<App />}>
        <Route index element={<Homepage />} />
        <Route path='new' element={<NewRecipe />} />
        <Route path='404' element={<ErrorPage />} />
        <Route path='*' element={<Navigate to='404' />} />
  </Route>
);
