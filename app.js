const codeArea = document.getElementById('code');
const runBtn = document.getElementById('run');
const resultFrame = document.getElementById('result');

runBtn.addEventListener('click', () => {
  const code = codeArea.value;
  const doc = resultFrame.contentDocument || resultFrame.contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();
});
