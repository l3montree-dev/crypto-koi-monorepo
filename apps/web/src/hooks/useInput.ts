import { useState } from 'react'

type ValidatorFn<T> = (value: any) => boolean

export default function useInput<T = string>(config?: {
    initialState: T
    validator: ValidatorFn<T>
}) {
    const [isInvalid, setIsInvalid] = useState(false)
    const [value, setValue] = useState(config?.initialState ?? '')

    function onBlur() {
        if (config?.validator) {
            setIsInvalid(!config.validator(value))
        }
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    return { value, onChange, isInvalid, onBlur }
}
