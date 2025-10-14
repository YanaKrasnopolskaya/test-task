import {defineStore} from "pinia";
import {ref} from "vue";
import type {Account} from "@/components/types/account.ts"

export const useAccountsStore = defineStore('accounts', () => {
    const accounts = ref<Account[]>([]);

    const addAccount = (account: Account) :void => {
        accounts.value.push(account);
        saveToStorage();
    }

    const removeAccount = (account: Account) :void => {
        const index = accounts.value.findIndex(acc => acc === account);

        if (index > -1) {
            accounts.value.splice(index, 1);
            saveToStorage();
        }
    }

    const saveToStorage = () :void => {
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    const loadFromStorage = () : Account[] => {
        const stored = localStorage.getItem("accounts");
        return stored ? JSON.parse(stored) : [];
    }
})