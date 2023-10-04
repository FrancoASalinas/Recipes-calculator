import { Navigate, Route } from 'react-router-dom';
import App from '../App';
import NewRecipe from '../pages/NewRecipe';
import ErrorPage from '../pages/ErrorPage';
import Homepage from '../pages/Homepage';

export const routes = (
  <Route path='/' element={<App />}>
    <Route index element={<Homepage />} />
    <Route path='new' element={<NewRecipe />} />
    <Route path='404' element={<ErrorPage />} />
    <Route path='*' element={<Navigate to='404' />} />
  </Route>
);
