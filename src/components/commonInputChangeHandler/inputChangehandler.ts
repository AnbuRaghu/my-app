import { ChangeEvent } from 'react';

type FormDataType = { [key: string]: string | boolean };

const inputChangeHandler = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  formData: FormDataType,
  setFormData: (data: FormDataType) => void
): void => {
  const { name, value, type, checked } = e.target as HTMLInputElement;
  setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
};

export default inputChangeHandler;




// simplified verion
// const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
//   const { name, value, type, checked } = e.target;
//   setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
// };



// another use case 
// import { ChangeEvent } from 'react';

// type FormDataType = { [key: string]: string | boolean };

// const inputChangeHandler = (
//  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
//  formData: FormDataType,
//  setFormData: (data: FormDataType) => void
// ): void => {
//  const target = e.target as HTMLInputElement | HTMLSelectElement; // Include HTMLSelectElement in the type
//  let value: string | boolean;

//  if (target.type === 'checkbox' || target.type === 'radio') {
//     value = target.checked;
//  } else {
//     value = target.value; // Default to text input value or select-one value
//  }

//  // Use the name attribute to update the correct field in the form data
//  setFormData({ ...formData, [target.name]: value });
// };

// export default inputChangeHandler;


// selectbox alone 
// const selectBoxChangeHandler = (name: string, value: string, selectedIndex?: number): void => {
//   setFormData({ ...formData, [name]: value });
 
// };
