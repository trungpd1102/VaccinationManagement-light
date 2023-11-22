import { GIOI_TINH_VALUE } from '@/constants';
import fontkit from '@pdf-lib/fontkit';
import {
	// degrees,
	PDFDocument,
	rgb,
	StandardFonts,
} from 'pdf-lib';
import { formatCurrentDataToVNString, formatDateForView, getCurrentAgeString } from '../Date';
import { formatAddressObj } from '../Address';
import { formatVacXinWithDuongDung } from '../DichVuVacXin';
import { CONDITION_CHECK_X, FONT_SIZE } from '@/constants/pdfConst';
import { downloadFileTemplate, printPdf, readFontFile } from '.';

const COLOR_BLACK = rgb(0, 0, 0);

async function printPhieuKham({ phieu, kham }) {
	const existingPdfBytes = await downloadFileTemplate('template-kham.pdf');

	const pdfDoc = await PDFDocument.load(existingPdfBytes);
	pdfDoc.registerFontkit(fontkit);

	// load font
	// const timeNewRomabBuffer = await readFontFile(require('../assets/fonts/times.ttf'));
	// const timeNewRoman = await pdfDoc.embedFont(timeNewRomabBuffer);
	const timesBoldBuffer = await readFontFile(require('@/assets/fonts/times-bold.ttf'));
	const timesBold = await pdfDoc.embedFont(timesBoldBuffer);
	const timesBoldItalicBuffer = await readFontFile(require('@/assets/fonts/times-bold-italic.ttf'));
	const timesBoldItaLic = await pdfDoc.embedFont(timesBoldItalicBuffer);
	const symbolFont = await pdfDoc.embedFont(StandardFonts.ZapfDingbats);

	const pages = pdfDoc.getPages();
	const firstPage = pages[0];
	const { height } = firstPage.getSize();

	// Giới tinh
	if (phieu?.khachHang?.gioiTinh === GIOI_TINH_VALUE.NAM) {
		firstPage.drawText('✓', {
			x: 326,
			y: height - 74.2,
			size: FONT_SIZE.ICON,
			font: symbolFont,
			color: COLOR_BLACK,
		});
	} else {
		firstPage.drawText('✓', {
			x: 369.52,
			y: height - 74.2,
			size: FONT_SIZE.ICON,
			font: symbolFont,
			color: COLOR_BLACK,
		});
	}

	// Họ tên
	firstPage.drawText(phieu?.khachHang?.hoTen || '', {
		x: 84,
		y: height - 74,
		size: FONT_SIZE.TEXT.MD,
		font: timesBold,
		color: COLOR_BLACK,
	});
	// Tuổi
	firstPage.drawText(getCurrentAgeString(phieu?.khachHang?.ngaySinh) || '', {
		x: 84,
		y: height - 88.5,
		size: FONT_SIZE.TEXT.SM,

		font: timesBold,
		color: COLOR_BLACK,
	});
	// Ngay sinh
	firstPage.drawText(formatDateForView(phieu?.khachHang?.ngaySinh) || '', {
		x: 220,
		y: height - 88.5,
		size: FONT_SIZE.TEXT.SM,

		font: timesBold,
		color: COLOR_BLACK,
	});
	// Địa chỉ
	firstPage.drawText(formatAddressObj(phieu?.khachHang?.thuongTru) || '', {
		x: 84,
		y: height - 103,
		size: FONT_SIZE.TEXT.SM,
		font: timesBold,
		color: COLOR_BLACK,
	});
	// Bố, mẹ
	firstPage.drawText(phieu?.khachHang?.nguoiBaoHo[0]?.hoTen || '', {
		x: 84,
		y: height - 117.5,
		size: FONT_SIZE.TEXT.SM,
		font: timesBold,
		color: COLOR_BLACK,
	});

	// Điện thoại
	firstPage.drawText(phieu?.khachHang?.dienThoai || '', {
		x: 290,
		y: height - 117.5,
		size: FONT_SIZE.TEXT.SM,
		font: timesBold,
		color: COLOR_BLACK,
	});

	// Cân nặng
	firstPage.drawText((kham?.thongTinCoBan?.canNang || '') + ' kg', {
		x: 63,
		y: height - 132.3,
		size: FONT_SIZE.TEXT.SM,
		font: timesBold,
		color: COLOR_BLACK,
	});

	// Thân nhiệt
	firstPage.drawText((kham?.thongTinCoBan?.thanNhiet || '') + ' °C', {
		x: 158.3,
		y: height - 132.3,
		size: FONT_SIZE.TEXT.SM,
		font: timesBold,
		color: COLOR_BLACK,
	});

	// Thân nhiệt
	firstPage.drawText(kham?.thongTinCoBan?.huyetAp || '', {
		x: 245.3,
		y: height - 130.3,
		size: FONT_SIZE.TEXT.SM,
		font: timesBold,
		color: COLOR_BLACK,
	});
	// Nhịp tim
	firstPage.drawText(kham?.thongTinCoBan?.nhipTim || '', {
		x: 339,
		y: height - 130.3,
		size: FONT_SIZE.TEXT.SM,
		font: timesBold,
		color: COLOR_BLACK,
	});

	// Condition 1
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition1 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 160,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 2
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition2 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 180.88,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 3
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition3 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 195.3,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 4
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition4 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 209.7,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 5
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition5 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 224,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 6
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition6 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 245,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 7
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition7 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 265.8,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 8
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition8 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 286.7,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 9
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition9 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 301.1,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 10
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition10 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 315.5,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 11
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition11 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 329.9,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Condition 12
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.condition12 ? CONDITION_CHECK_X.YES : CONDITION_CHECK_X.NO,
		y: height - 344.3,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Đủ điều kiện
	firstPage.drawText(kham?.dieuKien?.duDieuKien ? '✓' : '', {
		x: 383.6,
		y: height - 393.2,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});
	// Đề nghị khám sàng lọc
	firstPage.drawText('✓', {
		x: kham?.dieuKien?.deNghiKhamTaiBV ? 326 : 275.6,
		y: height - 438.6,
		size: FONT_SIZE.ICON,
		font: symbolFont,
		color: COLOR_BLACK,
	});

	// Ngày tháng
	firstPage.drawText('Hà Nội, ' + formatCurrentDataToVNString(), {
		x: 225,
		y: height - 485,
		size: FONT_SIZE.ICON,
		font: timesBoldItaLic,
		color: COLOR_BLACK,
	});

	// Chỉ đinh
	firstPage.drawText(formatVacXinWithDuongDung(phieu?.chiDinh?.dichVus) || '', {
		x: 80,
		y: height - 454,
		size: FONT_SIZE.TEXT.MD,
		font: timesBold,
		color: COLOR_BLACK,
	});
	// Ghi chú khác
	firstPage.drawText(phieu?.chiDinh?.ghiChu || '', {
		x: 62,
		y: height - 466,
		size: FONT_SIZE.TEXT.SM,
		font: timesBold,
		color: COLOR_BLACK,
	});

	const pdfBytes = await pdfDoc.save();
	printPdf(pdfBytes);
}

export { printPhieuKham };
