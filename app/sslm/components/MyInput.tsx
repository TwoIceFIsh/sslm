import React from 'react';

interface MyInputProps {
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    value?: string; // 추가된 부분
}

const MyInput: React.FC<MyInputProps> = ({
                                             value,
                                             defaultValue,
                                             onChange,
                                             label,
                                             placeholder,
                                             type,
                                         }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <>
            <label className={'mx-2 text-xs font-bold'} htmlFor={'s_title'}>
                {label}
            </label>
            <input
                id={'s_title'}
                defaultValue={defaultValue}
                placeholder={placeholder}
                type={type}
                onChange={handleChange}
                className={'rounded-md border-2 px-3'}
                value={value}
            />
        </>
    );
};

export default MyInput;