/* eslint-disable */
function getToday() {
    var today = new Date();
        today.setHours(0,0,0,0);
    return today;
}
var today = getToday();
var day = today.getDay();
var weekStart = new Date(today.setDate(today.getDate() - day + (day==0?-6:1)));
today = getToday();
var prevWeekStart = new Date(today.setDate(today.getDate() - day - (day==0?13:6)));
today = getToday();
var nextWeekStart = new Date(today.setDate(today.getDate() - day + (day==0?1:8)));
today = getToday();
var monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
var monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

export function toDate(dateStr) {
    var parts = dateStr.split(".");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

export function getThisWeekAmount(data) {
    return data
        .filter(el => ((toDate(el.date) >= weekStart) && (toDate(el.date) < nextWeekStart)))
        .map(el => el.amount)
        .reduce((a, b) => Number(a) + Number(b), 0)
}

export function getThisWeekFoodAmount(data) {
    return data
        .filter(el => (el.category == 'food'
        && (toDate(el.date) >= weekStart)
        && (toDate(el.date) < nextWeekStart)))
        .map(el => el.amount)
        .reduce((a, b) => Number(a) + Number(b), 0)
}

export function getPreviousWeekAmount(data) {
    return data
        .filter(el => ((toDate(el.date) < weekStart) && (toDate(el.date) >= prevWeekStart)))
        .map(el => el.amount)
        .reduce((a, b) => Number(a) + Number(b), 0)
}

export function getPreviousWeekFoodAmount(data) {
    return data
        .filter(el => (el.category == 'food'
            && (toDate(el.date) < weekStart)
            && (toDate(el.date) >= prevWeekStart)))
        .map(el => el.amount)
        .reduce((a, b) => Number(a) + Number(b), 0)
}

export function getSortedByDate(data) {
    return data.sort((a, b) => {
        if (toDate(b.date) > toDate(a.date)) return 1;
        if (toDate(b.date) < toDate(a.date)) return -1;
        return 0;
    }).map(el => {
        el.amount = Number(el.amount)
        return el;
    })
}

export function getThisMonthAmount(data) {
    return data
        .filter(el => ((toDate(el.date) >= monthStart) && (toDate(el.date) < monthEnd)))
        .map(el => el.amount)
        .reduce((a, b) => Number(a) + Number(b), 0)
}

export function getThisMonthFoodAmount(data) {
    return data
        .filter(el => (el.category == 'food'
            && (toDate(el.date) >= monthStart)
            && (toDate(el.date) < monthEnd))
        )
        .map(el => el.amount)
        .reduce((a, b) => Number(a) + Number(b), 0)
}
