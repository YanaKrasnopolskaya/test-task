import {defineStore} from "pinia";
import type {Account} from "@/components/types/account.ts";
import {useLocalStorage} from "@/components/utils/useLocalStorage.ts"

export const useAccountsStore = defineStore('accounts', () => {
    const {data: accounts, loadFromLocalStorage, saveToLocalStorage} = useLocalStorage<Account[]>('accounts', []);

    const addAccount = (account: Account) => {
        accounts.value.push(account);
        saveToLocalStorage();
        console.log( JSON.parse(JSON.stringify(accounts.value)));
    };

    const removeAccount = (index: number) :void => {
        accounts.value.splice(index, 1);
        saveToLocalStorage();
    }

    return {
        accounts,
        addAccount,
        removeAccount,
        loadFromLocalStorage,
    };
})