import type {Account} from "@/components/types/account.ts"

export const changeType = (account: Account) => {
    if (account.type === "LDAP") {
        account.password = null;
    }
}