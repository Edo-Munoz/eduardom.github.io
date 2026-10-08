const html5QrCode = new Html5Qrcode("reader");

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
  if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
    // Stop camera feed prior to navigation
    html5QrCode.stop().then(() => {
      window.location.href = decodedText;
    }).catch(() => {
      // Direct navigation if stopping camera encounters an issue
      window.location.href = decodedText;
    });
  } else {
    alert("Scanned text is not a URL: " + decodedText);
  }
};

const config = { fps: 10, qrbox: { width: 250, height: 250 } };

html5QrCode.start(
  { facingMode: "environment" }, 
  config, 
  qrCodeSuccessCallback
);
