#!/usr/bin/env python3
"""
Script d'extraction et d'archivage des médias Instagram d'Adriel Fotso (@adrielfotsography).
Conçu selon les standards de rigueur multi-agents Modah / GamingWorld.
Génère un manifeste atomique avec sha256, dimensions, MIME, statut unitaire et gestion de reprise.
"""

import os
import sys
import json
import hashlib
import tempfile
from pathlib import Path
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from PIL import Image

# Racine du projet déduite dynamiquement
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_MEDIA_DIR = PROJECT_ROOT / "public" / "instagram-library"
DATA_DIR = PROJECT_ROOT / "src" / "data"
MANIFEST_PATH = DATA_DIR / "instagram-manifest.generated.json"

def calculate_sha256(filepath: Path) -> str:
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

def inspect_file(filepath: Path) -> Dict[str, Any]:
    stat = filepath.stat()
    size = stat.st_size
    width = 0
    height = 0
    mime = "application/octet-stream"

    suffix = filepath.suffix.lower()
    if suffix in [".jpg", ".jpeg"]:
        mime = "image/jpeg"
    elif suffix == ".png":
        mime = "image/png"
    elif suffix == ".webp":
        mime = "image/webp"
    elif suffix == ".mp4":
        mime = "video/mp4"

    if mime.startswith("image/"):
        try:
            with Image.open(filepath) as img:
                width, height = img.size
        except Exception:
            pass

    return {
        "local_path": str(filepath.relative_to(PROJECT_ROOT)).replace("\\", "/"),
        "public_path": f"/instagram-library/{filepath.name}",
        "size_bytes": size,
        "width": width,
        "height": height,
        "mime_type": mime,
        "sha256": calculate_sha256(filepath)
    }

def atomic_save_json(filepath: Path, data: Dict[str, Any]):
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", dir=filepath.parent, delete=False, encoding="utf-8") as tf:
        json.dump(data, tf, indent=2, ensure_ascii=False)
        temp_name = tf.name
    os.replace(temp_name, filepath)

def load_existing_manifest() -> Dict[str, Any]:
    if MANIFEST_PATH.exists():
        try:
            with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "source": "Instagram (@adrielfotsography)",
        "last_updated": None,
        "media_count": 0,
        "media": []
    }

def extract(username: str = "adrielfotsography", max_items: int = 12) -> int:
    import instaloader

    OUTPUT_MEDIA_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    manifest = load_existing_manifest()
    existing_by_id = {item["id"]: item for item in manifest.get("media", [])}

    L = instaloader.Instaloader(
        download_pictures=True,
        download_videos=True,
        download_video_thumbnails=True,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        dirname_pattern=str(OUTPUT_MEDIA_DIR),
        filename_pattern="{shortcode}_{date_utc:%Y%m%d}"
    )

    print(f"[EXTRACTION] Initialisation pour le compte @{username}...")
    try:
        profile = instaloader.Profile.from_username(L.context, username)
    except Exception as e:
        print(f"[ERREUR] Impossible de charger le profil @{username}: {e}")
        # En cas de rate-limit Instagram (429), consigner et ne pas corrompre le manifeste existant
        manifest["last_attempt"] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "rate_limited_or_blocked",
            "error": str(e)
        }
        atomic_save_json(MANIFEST_PATH, manifest)
        return 1

    profile_meta = {
        "username": profile.username,
        "full_name": profile.full_name,
        "biography": profile.biography,
        "followers_count": profile.followers,
        "following_count": profile.followees,
        "posts_total_count": profile.mediacount,
        "is_verified": profile.is_verified,
        "retrieved_at": datetime.now(timezone.utc).isoformat()
    }

    processed_media = list(existing_by_id.values())
    new_downloads = 0

    try:
        for idx, post in enumerate(profile.get_posts()):
            if idx >= max_items:
                break

            media_id = f"ig_{post.shortcode}"
            if media_id in existing_by_id and existing_by_id[media_id].get("status") == "downloaded":
                print(f"[SKIP] {media_id} déjà présent et validé.")
                continue

            print(f"[FETCH] Récupération post {idx+1}/{max_items}: {post.shortcode} ({post.date_utc})")
            status = "failed"
            file_meta = None

            try:
                L.download_post(post, target=str(OUTPUT_MEDIA_DIR))
                # Rechercher le fichier téléchargé correspondant
                matches = list(OUTPUT_MEDIA_DIR.glob(f"{post.shortcode}*.*"))
                if matches:
                    status = "downloaded"
                    new_downloads += 1
                    file_meta = inspect_file(matches[0])
            except Exception as dl_err:
                print(f"[ERREUR] Échec du téléchargement pour {post.shortcode}: {dl_err}")
                status = "failed"

            media_entry = {
                "id": media_id,
                "shortcode": post.shortcode,
                "post_url": f"https://www.instagram.com/p/{post.shortcode}/",
                "published_at": post.date_utc.replace(tzinfo=timezone.utc).isoformat(),
                "caption": post.caption or "",
                "is_video": post.is_video,
                "status": status,
                "file": file_meta
            }

            existing_by_id[media_id] = media_entry

    except Exception as iter_err:
        print(f"[AVERTISSEMENT] Arrêt de la boucle de pagination: {iter_err}")

    updated_manifest = {
        "profile": profile_meta,
        "last_updated": datetime.now(timezone.utc).isoformat(),
        "total_items": len(existing_by_id),
        "media": sorted(existing_by_id.values(), key=lambda x: x.get("published_at", ""), reverse=True)
    }

    atomic_save_json(MANIFEST_PATH, updated_manifest)
    print(f"[SUCCÈS] Manifeste mis à jour: {len(existing_by_id)} entrées ({new_downloads} nouveaux téléchargements).")
    return 0

if __name__ == "__main__":
    user = sys.argv[1] if len(sys.argv) > 1 else "adrielfotsography"
    sys.exit(extract(user))
