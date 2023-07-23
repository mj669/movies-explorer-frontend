const regExUrl = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,10})+$/;

export function validateEmail(email) {
    if (email !== undefined) {
        if (email.length === 0) {
            return { invalid: true, message: 'Заполните это поле.' };
        } else if (!regExUrl.test(email.toLowerCase())) {
            return { invalid: true, message: 'Неверный формат почты.' };
        } else if (regExUrl.test(email.toLowerCase())) {
            return { invalid: false, message: '' };
        }
    } else {
        return { invalid: true, message: '' };
    }
}