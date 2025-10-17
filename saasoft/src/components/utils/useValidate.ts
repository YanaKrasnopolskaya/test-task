import type {FormInstance} from "element-plus"

const rules = {
    type: [{ required: true, message: 'Выберите тип', trigger: ['change', 'blur']},],
    login: [{ required: true, message: 'Введите логин', trigger: ['blur']}],
    password: [{ required: true, message: 'Введите пароль', trigger: ['blur']}],
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