import { useCallback, useState } from 'react';

function Validator() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleOnChange = (evt) => {
        const { name, value } = evt.target;

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: evt.target.validationMessage });
        setIsValid(evt.target.closest('form').checkValidity());
    }

    const resetForm = useCallback(
        (clearedData = {}, clearedValidation = false) => {
            setValues(clearedData);
            setErrors(clearedData);
            setIsValid(clearedValidation);
        },
        [setValues, setErrors, setIsValid]
    );

    return {
        handleOnChange,
        resetForm,
        setIsValid,
        isValid,
        errors,
        values,
        setValues
    };
}

export default Validator;