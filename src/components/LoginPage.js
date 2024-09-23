import React, { useState, useEffect, useRef } from 'react';

const LoginPage = () => {
    const [isMasked, setIsMasked] = useState(true);
    const [ssnValue, setSsnValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        const handleInput = (event) => {
            let value = event.target.value.replace(/\D/g, '');
            setSsnValue(ssnValue + value);
            if (ssnValue.length > 9) {
                setSsnValue(ssnValue.slice(0, 9));
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Backspace') {
                event.preventDefault();
                const currentValue = ssnValue;
                setSsnValue(currentValue.slice(0, -1));
            }
        };

        const inputElement = inputRef.current;
        inputElement.addEventListener('input', handleInput);
        inputElement.addEventListener('keydown', handleKeyDown);

        return () => {
            inputElement.removeEventListener('input', handleInput);
            inputElement.removeEventListener('keydown', handleKeyDown);
        };
    }, [ssnValue]);

    const formatSSN = () => {
        if (isMasked) {
            return maskSSN(ssnValue);
        } else {
            return formatWithDashes(ssnValue);
        }
    };

    const maskSSN = (value) => {
        let masked = '';
        if (value.length <= 3) {
            masked = '*'.repeat(value.length);
        } else if (value.length > 3 && value.length <= 5) {
            masked = `***-${'*'.repeat(value.length - 3)}`.slice(0, value.length + 2);
        } else if (value.length > 5) {
            masked = `***-**-${'*'.repeat(value.length - 5)}`;
        }
        return masked;
    };

    const formatWithDashes = (value) => {
        if (value.length > 5) {
            return `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5)}`;
        } else if (value.length > 3) {
            return `${value.slice(0, 3)}-${value.slice(3)}`;
        } else {
            return value;
        }
    };

    const toggleMask = () => {
        setIsMasked(!isMasked);
    };

    return (
        <div className="container">
            <div className="input-container">
                <input
                    type="text"
                    ref={inputRef}
                    value={formatSSN()}
                    placeholder="Enter SSN digits"
                />
                <button className="eye-button" onClick={toggleMask}>👁️</button>
            </div>
        </div>
    );
};

export default LoginPage;
