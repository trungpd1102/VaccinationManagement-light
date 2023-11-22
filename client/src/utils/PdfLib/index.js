import { createPresignedUrlWithClient } from "@/services/S3";

async function readFontFile(font) {
	try {
		const fontFileUrl = font; // Correct path to the font file
		const response = await fetch(fontFileUrl);
		if (!response.ok) {
			throw new Error('Failed to fetch the font file.');
		}

		const fontArrayBuffer = await response.arrayBuffer();
		return fontArrayBuffer;
	} catch (error) {
		console.error('Error reading font file:', error);
		return null;
	}
}

async function downloadFileTemplate(key) {
	const clientUrl = await createPresignedUrlWithClient({
		key: key,
	});
	const url = clientUrl;
	return await fetch(url).then((res) => res.arrayBuffer());
}

function printPdf(byte) {
	let blob = new Blob([byte], { type: 'application/pdf' });
	let href = window.URL.createObjectURL(blob);
	let iframe = document.createElement('iframe');
	// iframe.id = 'pdfIframe'
	iframe.className = 'pdfIframe';
	document.body.appendChild(iframe);
	iframe.style.display = 'none';
	iframe.onload = function () {
		setTimeout(function () {
			iframe.focus();
			iframe.contentWindow.print();
			URL.revokeObjectURL(href);
			// document.body.removeChild(iframe)
		}, 1);
	};
	iframe.src = href;
	// URL.revokeObjectURL(url)
}

export { readFontFile, downloadFileTemplate, printPdf };
