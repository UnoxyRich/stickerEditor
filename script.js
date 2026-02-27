const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const langToggleBtn = document.getElementById("langToggleBtn");
const titleText = document.getElementById("titleText");
const textLabel = document.getElementById("textLabel");
const xLabel = document.getElementById("xLabel");
const yLabel = document.getElementById("yLabel");
const fontSizeLabel = document.getElementById("fontSizeLabel");
const textColorLabel = document.getElementById("textColorLabel");
const outlineColorLabel = document.getElementById("outlineColorLabel");
const outlineWidthLabel = document.getElementById("outlineWidthLabel");
const textInput = document.getElementById("textInput");
const xMinusBtn = document.getElementById("xMinusBtn");
const xPlusBtn = document.getElementById("xPlusBtn");
const xInput = document.getElementById("xInput");
const yMinusBtn = document.getElementById("yMinusBtn");
const yPlusBtn = document.getElementById("yPlusBtn");
const yInput = document.getElementById("yInput");
const fontSizeInput = document.getElementById("fontSizeInput");
const fontSizeValue = document.getElementById("fontSizeValue");
const colorInput = document.getElementById("colorInput");
const strokeColorInput = document.getElementById("strokeColorInput");
const strokeWidthInput = document.getElementById("strokeWidthInput");
const strokeWidthValue = document.getElementById("strokeWidthValue");
const downloadBtn = document.getElementById("downloadBtn");

const COORD_STEP = 15;

const i18n = {
  en: {
    title: "\u590f\u76ee\u30a2\u30f3\u30a2\u30f3 Sticker Editor",
    text: "Text",
    x: "Text X",
    y: "Text Y",
    fontSize: "Font size",
    textColor: "Text color",
    outlineColor: "Outline color",
    outlineWidth: "Outline width",
    download: "Download PNG",
    switchLabel: "\u4e2d\u6587",
  },
  zh: {
    title: "\u590f\u76ee\u5b89\u5b89\u8868\u60c5\u5305\u7f16\u8f91\u5668",
    text: "\u6587\u5b57",
    x: "\u6587\u5b57 X",
    y: "\u6587\u5b57 Y",
    fontSize: "\u5b57\u53f7",
    textColor: "\u6587\u5b57\u989c\u8272",
    outlineColor: "\u63cf\u8fb9\u989c\u8272",
    outlineWidth: "\u63cf\u8fb9\u5bbd\u5ea6",
    download: "\u4e0b\u8f7d PNG",
    switchLabel: "English",
  },
};

let lang = "zh";

const image = new Image();
image.src = "taget.png";
image.onerror = () => {
  image.onerror = null;
  image.src = "target.png";
};

function draw() {
  if (!image.complete || !image.naturalWidth || !image.naturalHeight) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const rawText = textInput.value.length > 0 ? textInput.value : " ";
  const lines = rawText.split(/\r?\n/);
  const x = Number(xInput.value);
  const y = Number(yInput.value);
  const fontSize = Number(fontSizeInput.value);
  const fillColor = colorInput.value;
  const strokeColor = strokeColorInput.value;
  const strokeWidth = Number(strokeWidthInput.value);

  ctx.font = `700 ${fontSize}px "Google Sans Text", "Google Sans", "Segoe UI", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;

  const lineHeight = fontSize * 1.18;
  const blockHeight = (lines.length - 1) * lineHeight;
  const firstLineY = y - blockHeight / 2;

  lines.forEach((line, index) => {
    const safeLine = line.length > 0 ? line : " ";
    const lineY = firstLineY + index * lineHeight;
    if (strokeWidth > 0) {
      ctx.strokeText(safeLine, x, lineY);
    }
    ctx.fillText(safeLine, x, lineY);
  });
}

function applyLanguage() {
  const t = i18n[lang];
  titleText.textContent = t.title;
  textLabel.textContent = t.text;
  xLabel.textContent = t.x;
  yLabel.textContent = t.y;
  fontSizeLabel.textContent = t.fontSize;
  textColorLabel.textContent = t.textColor;
  outlineColorLabel.textContent = t.outlineColor;
  outlineWidthLabel.textContent = t.outlineWidth;
  downloadBtn.textContent = t.download;
  langToggleBtn.textContent = t.switchLabel;
}

function stepCoordinate(input, delta) {
  const current = Number(input.value) || 0;
  input.value = String(current + delta);
  draw();
}

image.onload = () => {
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  draw();
};

[textInput, xInput, yInput, fontSizeInput, colorInput, strokeColorInput, strokeWidthInput].forEach((el) => {
  el.addEventListener("input", () => {
    fontSizeValue.textContent = fontSizeInput.value;
    strokeWidthValue.textContent = strokeWidthInput.value;
    draw();
  });
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "sticker-with-text.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

xMinusBtn.addEventListener("click", () => stepCoordinate(xInput, -COORD_STEP));
xPlusBtn.addEventListener("click", () => stepCoordinate(xInput, COORD_STEP));
yMinusBtn.addEventListener("click", () => stepCoordinate(yInput, -COORD_STEP));
yPlusBtn.addEventListener("click", () => stepCoordinate(yInput, COORD_STEP));

langToggleBtn.addEventListener("click", () => {
  lang = lang === "en" ? "zh" : "en";
  applyLanguage();
});

applyLanguage();
fontSizeValue.textContent = fontSizeInput.value;
strokeWidthValue.textContent = strokeWidthInput.value;
