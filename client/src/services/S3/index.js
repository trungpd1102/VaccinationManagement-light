import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const region = 'ap-southeast-1';
const bucket = 'quanlytiemchungpdf';
const accessKeyId = process.env.VUE_APP_AWS_AK;
const secretKeyId = process.env.VUE_APP_AWS_SK;

const createPresignedUrlWithClient = ({ key }) => {
	const client = new S3Client({
		region: region,
		credentials: {
			accessKeyId: accessKeyId,
			secretAccessKey: secretKeyId,
		},
	});
	const command = new GetObjectCommand({ Bucket: bucket, Key: key });
	return getSignedUrl(client, command, { expiresIn: 3600 });
};

export { createPresignedUrlWithClient };
