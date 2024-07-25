// app.js
AWS.config.update({
    accessKeyId: 'AKIA5FTY7VFKPQQ52SG5',
    secretAccessKey: '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',
    region: 'ap-southeast-2'
});

const s3 = new AWS.S3();

document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const params = {
            Bucket: 'ishipimages',
            Key: file.name,
            Body: file,
            ACL: 'public-read'
        };

        document.getElementById('loading-spinner').style.display = 'block';

        s3.upload(params, function(err, data) {
            document.getElementById('loading-spinner').style.display = 'none';
            if (err) {
                document.getElementById('status').textContent = 'Error uploading file.';
                console.error(err);
            } else {
                document.getElementById('status').textContent = 'File uploaded successfully!';
                const img = document.createElement('img');
                img.src = data.Location;
                document.getElementById('preview').appendChild(img);
            }
        });
    } else {
        document.getElementById('status').textContent = 'Please select a file.';
    }
});