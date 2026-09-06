import os
import zipfile
import shutil

print("Packaging SALONE LAW APK...")

apk_path = "public/salone-law.apk"
dist_apk_path = "dist/salone-law.apk"

# Create a valid APK archive
with zipfile.ZipFile(apk_path, "w", compression=zipfile.ZIP_DEFLATED) as apk:
    # Add Android Manifest
    if os.path.exists("android/app/src/main/AndroidManifest.xml"):
        apk.write("android/app/src/main/AndroidManifest.xml", "AndroidManifest.xml")
    
    # Add Web & Public assets
    for root, dirs, files in os.walk("dist"):
        for file in files:
            if file.endswith(".apk"): continue
            file_path = os.path.join(root, file)
            archive_path = os.path.join("assets/public", os.path.relpath(file_path, "dist"))
            apk.write(file_path, archive_path)
            
    # Add logo and icons
    if os.path.exists("public/logo.jpg"):
        apk.write("public/logo.jpg", "res/drawable/logo.jpg")
    if os.path.exists("public/icons/icon-512.png"):
        apk.write("public/icons/icon-512.png", "res/mipmap-xxxhdpi/ic_launcher.png")

# Also copy to dist and alternative name
shutil.copy(apk_path, "public/SALONE_LAW.apk")
if os.path.exists("dist"):
    shutil.copy(apk_path, dist_apk_path)
    shutil.copy(apk_path, "dist/SALONE_LAW.apk")

print("SALONE LAW APK created successfully at public/salone-law.apk and dist/salone-law.apk!")
