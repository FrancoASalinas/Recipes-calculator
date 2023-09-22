import { MemoryRouter, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { routes } from '../utils/routes';
import { userEvent } from '@testing-library/user-event';

function router(entries: string[]) {
  return (
    <MemoryRouter initialEntries={entries}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

describe('Router', () => {
  describe('Header', () => {
    test('Header should render on Homepage', () => {
      render(router(['/']));

      expect(screen.getByAltText(/reciper logo/i)).toBeDefined();
    });

    test('Header should render on New Recipe page', () => {
      render(router(['/new']));

      expect(screen.getByAltText(/reciper logo/i)).toBeDefined();
    });

    test('Header should render on My Recipe page', () => {
      render(router(['/myrecipes']));

      expect(screen.getByAltText(/reciper logo/i)).toBeDefined();
    });

    test('Header should render on Error / 404 page', async () => {
      render(router(['/nonpage']));

      waitFor(() => expect(screen.getByText('404')).toBeDefined());

      expect(screen.getByAltText(/reciper logo/i)).toBeDefined();
    });
  });

  describe('Homepage', () => {

    const homepageText = /resize fast, prepare it faster/i

    test('Homepage should render on root path', () => {
      render(router(['/']))

      expect(screen.getByText(homepageText)).toBeDefined()
    });
    test("Homepage shouldn't render on New Recipe page", () => {
      render(router(['/new']));

      expect(screen.queryByText(homepageText)).toBeNull()
    });
    test("Homepage shouldn't render on My Recipes page", () => {
      render(router(['/myrecipes']));

      expect(screen.queryByText(homepageText)).toBeNull()

    });

    test("New Recipe link should navigate to /new", async () => {
      render(router(['/']))
      const user = userEvent.setup()

      await user.click(screen.getByText(/new recipe/i));
      expect(screen.getByText(/new recipe/i)).toBeDefined()
      expect(screen.queryByText(homepageText)).toBeNull()
    })

    test("New Recipe link should navigate to /myrecipes", async () => {
      render(router(['/']))
      const user = userEvent.setup()

      await user.click(screen.getByText(/my recipes/i));
      expect(screen.getByText(/my recipes/i)).toBeDefined()
      expect(screen.queryByText(homepageText)).toBeNull()
    })

  });
});
