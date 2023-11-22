import Vue from 'vue';
// import dayjs from 'dayjs';

import { formatDateForView, getCurrentAgeString, formatDateForViewWithTime } from '@/utils/Date';
import { TIME_UNITS } from '@/constants/hangHoaConst';
import { remainingUsageDays } from '@/utils/Date';
/**
 * Global filter to format date to string
 * @param {Number}
 * @returns string 1990-01-01
 */
Vue.filter('formatDateForInput', function (value) {
	if (!value) return;
	return new Intl.DateTimeFormat('en-GB').format(new Date(value));
});

/**
 * Global filter to format date for view
 * @param {Date}
 * @returns string 01/01/1990
 */
Vue.filter('formatDateForView', function (date) {
	if (date) {
		return formatDateForView(date);
	}
});

/**
 * Global filter to format date for view
 * @param {Date}
 * @returns string 01/01/1990
 */
Vue.filter('formatDateForViewWithTime', function (date) {
	if (date) {
		return formatDateForViewWithTime(date);
	}
});

/**
 * Global filter to format date to age
 */
Vue.filter('getCurrentAgeString', function (date) {
	if (date) {
		return getCurrentAgeString(date);
	}
});

/**
 * Global tuoi su dung vacxin
 */
Vue.filter('filterTuoiSuDung', function (tuoiSuDung) {
	const startTimeUnit = TIME_UNITS.find((unit) => {
		return unit?.id == tuoiSuDung?.start?.unit;
	})?.name;
	const endTimeUnit = TIME_UNITS.find((unit) => {
		return unit?.id == tuoiSuDung?.end?.unit;
	})?.name;
	return `Từ ${tuoiSuDung?.start?.value} ${startTimeUnit} đến ${tuoiSuDung?.end?.value} ${endTimeUnit}`;
});

Vue.filter('remainingUsageDays', remainingUsageDays);
