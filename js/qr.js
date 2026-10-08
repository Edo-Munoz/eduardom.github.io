const statusEl = document.getElementById('status');

    function onScanSuccess(decodedText, decodedResult) {
      statusEl.innerText = `Found QR Code: ${decodedText}`;
      console.log("Scanned:", decodedText);

      // Clean up whitespace
      const scannedUrl = decodedText.trim();

      // Check if it's a valid http or https URL
      if (scannedUrl.startsWith('http://') || scannedUrl.startsWith('https://')) {
        statusEl.innerText = `Redirecting to: ${scannedUrl}...`;
        
        // Clear scanner before navigating away
        html5QrcodeScanner.clear().then(() => {
          window.location.href = scannedUrl;
        }).catch(() => {
          // Fallback if clear fails
          window.location.href = scannedUrl;
        });
      } else {
        statusEl.innerText = `Scanned text is not a link: "${scannedUrl}"`;
      }
    }

    function onScanFailure(error) {
      // Normal continuous searching state — no action needed
    }

    // Initialize scanner with responsive box dimensions
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 15, // Increase frames per second for faster detection
        qrbox: function(viewfinderWidth, viewfinderHeight) {
          // Dynamic sizing so small mobile screens don't cut off detection
          let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
          let qrboxSize = Math.floor(minEdgeSize * 0.7);
          return {
            width: qrboxSize,
            height: qrboxSize
          };
        }
      },
      /* verbose= */ false
    );
