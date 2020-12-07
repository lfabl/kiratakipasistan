export const paymentPeriodConverter = (paymentPeriod) => {
    let returnPaymentPeriod = {
        type: "",
        date: ""
    }
    const type = paymentPeriod.type;
    const date = paymentPeriod.date;
    const newDate = new Date(date);
    returnPaymentPeriod.type = type === "monthly" ? "Ayın" : type === "yearly" ? "Yılın" : null;
    returnPaymentPeriod.date = type === "monthly" ? newDate.getDate() + ". günü" : monthConverter(newDate.getMonth() + 1) + "'ayının " + newDate.getDate() + ". günü";

    return returnPaymentPeriod
}

export const monthConverter = (month) => {
    if (month === 1) {
        return "Ocak"
    }
    else if (month === 2) {
        return "Şubat"
    }
    else if (month === 3) {
        return "Mart"
    }
    else if (month === 4) {
        return "Nisan"
    }
    else if (month === 5) {
        return "Mayıs"
    }
    else if (month === 6) {
        return "Haziran"
    }
    else if (month === 7) {
        return "Temmuz"
    }
    else if (month === 8) {
        return "Ağustos"
    }
    else if (month === 9) {
        return "Eylül"
    }
    else if (month === 10) {
        return "Ekim"
    }
    else if (month === 11) {
        return "Kasım"
    }
    else if (month === 12) {
        return "Aralık"
    }
}