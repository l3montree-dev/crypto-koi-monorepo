import { useState } from "react";

export default function useInput(initialValue: string | undefined | null = "") {
    const [value, setValue] = useState(initialValue ?? "");
    const onChangeText = (text: string) => setValue(text);
    return { value, onChangeText };
}
