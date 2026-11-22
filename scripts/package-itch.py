import os
import zipfile
import shutil

def package_itch():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    itch_dir = os.path.join(root_dir, "itch")
    zip_path = os.path.join(itch_dir, "backbyte-itch.zip")

    # Files to include in the zip root
    files_to_pack = [
        ("index.html", os.path.join(itch_dir, "index.html")),
        ("bgm.mp3", os.path.join(itch_dir, "bgm.mp3")),
        ("favicon.svg", os.path.join(itch_dir, "favicon.svg")),
        ("logo.svg", os.path.join(itch_dir, "logo.svg")),
    ]

    print(f"Creating itch.io package at: {zip_path}")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for arcname, filepath in files_to_pack:
            if os.path.exists(filepath):
                zipf.write(filepath, arcname)
                print(f"  + Added {arcname}")
            else:
                print(f"  ! Warning: {filepath} not found")

    # Verify contents of zip
    print("\nVerifying backbyte-itch.zip contents:")
    with zipfile.ZipFile(zip_path, "r") as zipf:
        namelist = zipf.namelist()
        for name in namelist:
            info = zipf.getinfo(name)
            print(f"  - {name} ({info.file_size:,} bytes)")
        if "index.html" in namelist:
            print("\nSUCCESS: index.html is at the root of backbyte-itch.zip.")
            print("Ready for upload to itch.io!")
        else:
            print("\nERROR: index.html was not found at the root of the archive!")

if __name__ == "__main__":
    package_itch()
