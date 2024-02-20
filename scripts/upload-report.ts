import { S3 } from 'aws-sdk';
import fs from 'fs';
import path from 'path';

const AWS_REGION = 'eu-west-1';
const bucket = 'aquabyte-assets/dev';

const s3 = new S3({
  region: AWS_REGION,
});

const dir = path.resolve('../reports/html');

async function getFiles(dir: string): Promise<string | string[]> {
  const directs = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    directs.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

// Upload files to S3
function uploadFilesToS3(files) {
  files.forEach((filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const fileName = filePath.split(dir)[1];

    const uploadParams = {
      Bucket: bucket,
      Key: `reports${fileName}`,
      Body: fileStream,
    };
    s3.upload(
      {
        ...uploadParams,
        ACL: 'public-read',
      },
      (err, data) => {
        if (err) {
          console.error(`Error uploading ${fileName}:`, err);
        } else {
          console.log(`Sync S3: ${data.Location}`);
        }
      }
    );
  });
}

export const upLoadReport = async () => {
  const files = (await getFiles(dir)) as string[];

  uploadFilesToS3(files);
};
