import { useState, useEffect, useRef } from 'react';
import AddIngredientModal from '../components/AddIngredientModal';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

function NewRecipe() {
  const [errors, setErrors] = useState<string[]>([]);
  const [modal, setModal] = useState(false);
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: string; magnitude: string | undefined }[]
  >([]);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientQuantity, setIngredientQuantity] = useState<string>('');
  const [ingredientMagnitude, setIngredientMagnitude] = useState<string>('');
  const [recipeName, setRecipeName] = useState<string>('');
  const [ogServes, setOgServes] = useState<string>('');
  const [newServes, setNewServes] = useState<string>('');
  const [modalErrors, setModalErrors] = useState<string[]>([]);
  const [resizedRecipe, setResizedRecipe] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const resizedRecipeNameRef = useRef<any>();

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
        >{`${recipeName} (${newServes} serves)`}</Text>
        {ingredients.map(ingredient => (
          <Text
            style={{
              paddingVertical: 6,
              paddingHorizontal: 20,
              fontFamily: 'Courier',
            }}
          >{`${ingredient.name} ${
            (Number(newServes) * Number(ingredient.quantity)) / Number(ogServes)
          }`}</Text>
        ))}
      </Page>
    </Document>
  );
  useEffect(() => {
    checkErrors();

    if (resizedRecipe) {
      resizedRecipeNameRef.current.scrollIntoView({ behavior: 'smooth' }), 1;
    }
  }, [
    ingredientName,
    ingredientQuantity,
    ingredientMagnitude,
    recipeName,
    ogServes,
    newServes,
    resizedRecipe,
  ]);

  function clearInputState() {
    setIngredientMagnitude('');
    setIngredientName('');
    setIngredientQuantity('');
  }

  function openEditMode(i: number) {
    setIngredientName(ingredients[i].name);
    setIngredientQuantity(ingredients[i].quantity);
    setIngredientMagnitude(ingredients[i].magnitude || '');
    setModal(true);
    setEditIndex(i);
  }

  function editIngredient() {
    if (typeof editIndex === 'number') {
      setIngredients(
        ingredients.map((ingredient, i) => {
          if (editIndex === i) {
            return {
              name: ingredientName,
              quantity: ingredientQuantity,
              magnitude: ingredientMagnitude,
            };
          } else {
            return ingredient;
          }
        })
      );
    }
    clearInputState();
    setEditIndex(null);
  }
  const errorCodes: {
    string: string;
    condition: boolean;
    array: string[];
    setter: React.Dispatch<React.SetStateAction<string[]>>;
  }[] = [
    {
      string: 'Quantity should be a number',
      condition: isNaN(Number(ingredientQuantity)),
      array: modalErrors,
      setter: setModalErrors,
    },
    {
      string: 'Obligatory fields (*) must be filled',
      condition: ingredientName.length === 0 || ingredientQuantity.length === 0,
      array: modalErrors,
      setter: setModalErrors,
    },
    {
      string: "Magnitude shouldn't be a number",
      condition:
        Number.isInteger(Number(ingredientMagnitude)) &&
        ingredientMagnitude.length > 0,
      array: modalErrors,
      setter: setModalErrors,
    },
    {
      string: 'Original recipe serves should be a number',
      condition:
        Number.isNaN(Number(ogServes)) ||
        (Number(ogServes) === 0 && ogServes.length > 0),
      array: errors,
      setter: setErrors,
    },
    {
      string: 'New recipe serves should be a number',
      condition:
        Number.isNaN(Number(newServes)) ||
        (Number(newServes) === 0 && newServes.length > 0),
      array: errors,
      setter: setErrors,
    },
    {
      string: 'All fields must be filled',
      condition:
        recipeName.length === 0 ||
        ogServes.length === 0 ||
        newServes.length === 0,
      array: errors,
      setter: setErrors,
    },
  ];

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
        name: ingredientName,
        quantity: ingredientQuantity,
        magnitude: ingredientMagnitude,
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
          onChange={e => setRecipeName(e.target.value.trim())}
        />
        <input
          onChange={e => setOgServes(e.target.value.trim())}
          type='text'
          placeholder='Original recipe serves'
          className='border-nn border-2 placeholder-[#777] outline-none bg-mimipink p-2 rounded-full w-[200px]'
        />
        <input
          type='text'
          onChange={e => setNewServes(e.target.value.trim())}
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
            ingredients.map((ingredient, i) => (
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
                    onClick={() => openEditMode(i)}
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
            onClick={() => setResizedRecipe(true)}
          >
            Create
          </button>
        </div>
        {resizedRecipe && (
          <div className={`w-full`}>
            <div className='h-[1px] w-full my-3 bg-richblack'></div>
            <div className='flex flex-col items-center'>
              <h3
                className='text-2xl font-croissant mb-3'
                ref={resizedRecipeNameRef}
              >
                {recipeName}
              </h3>
              <ul>
                {ingredients.map(ingredient => (
                  <li className='w-full list-item max-w-xs p-1 px-4'>{`${
                    ingredient.name
                  } ${
                    (Number(newServes.slice(0)) * Number(ingredient.quantity)) /
                    Number(ogServes)
                  }${ingredient.magnitude}`}</li>
                ))}
              </ul>
              <PDFDownloadLink
                document={<RecipePdf />}
                fileName={recipeName}
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
          ingredientMagnitude={ingredientMagnitude}
          ingredientQuantity={ingredientQuantity}
          ingredientName={ingredientName}
          editIndex={editIndex}
          onEdit={editIngredient}
          onAdd={addIngredient}
          onIngredientName={(e: any) =>
            setIngredientName(e.target.value.trim())
          }
          onIngredientQuantity={(e: any) =>
            setIngredientQuantity(e.target.value.trim())
          }
          errors={modalErrors}
          onIngredientMagnitude={(e: any) =>
            setIngredientMagnitude(e.target.value.trim())
          }
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
}

export default NewRecipe;
