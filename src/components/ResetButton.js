import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Swal from 'sweetalert2';

const ResetButton = () => {
  const { reset, formState: { dirtyFields } } = useFormContext();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleReset = () => {
    if (Object.keys(dirtyFields).length === 0) {
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will reset all form data',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        reset();
      }
    });
  };

  const updateButtonDisableState = () => {
    const fieldsArray = Object.values(dirtyFields);
    const isFormBlank = fieldsArray.every(field => !field.value);
    setIsDisabled(isFormBlank);
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={isDisabled}
      
    >
      Reset
    </button>
  );
};

export default ResetButton;
