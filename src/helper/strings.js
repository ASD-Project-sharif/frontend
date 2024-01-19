import dayjs from 'dayjs';
import { limit } from 'stringz';

const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function toPersianNumbers(value) {
    if (value === 0) {
        return persianNumbers[9];
    }
    if (!value) {
        return;
    }
    value = value.toString();

    for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
        value = value.replace(
            new RegExp(englishNumbers[i], 'g'),
            persianNumbers[i],
        );
    }

    return value;
}

function formatDate(date) {
    return toPersianNumbers(dayjs(date).format('YYYY/MM/DD h:mm'));
}

function sliceText(value, n = 75) {
    if (!value) {
        return value;
    }

    const sliced = limit(value, n, '');
    if (sliced.length === value.length) {
        return sliced;
    }

    return sliced + '...';
}

export {formatDate, toPersianNumbers, sliceText}