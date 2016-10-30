export function formatNumber(n) {
	return Number(n).toString().replace(/./g, function(c, i, a) {
		return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? " " + c : c;
	});
}

export function getFormatedDate(date) {
	const charNum = 2;

	return [
		('0' + date.getDate()).slice(-charNum),
		('0' + (date.getMonth() + 1)).slice(-charNum),
		date.getFullYear()
	].join('.');
}

export function getTodayFormatedDate() {
	return getFormatedDate(new Date());
}
