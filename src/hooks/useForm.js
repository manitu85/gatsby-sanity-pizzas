import { useState } from 'react';

// Function expression
const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);
  // handleChange method
  const updateValue = (e) => {
    let { name, value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, updateValue };
};

export default useForm;

// Function declarations
// import { useState } from 'react';

// export default function useForm(defaults) {
//   const [values, setValues] = useState(defaults);

//   function updateValue(e) {
//     // check if its a number and convert
//     let { value } = e.target;
//     if (e.target.type === 'number') {
//       value = parseInt(e.target.value);
//     }
//     setValues({
//       // copy the existing values into it
//       ...values,
//       // update the new value that changed
//       [e.target.name]: value,
//     });
//   }

//   return { values, updateValue };
// }

// setValues((prevValue) => ({
//   ...prevValue,
//   [name]: value,
// }));
