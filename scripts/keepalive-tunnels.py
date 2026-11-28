import time
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

FRONTEND_URL = "https://swimming-threshold-ranked-honor.trycloudflare.com"
BACKEND_URL = "https://gabriel-really-absorption-mountains.trycloudflare.com/health"

print("[Keepalive] Starting tunnel keepalive ping loop...")
while True:
    try:
        req = urllib.request.Request(BACKEND_URL, headers={"User-Agent": "BackByte-KeepAlive"})
        with urllib.request.urlopen(req, timeout=10, context=ctx) as res:
            pass
    except Exception as e:
        print(f"[Keepalive] Backend ping error: {e}")

    try:
        req = urllib.request.Request(FRONTEND_URL, headers={"User-Agent": "BackByte-KeepAlive"})
        with urllib.request.urlopen(req, timeout=10, context=ctx) as res:
            pass
    except Exception as e:
        print(f"[Keepalive] Frontend ping error: {e}")

    time.sleep(20)
