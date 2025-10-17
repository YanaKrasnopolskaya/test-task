import {ref} from "vue";
import type {Account, Tag} from "@/components/types/account.ts";

const stringifyTags = (tags: Tag[]): string => {
    return tags.map(tag => tag.text).join(";");
}

const parseTags = (input: string): Tag[]  => {
    return input
        .split(";")
        .map(tag => tag.trim())
        .filter(tag => tag !== "")
        .map(tag => ({text: tag}));
}

const updateTags = (account: Account, value: string) => {
    if(!value) {
        account.tags = [];
        return;
    }
    account.tags = parseTags(value);
}

export {
    stringifyTags,
    parseTags,
    updateTags
}

