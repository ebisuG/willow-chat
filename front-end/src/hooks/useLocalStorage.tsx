import { useState } from "react";
import { authInfo } from "../types/types";

export const useLocalStorage: (keyName: string, defaultValue: null) =>
    [authInfo | null, (newValue: authInfo | null) => void]
    = (keyName, defaultValue) => {
        const [storedValue, setStoredValue] = useState<authInfo | null>(() => {
            try {
                const value = window.localStorage.getItem(keyName);
                if (value) {
                    return JSON.parse(value);
                } else {
                    window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                    return defaultValue;
                }
            } catch (error) {
                console.log(error)
                return defaultValue;
            }
        });
        const setValue: (newValue: authInfo | null) => void = (newValue) => {
            try {
                window.localStorage.setItem(keyName, JSON.stringify(newValue));
            } catch (error) {
                console.log(error);
            }
            setStoredValue(newValue);
        };
        return [storedValue, setValue];
    };

