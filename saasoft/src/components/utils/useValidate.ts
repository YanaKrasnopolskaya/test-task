import type {FormInstance} from "element-plus"

const rules = {
    type: [{ required: true, trigger: ['change', 'blur']}],
    login: [{ required: true, trigger: ['blur']}],
    password: [{ required: true, trigger: ['blur']}],
}

const validCheck = async (form: FormInstance | undefined): Promise<Boolean> => {
    if (!form) {
        return false;
    }
    try {
        return await form.validate();
    }
    catch {
        return false;
    }
}

export {
    rules,
    validCheck,
}