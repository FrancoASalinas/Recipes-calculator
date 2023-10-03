import { useEffect, useState } from 'react';
import cross from '../assets/cross.svg';
import { Ingredient } from '../pages/NewRecipe';

function AddIngredientModal({
  errors,
  onClose,
  onAdd,
  onIngredientName,
  onIngredientQuantity,
  onIngredientMagnitude,
  ingredientToEdit,
  onEdit,
  ingredientInputs,
}: {
  ingredientInputs: {
    ingredientName: string;
    ingredientQuantity: string;
    ingredientMagnitude: string;
  };
  ingredientToEdit: Ingredient | null;
  onEdit: () => void;
  errors: string[];
  onClose: () => void;
  onAdd: () => void;
  onIngredientName: (e: any) => void;
  onIngredientQuantity: (e: any) => void;
  onIngredientMagnitude: (e: any) => void;
}) {
  const [modalStyle, setModalStyle] = useState('invisible opacity-0');
  const [backgroundStyle, setBackgroundStyle] = useState('invisible opacity-0');

  function add() {
    onAdd();
    onClose();
  }

  function edit() {
    onEdit();
    onClose();
  }

  useEffect(() => {
    window.addEventListener('keydown', closeOnEscape);

    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    let timeout = setTimeout(() => {
      setModalStyle('visible opacity-100');
      setBackgroundStyle('visible opacity-[33%]');
    }, 1);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <>
      <div
        className={`absolute ${backgroundStyle} backdrop-blur bg-black top-1/2 left-1/2 transition-all duration-300 -translate-x-1/2 -translate-y-1/2 w-full h-full`}
      ></div>
      <div
        className={`absolute flex justify-center ${modalStyle} items-center z-10 backdrop-blur-sm top-1/2 left-1/2 transition-all duration-300 -translate-x-1/2 -translate-y-1/2 w-full h-full`}
      >
        <div
          className={`flex flex-col gap-1 bg-mimipink text-left justify-center border-richblack rounded-xl p-4 border-2 relative`}
        >
          <button
            className='absolute top-4 right-4 translate-x-1/2 -translate-y-1/2'
            onClick={onClose}
          >
            <img src={cross} alt='close' />
          </button>
          <h2 className='text-center text-lg'>Add ingredient</h2>
          <div className='h-[1px] bg-richblack w-full px-3 mb-3'></div>
          <label htmlFor='name' className='ml-5'>
            Ingredient name*
          </label>
          <input
            value={ingredientInputs.ingredientName}
            type='text'
            id='name'
            placeholder='salt, flour, water'
            className='border-nn border-2 placeholder-[#777] outline-none bg-mimipink p-2 rounded-full w-[200px] mb-3'
            onChange={e => {
              onIngredientName(e);
            }}
          />
          <label htmlFor='quantity' className='ml-5'>
            Quantity*
          </label>
          <input
            value={ingredientInputs.ingredientQuantity}
            type='text'
            id='quantity'
            placeholder='50, 100, 1'
            className='border-nn border-2 placeholder-[#777] outline-none bg-mimipink p-2 rounded-full w-[200px] mb-3'
            onChange={e => onIngredientQuantity(e)}
          />
          <label htmlFor='magnitude' className='ml-5'>
            Magnitude
          </label>
          <input
            value={ingredientInputs.ingredientMagnitude}
            type='text'
            placeholder='g, ml, oz'
            id='magnitude'
            className='border-nn border-2 placeholder-[#777] outline-none bg-mimipink p-2 rounded-full w-[200px]'
            onChange={e => onIngredientMagnitude(e)}
          />
          <ul
            className={`text-red-500 flex flex-col transition-all duration-300 list-none text-xs gap-1 ${
              errors.length === 2
                ? 'h-[36px]'
                : errors.length === 3
                ? 'h-[56px]'
                : 'h-[16px]'
            }`}
          >
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <button
            disabled={errors.length > 0}
            onClick={() => (ingredientToEdit !== null ? edit() : add())}
            className='bg-nn p-2 w-full mx-auto rounded-2xl disabled:bg-slate-500 transition-all mt-3 '
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default AddIngredientModal;
