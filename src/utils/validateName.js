const regExName = /^[a-zA-Zа-яА-Я\sё-]+$/;

export function validateName(name) {
    if (name !== undefined) {
        if (name.length === 0) {
            return { invalid: true, message: 'Заполните это поле.' };
        } else if (!regExName.test(name.toLowerCase())) {
            return {
                invalid: true,
                message:
                    'Имя должно содержать только латиницу, кириллицу, пробел или дефис.'
            };
        } else if (regExName.test(name.toLowerCase())) {
            return { invalid: false, message: '' };
        }
    } else {
        return { invalid: true, message: '' };
    }
}