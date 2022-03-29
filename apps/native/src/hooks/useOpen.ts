import { useState } from "react";

export default function useOpen(initialState = false) {
    const [state, setState] = useState(initialState);
    return {
        isOpen: state,
        open: () => setState(true),
        close: () => setState(false),
    };
}
