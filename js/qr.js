function onScanSuccess(decodedText, decodedResult) {
  // Check if the scanned text is a valid URL
  if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
    // Stop scanning before redirecting
    html5QrcodeScanner.clear().then(() => {
      window.location.href = decodedText;
    });
  } else {
    alert("Scanned code is not a valid URL: " + decodedText);
  }
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: { width: 250, height: 250 } },
  false
);

html5QrcodeScanner.render(onScanSuccess);
