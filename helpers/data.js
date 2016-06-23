var today = new Date();
    today.setHours(0,0,0,0);
var weekstart = new Date(today.setDate(today.getDate() - today.getDay() + 1));

export function toDate(dateStr) {
    var parts = dateStr.split(".");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

export function getThisWeekAmount(data) {
    return data
        .filter(el => toDate(el.date) >= weekstart)
        .map(el => el.amount)
        .reduce((a, b) => Number(a) + Number(b), 0)
}

export function getThisWeekFoodAmount(data) {
    return data
        .filter(el => (el.category == 'food' && (toDate(el.date) >= weekstart)))
        .map(el => el.amount)
        .reduce((a, b) => Number(a) + Number(b), 0)
}

export function getSortedByDate(data) {
    return data.sort((a, b) => {
        if (toDate(b.date) > toDate(a.date)) return 1;
        if (toDate(b.date) < toDate(a.date)) return -1;
        return 0;
    })
}
