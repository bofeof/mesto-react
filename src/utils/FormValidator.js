export function formValidator(evt) {
    const currentInput = evt.target;
    const validationStatus = {
      isValid: false,
      errorText: currentInput.validationMessage,
    };
  
    if (!currentInput.validity.valid) {
      validationStatus.isValid = false;
    } else {
      validationStatus.isValid = true;
    }
    return validationStatus;
  }  