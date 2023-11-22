import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(isYesterday);

const getTimePeriods = {
	today() {
		return { startDate: dayjs().format(), endDate: dayjs().format() };
	},
	yesterday() {
		return {
			startDate: dayjs().add(-1, 'day').format(),
			endDate: dayjs().add(-1, 'day').format(),
		};
	},
	weekAgo() {
		return {
			startDate: dayjs().add(-7, 'day').format(),
			endDate: dayjs().add(-7, 'day').format(),
		};
	},
	monthAgo() {
		return {
			startDate: dayjs().add(-30, 'day').format(),
			endDate: dayjs().add(-30, 'day').format(),
		};
	},
	threeMonthsAgo() {
		return {
			startDate: dayjs().add(-90, 'day').format(),
			endDate: dayjs().add(-90, 'day').format(),
		};
	},
};

export default getTimePeriods;
