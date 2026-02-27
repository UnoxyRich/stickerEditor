const canvas = document.getElementById('stickerCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const downloadBtn = document.getElementById('downloadBtn');

// load base image
const baseImage = new Image();
baseImage.src = 'target.png'; // ensure this file exists in same folder
baseImage.onload = () => {
    draw();
};

function draw() {
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw base
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    // draw text if any
    const text = textInput.value;
    if (text) {
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // center at (540,801)
        ctx.fillStyle = '#000';
        ctx.fillText(text, 540, 801);
    }
}

textInput.addEventListener('input', draw);

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'sticker.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});