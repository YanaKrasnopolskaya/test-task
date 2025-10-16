import {defineStore} from "pinia";
import {ref} from "vue";
import type {Account, Tag} from "@/components/types/account.ts";

export const useAccountsStore = defineStore('accounts', () => {
    const accounts = ref<Account[]>([]);

    const addAccount = () => {
        const newAccount: Account = {
            tags: [],
            type: '',
            login: '',
            password: null
        };
        accounts.value.push(newAccount);
    };

    const removeAccount = (index: number) :void => {
        accounts.value.splice(index, 1);
    }

    const loadFromStorage = () => {
        try {
            const stored = localStorage.getItem("accounts");
            if (stored) {
                accounts.value = JSON.parse(stored);
            } else accounts.value = [];
        }
        catch (error) {
            console.error("Ошибка чтения данных из LocalStorage", error);
        }
    }

    const saveToLocalStorage = () => {
        console.log('🔍 Сохраняем в localStorage:', JSON.parse(JSON.stringify(accounts.value)));
        localStorage.setItem("accounts", JSON.stringify(accounts.value));
    }

    const parseTags = (input: string):Tag[]  => {
        return input
            .split(";")
            .map(tag => tag.trim())
            .filter(tag => tag !== "")
            .map(tag => ({text: tag}));
    }

    const stringifyTags = (tags: Tag[]): string => {
        return tags.map(tag => tag.text).join(";");
    }

    return {
        accounts,
        addAccount,
        removeAccount,
        loadFromStorage,
        parseTags,
        stringifyTags,
        saveToLocalStorage
    };
})