import { render, screen } from '@testing-library/react';
import NewRecipe from '../pages/NewRecipe';
import userEvent from '@testing-library/user-event';

describe('New Recipe', () => {
  function setup(jsx: React.ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
      recipeNameInput: screen.getByPlaceholderText(/recipe name/i),
      originalServesInput: screen.getByPlaceholderText(
        /original recipe serves/i
      ),
      newServesInput: screen.getByPlaceholderText(/new recipe serves/i),
      addIngredientButton: screen.getByText(/add ingredient/i),
      createButton: screen.getByText('Create'),
    };
  }

  test("Original recipe serves input should throw an error if it's not a number", async () => {
    const { user, originalServesInput } = setup(<NewRecipe />);

    await user.type(originalServesInput, 'onetwothree');
    expect(
      screen.getByText(/original recipe serves should be a number/i)
    ).toBeTruthy();

    await user.type(originalServesInput, '{Backspace>11}');
    expect(
      screen.queryByText(/original recipe serves should be a number/i)
    ).toBeNull();
  });

  test("New recipe serves input should throw an error if it's not a number", async () => {
    const { user, newServesInput } = setup(<NewRecipe />);

    await user.type(newServesInput, 'onetwothree');
    expect(
      screen.getByText(/new recipe serves should be a number/i)
    ).toBeTruthy();

    await user.type(newServesInput, '{Backspace>11}');
    expect(
      screen.queryByText(/new recipe serves should be a number/i)
    ).toBeNull();
  });

  test("If there's an error, Add ingredient and Create buttons should be disabled", async () => {
    const { user, originalServesInput, addIngredientButton, createButton } =
      setup(<NewRecipe />);

    await user.type(originalServesInput, 'string');
    expect(
      screen.getByText(/original recipe serves should be a number/i)
    ).toBeDefined();

    await user.click(addIngredientButton);
    expect(screen.queryByLabelText(/quantity/i)).toBeNull();

    await user.click(createButton);
    expect(originalServesInput).toBeTruthy();
  });

  test('All inputs should be filled before enabling Add ingredient button', async () => {
    const {
      user,
      addIngredientButton,
      recipeNameInput,
      originalServesInput,
      newServesInput,
    } = setup(<NewRecipe />);

    await user.type(recipeNameInput, '1');
    await user.click(addIngredientButton);
    expect(screen.getByText(/all fields must be filled/i)).toBeTruthy();
    expect(screen.queryByLabelText(/quantity/i)).toBeNull();

    await user.type(originalServesInput, '1');
    await user.click(addIngredientButton);
    expect(screen.getByText(/all fields must be filled/i)).toBeTruthy();
    expect(screen.queryByLabelText(/quantity/i)).toBeNull();

    await user.type(newServesInput, '1');
    await user.click(addIngredientButton);
    expect(screen.getByLabelText(/quantity/i)).toBeTruthy();
  });

  test('No input should be filled with whitespaces', async () => {
    const {
      user,
      addIngredientButton,
      recipeNameInput,
      originalServesInput,
      newServesInput,
    } = setup(<NewRecipe />);

    await user.type(recipeNameInput, ' ');
    await user.click(addIngredientButton);
    expect(screen.getByText(/all fields must be filled/i)).toBeTruthy();
    expect(screen.queryByLabelText(/quantity/i)).toBeNull();

    await user.type(originalServesInput, ' ');
    await user.click(addIngredientButton);
    expect(screen.getByText(/all fields must be filled/i)).toBeTruthy();
    expect(screen.queryByLabelText(/quantity/i)).toBeNull();

    await user.type(newServesInput, ' ');
    expect(screen.getByText(/all fields must be filled/i)).toBeTruthy();
    await user.click(addIngredientButton);
    expect(screen.queryByLabelText(/quantity/i)).toBeNull();
  });

  test('Adding an ingredient button should open a modal', async () => {
    const {
      user,
      recipeNameInput,
      originalServesInput,
      newServesInput,
      addIngredientButton,
    } = setup(<NewRecipe />);
    await user.type(recipeNameInput, '1');
    await user.type(originalServesInput, '1');
    await user.type(newServesInput, '1');

    await user.click(addIngredientButton);

    expect(screen.getByLabelText(/quantity/i)).toBeDefined();
  });

  describe('AddIngredientsModal', () => {
    test('All ingredient state should be resetted when adding an ingredient', async () => {
      const {
        user,
        recipeNameInput,
        originalServesInput,
        addIngredientButton,
        newServesInput,
      } = setup(<NewRecipe />);

      await user.type(recipeNameInput, '1');
      await user.type(originalServesInput, '1');
      await user.type(newServesInput, '1');

      await user.click(addIngredientButton);

      await user.type(screen.getByLabelText(/ingredient name/i), 'Flour');
      await user.type(screen.getByLabelText(/quantity/i), '50');
      await user.type(screen.getByLabelText(/magnitude/i), 'g');

      await user.click(screen.getByText('Add'));
      await user.click(addIngredientButton);
      await user.click(screen.getByText('Add'));

      expect(screen.getAllByText('Flour 50g').length).toBe(1);
    });

    test.each([
      ['Flour', '200', 'g'],
      ['Water', '500', 'ml'],
      ['Salt', '50', 'grams'],
    ])(
      'adding %s %s%s should be showing it in the ingredients list',
      async (ingredientName, quantity, magnitude) => {
        const {
          user,
          recipeNameInput,
          originalServesInput,
          addIngredientButton,
          newServesInput,
        } = setup(<NewRecipe />);

        await user.type(recipeNameInput, '1');
        await user.type(originalServesInput, '1');
        await user.type(newServesInput, '1');

        await user.click(addIngredientButton);

        await user.type(
          screen.getByLabelText(/ingredient name/i),
          ingredientName
        );
        await user.type(screen.getByLabelText(/quantity/i), quantity);
        await user.type(screen.getByLabelText(/magnitude/i), magnitude);

        await user.click(screen.getByText('Add'));

        expect(screen.queryByLabelText(/ingredient name/i)).toBeNull();
        expect(screen.queryByLabelText(/quantity/i)).toBeNull();
        expect(screen.queryByLabelText(/magnitude/i)).toBeNull();

        expect(
          screen.getByText(`${ingredientName} ${quantity}${magnitude}`)
        ).toBeTruthy();
      }
    );

    describe('Throw an error if quantity or name input are not filled', () => {
      test.each([
        ['  ', '  '],
        ['Apples', '  '],
        ['  ', '50g'],
      ])("name: '%s', quantity: '%s' ", async (nameText, quantityText) => {
        const {
          user,
          recipeNameInput,
          originalServesInput,
          addIngredientButton,
          newServesInput,
        } = setup(<NewRecipe />);

        await user.type(recipeNameInput, '1');
        await user.type(originalServesInput, '1');
        await user.type(newServesInput, '1');

        await user.click(addIngredientButton);
        const nameInput = screen.getByLabelText(/ingredient name/i);
        const quantityInput = screen.getByLabelText(/quantity/i);

        await user.type(nameInput, nameText);
        await user.type(quantityInput, quantityText);
        expect(
          screen.getByText('Obligatory fields (*) must be filled')
        ).toBeDefined();
      });
    });

    test('Quantity input should show an error if it receives a non-number', async () => {
      const {
        user,
        recipeNameInput,
        originalServesInput,
        addIngredientButton,
        newServesInput,
      } = setup(<NewRecipe />);

      await user.type(recipeNameInput, '1');
      await user.type(originalServesInput, '1');
      await user.type(newServesInput, '1');

      await user.click(addIngredientButton);
      const quantityInput = screen.getByLabelText(/quantity/i);
      const nameInput = screen.getByLabelText(/ingredient name/i);

      await user.type(nameInput, 'Apples');
      await user.type(quantityInput, 'onetwothree');
      expect(screen.getByText(/quantity should be a number/i)).toBeTruthy();
    });

    test('Magnitude input should show an error if it receives a number', async () => {
      const {
        user,
        recipeNameInput,
        originalServesInput,
        addIngredientButton,
        newServesInput,
      } = setup(<NewRecipe />);

      await user.type(recipeNameInput, '1');
      await user.type(originalServesInput, '1');
      await user.type(newServesInput, '1');

      await user.click(addIngredientButton);

      const magnitudeInput = screen.getByLabelText(/magnitude/i);

      await user.type(magnitudeInput, '132');
      expect(screen.getByText("Magnitude shouldn't be a number")).toBeTruthy();
    });

    describe('Add button should be disabled if there are any errors', () => {
      test.each([
        ['123', 'Quantity*', 'Obligatory fields (*) must be filled'],
        ['abc', 'Quantity*', 'Quantity should be a number'],
        ['5', 'Magnitude', "Magnitude shouldn't be a number"],
      ])(
        "text: '%s', input: %s, error: %s",
        async (text, inputLabel, error) => {
          const {
            user,
            recipeNameInput,
            originalServesInput,
            addIngredientButton,
            newServesInput,
          } = setup(<NewRecipe />);

          await user.type(recipeNameInput, '1');
          await user.type(originalServesInput, '1');
          await user.type(newServesInput, '1');

          await user.click(addIngredientButton);
          const input = screen.getByLabelText(inputLabel);
          const button = screen.getByText('Add');

          await user.type(input, text);

          await user.click(button);
          expect(screen.getByText(error)).toBeTruthy();
        }
      );
    });

    test('Close modal with ESC key', async () => {
      const {
        user,
        recipeNameInput,
        originalServesInput,
        addIngredientButton,
        newServesInput,
      } = setup(<NewRecipe />);

      await user.type(recipeNameInput, '1');
      await user.type(originalServesInput, '1');
      await user.type(newServesInput, '1');

      await user.click(addIngredientButton);

      await user.keyboard('{Escape}');
      expect(screen.queryByLabelText('Quantity')).toBeNull();
    });

    test('Edit button should open the modal', async () => {
      const {
        user,
        recipeNameInput,
        originalServesInput,
        addIngredientButton,
        newServesInput,
      } = setup(<NewRecipe />);

      await user.type(recipeNameInput, '1');
      await user.type(originalServesInput, '1');
      await user.type(newServesInput, '1');

      await user.click(addIngredientButton);

      const quantityInput = screen.getByLabelText(/quantity/i);
      const nameInput = screen.getByLabelText(/ingredient name/i);

      await user.type(nameInput, 'salt');
      await user.type(quantityInput, '50');

      await user.click(screen.getByText('Add'));
      expect(screen.queryByLabelText(/quantity/i)).toBeNull();

      await user.click(screen.getByText('Edit'));
      expect(screen.getByLabelText(/quantity/i)).toBeTruthy();
    });

    test('Editing an ingredient should show the edited ingredient', async () => {
      const {
        user,
        recipeNameInput,
        originalServesInput,
        addIngredientButton,
        newServesInput,
      } = setup(<NewRecipe />);

      await user.type(recipeNameInput, '1');
      await user.type(originalServesInput, '1');
      await user.type(newServesInput, '1');

      await user.click(addIngredientButton);

      const quantityInput = screen.getByLabelText(/quantity/i);
      const nameInput = screen.getByLabelText(/ingredient name/i);

      await user.type(nameInput, 'salt');
      await user.type(quantityInput, '50');

      await user.click(screen.getByText('Add'));

      await user.click(screen.getByText('Edit'));

      await user.type(screen.getByLabelText(/magnitude/i), 'g');
      await user.click(screen.getByText('Add'));

      expect(screen.getByText('salt 50g')).toBeTruthy();
    });

    test('Editing an ingredient should show old values in the modal', async () => {
      const {
        user,
        recipeNameInput,
        originalServesInput,
        addIngredientButton,
        newServesInput,
      } = setup(<NewRecipe />);

      await user.type(recipeNameInput, '1');
      await user.type(originalServesInput, '1');
      await user.type(newServesInput, '1');

      await user.click(addIngredientButton);

      const quantityInput = screen.getByLabelText(/quantity/i);
      const nameInput = screen.getByLabelText(/ingredient name/i);

      await user.type(nameInput, 'salt');
      await user.type(quantityInput, '50');

      await user.click(screen.getByText('Add'));

      await user.click(screen.getByText('Edit'));
      expect(screen.getByDisplayValue('salt')).toBeTruthy();
      expect(screen.getByDisplayValue('50')).toBeTruthy();
    });

    test('Delete button should delete the ingredient', async () => {
      const {
        user,
        recipeNameInput,
        originalServesInput,
        addIngredientButton,
        newServesInput,
      } = setup(<NewRecipe />);

      await user.type(recipeNameInput, '1');
      await user.type(originalServesInput, '1');
      await user.type(newServesInput, '1');

      await user.click(addIngredientButton);

      const quantityInput = screen.getByLabelText(/quantity/i);
      const nameInput = screen.getByLabelText(/ingredient name/i);

      await user.type(nameInput, 'salt');
      await user.type(quantityInput, '50');

      await user.click(screen.getByText('Add'));

      await user.click(screen.getByText('Delete'));

      expect(screen.queryByText('salt 50')).toBeNull();
    });
  });

  test('if there are no ingredients, create button should be disabled', async () => {
    const {
      user,
      createButton,
      recipeNameInput,
      originalServesInput,
      newServesInput,
    } = setup(<NewRecipe />);

    await user.type(recipeNameInput, 'recipe name');
    await user.type(originalServesInput, '2');
    await user.type(newServesInput, '5');

    await user.click(createButton);

    expect(screen.queryByText('recipe name')).toBeNull();
  });

  describe("Creating a new recipe should show it's name and ingredients with new values", () => {
    test.each([
      ['salt', '50', 'g', '2', '4'],
      ['water', '200', 'ml', '10', '25'],
      ['eggs', '2', ' ', '13', '15'],
      ['meat', '250', 'g', '218', '476'],
    ])(
      'name: %s, quantity: %s, magnitude: %s, original serves: %s, new serves: %s',
      async (name, quantity, magnitude, ogServes, newServes) => {
        const {
          user,
          createButton,
          recipeNameInput,
          originalServesInput,
          newServesInput,
        } = setup(<NewRecipe />);

        Element.prototype.scrollIntoView = vi.fn();

        await user.type(recipeNameInput, 'recipe name');
        await user.type(originalServesInput, ogServes);
        await user.type(newServesInput, newServes);

        await user.click(screen.getByText('Add Ingredient'));
        await user.type(screen.getByLabelText(/ingredient name/i), name);
        await user.type(screen.getByLabelText(/quantity/i), quantity);
        await user.type(screen.getByLabelText(/magnitude/i), magnitude);
        await user.click(screen.getByText('Add'));

        await user.click(createButton);
        expect(screen.getByText('recipe name')).toBeTruthy();
        expect(
          screen.getByText(
            `${name} ${
              (Number(newServes) * Number(quantity)) / Number(ogServes)
            }${magnitude.trim()}`
          )
        ).toBeTruthy();
      }
    );
  });
});
