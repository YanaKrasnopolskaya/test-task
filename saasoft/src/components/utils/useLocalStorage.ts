import {ref} from "vue";
import {KEY_ACCOUNTS} from "@/components/constants/accounts.ts";

export const useLocalStorage = <T>(key: string, value: T) => {
    const data = ref<T>(value);

    const loadFromLocalStorage = () => {
        try {
            const stored = localStorage.getItem(KEY_ACCOUNTS);
            if (stored) {
                data.value = JSON.parse(stored) as T;
            } else data.value = value;
        }
        catch (error) {
            console.error("Ошибка загрузки из LocalStorage", error);
        }
    }

    const saveToLocalStorage = () => {
        console.log(JSON.parse(JSON.stringify(data.value)));
        localStorage.setItem(KEY_ACCOUNTS, JSON.stringify(data.value));
    }

    return {
        data,
        loadFromLocalStorage,
        saveToLocalStorage,
    }
}


