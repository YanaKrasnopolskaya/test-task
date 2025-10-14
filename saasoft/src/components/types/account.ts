interface Tag {
    text: string
}

interface Account {
    tags: Tag[],
    type: string,
    login: string,
    password: string | null
}

export type {
    Account
}