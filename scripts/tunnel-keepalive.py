import time
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    "http://localhost:4000/health",
    "http://localhost:3000",
    "https://securities-nutten-karen-races.trycloudflare.com/health",
    "https://aye-shortly-location-indirect.trycloudflare.com"
]

print("Tunnel keepalive daemon started...", flush=True)

while True:
    for url in urls:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "BackByte-KeepAlive/1.0"})
            with urllib.request.urlopen(req, timeout=8, context=ctx) as resp:
                pass
        except Exception:
            pass
    time.sleep(20)
