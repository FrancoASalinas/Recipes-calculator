import { useState, useEffect, useRef } from 'react';
import AddIngredientModal from '../components/AddIngredientModal';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

export interface Ingredient {
  name: string;
  quantity: string;
  magnitude: string;
}

function NewRecipe() {
  const [modal, setModal] = useState(false);
  const [resizedRecipe, setResizedRecipe] = useState<Ingredient[]>();
  const [errors, setErrors] = useState<string[]>([]);
  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [ingredientInputs, setIngredientInputs] = useState<{
    ingredientName: string;
    ingredientQuantity: string;
    ingredientMagnitude: string;
  }>({
    ingredientName: '',
    ingredientQuantity: '',
    ingredientMagnitude: '',
  });

  const [recipeInputs, setRecipeInputs] = useState<{
    recipeName: string;
    ogServes: string;
    newServes: string;
  }>({
    recipeName: '',
    ogServes: '',
    newServes: '',
  });

  const [ingredientToEdit, setIngredientToEdit] = useState<Ingredient | null>(
    null
  );
  const resizedRecipeNameRef = useRef<any>();

  const errorCodes: {
    string: string;
    condition: boolean;
    array: string[];
    setter: React.Dispatch<React.SetStateAction<string[]>>;
  }[] = [
    {
      string: 'Quantity should be a number',
      condition: isNaN(Number(ingredientInputs.ingredientQuantity.trim())),
      array: modalErrors,
      setter: setModalErrors,
    },
    {
      string: 'Obligatory fields (*) must be filled',
      condition:
        ingredientInputs.ingredientName.trim().length === 0 ||
        ingredientInputs.ingredientQuantity.trim().length === 0,
      array: modalErrors,
      setter: setModalErrors,
    },
    {
      string: "Magnitude shouldn't be a number",
      condition:
        Number.isInteger(Number(ingredientInputs.ingredientMagnitude.trim())) &&
        ingredientInputs.ingredientMagnitude.length > 0,
      array: modalErrors,
      setter: setModalErrors,
    },
    {
      string: 'Original recipe serves should be a number',
      condition:
        Number.isNaN(Number(recipeInputs.ogServes)) ||
        (Number(recipeInputs.ogServes) === 0 &&
          recipeInputs.ogServes.length > 0),
      array: errors,
      setter: setErrors,
    },
    {
      string: 'New recipe serves should be a number',
      condition:
        Number.isNaN(Number(recipeInputs.newServes)) ||
        (Number(recipeInputs.newServes) === 0 &&
          recipeInputs.newServes.length > 0),
      array: errors,
      setter: setErrors,
    },
    {
      string: 'All fields must be filled',
      condition:
        recipeInputs.recipeName.trim().length === 0 ||
        recipeInputs.ogServes.trim().length === 0 ||
        recipeInputs.newServes.trim().length === 0,
      array: errors,
      setter: setErrors,
    },
  ];

  const RecipePdf = () => (
    <Document>
      <Page style={{ padding: 30, backgroundColor: '#FFE1EA' }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'Helvetica',
            marginBottom: 20,
          }}
        >{`${recipeInputs.recipeName} (${recipeInputs.newServes} serves)`}</Text>
        {resizedRecipe?.map(ingredient => (
          <Text
            style={{
              paddingVertical: 6,
              paddingHorizontal: 20,
              fontFamily: 'Courier',
            }}
          >{`${ingredient.name} ${ingredient.quantity}`}</Text>
        ))}
      </Page>
    </Document>
  );

  useEffect(() => {
    checkErrors();

    if (resizedRecipe) {
      resizedRecipeNameRef.current.scrollIntoView({ behavior: 'smooth' }), 1;
    }
  }, [ingredientInputs, recipeInputs, resizedRecipe]);

  function clearInputState() {
    setIngredientInputs({
      ...ingredientInputs,
      ingredientMagnitude: '',
      ingredientName: '',
      ingredientQuantity: '',
    });
  }

  function openEditMode(ingredient: Ingredient) {
    setIngredientInputs({
      ...ingredientInputs,
      ingredientName: ingredient.name,
    });
    setIngredientInputs({
      ...ingredientInputs,
      ingredientQuantity: ingredient.quantity,
    });
    setIngredientInputs({
      ...ingredientInputs,
      ingredientMagnitude: ingredient.magnitude,
    });
    setModal(true);
    setIngredientToEdit(ingredient);
  }

  function editIngredient() {
    if (ingredientToEdit !== null) {
      setIngredients(
        ingredients.map(ingredient => {
          if (ingredientToEdit.name === ingredient.name) {
            return {
              name: ingredientInputs.ingredientName,
              quantity: ingredientInputs.ingredientQuantity,
              magnitude: ingredientInputs.ingredientMagnitude,
            };
          } else {
            return ingredient;
          }
        })
      );
    }
    clearInputState();
    setIngredientToEdit(null);
  }

  function deleteIngredient(name: string) {
    setIngredients(ingredients.filter(ingredient => ingredient.name !== name));
  }

  function checkErrors() {
    for (let error of errorCodes) {
      if (error.array.some(item => item === error.string)) {
        if (!error.condition) {
          error.setter(prev => prev.filter(item => item !== error.string));
        } else if (error.condition) continue;
      }

      if (error.condition) {
        error.setter(prev => [...prev, error.string]);
      }
    }
  }

  function addIngredient() {
    setIngredients([
      ...ingredients,
      {
        name: ingredientInputs.ingredientName.trim(),
        quantity: ingredientInputs.ingredientQuantity.trim(),
        magnitude: ingredientInputs.ingredientMagnitude.trim(),
      },
    ]);
  }

  return (
    <>
      <h1 className='text-3xl font-croissant text-center'>Create New Recipe</h1>
      <div className='flex flex-col justify-center gap-3 items-center p-4'>
        <input
          type='text'
          placeholder='Recipe name'
          className='border-nn border-2 placeholder-[#777] outline-none bg-mimipink p-2 rounded-full w-[200px]'
          onChange={e =>
            setRecipeInputs({ ...recipeInputs, recipeName: e.target.value })
          }
        />
        <input
          onChange={e =>
            setRecipeInputs({ ...recipeInputs, ogServes: e.target.value })
          }
          type='text'
          placeholder='Original recipe serves'
          className='border-nn border-2 placeholder-[#777] outline-none bg-mimipink p-2 rounded-full w-[200px]'
        />
        <input
          type='text'
          onChange={e =>
            setRecipeInputs({ ...recipeInputs, newServes: e.target.value })
          }
          placeholder='New recipe serves'
          className='border-nn border-2 placeholder-[#777] outline-none bg-mimipink p-2 rounded-full w-[200px]'
        />
        <ul
          className={`flex flex-col gap-1 text-xs items-start ${
            errors.length === 3
              ? 'h-[56px]'
              : errors.length === 2
              ? 'h-[36px]'
              : 'h-[16px]'
          } transition-all text-red-500`}
        >
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className='h-[1px] w-full bg-richblack my-2'></div>
        <h3 className='text-2xl font-croissant mb-3'>Ingredients</h3>
        <div className='flex flex-col items-center w-full'>
          {ingredients.length > 0 &&
            ingredients.map(ingredient => (
              <li
                className='list-none flex justify-between w-full max-w-xs p-1 px-4'
                key={ingredient.name}
              >
                <span>
                  {`${ingredient.name} ${ingredient.quantity}${ingredient.magnitude}`}
                </span>
                <div className='flex justify-center gap-2'>
                  <button
                    className='decoration-nn underline'
                    onClick={() => openEditMode(ingredient)}
                  >
                    Edit
                  </button>
                  <button
                    className='decoration-nn underline'
                    onClick={() => deleteIngredient(ingredient.name)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          <button
            disabled={errors.length > 0}
            className='w-fit underline mt-2 decoration-nn disabled:text-gray-500 disabled:no-underline transition-all duration-300'
            onClick={() => {
              setModal(true);
              clearInputState();
            }}
          >
            Add Ingredient
          </button>
          <button
            className='bg-nn p-2 w-full mx-auto rounded-2xl disabled:bg-slate-500 transition-all mt-5 max-w-[20rem]'
            disabled={errors.length > 0 || ingredients.length === 0}
            onClick={() =>
              setResizedRecipe(
                ingredients.map(ingredient => ({
                  ...ingredient,
                  quantity: `${
                    (Number(recipeInputs.newServes) *
                      Number(ingredient.quantity)) /
                    Number(recipeInputs.ogServes)
                  }`,
                }))
              )
            }
          >
            Create
          </button>
        </div>
        {typeof resizedRecipe === 'object' && resizedRecipe.length > 0 && (
          <div className={`w-full`}>
            <div className='h-[1px] w-full my-3 bg-richblack'></div>
            <div className='flex flex-col items-center'>
              <h3
                className='text-2xl font-croissant mb-3'
                ref={resizedRecipeNameRef}
              >
                {recipeInputs.recipeName}
              </h3>
              <ul>
                {resizedRecipe.map(ingredient => (
                  <li className='w-full list-item max-w-xs p-1 px-4'>{`${ingredient.name} ${ingredient.quantity}${ingredient.magnitude}`}</li>
                ))}
              </ul>
              <PDFDownloadLink
                document={<RecipePdf />}
                fileName={recipeInputs.recipeName}
                className='bg-nn p-2 w-full mx-auto rounded-2xl disabled:bg-slate-500 block text-center transition-all mt-5 max-w-[20rem]'
              >
                {({ loading }) => (loading ? 'Please Wait' : 'Download PDF')}
              </PDFDownloadLink>
            </div>
          </div>
        )}
      </div>
      {modal && (
        <AddIngredientModal
          ingredientInputs={ingredientInputs}
          ingredientToEdit={ingredientToEdit}
          onEdit={editIngredient}
          onAdd={addIngredient}
          onIngredientName={(e: any) =>
            setIngredientInputs({
              ...ingredientInputs,
              ingredientName: e.target.value,
            })
          }
          onIngredientQuantity={(e: any) =>
            setIngredientInputs({
              ...ingredientInputs,
              ingredientQuantity: e.target.value,
            })
          }
          errors={modalErrors}
          onIngredientMagnitude={(e: any) =>
            setIngredientInputs({
              ...ingredientInputs,
              ingredientMagnitude: e.target.value,
            })
          }
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
}

export default NewRecipe;
