# Kadry na landing /sesja: klatki z wideo i zdjęcia fotografa w kolorze „look B” z reklam,
# w kadrach 4:3 (pasek na telefonie) i 4:5 (desktop, wariant B, pozycje, portret).
#
#   python3 scripts/sesja-kadry.py src/assets/sesja            # wszystko
#   python3 scripts/sesja-kadry.py src/assets/sesja --only reka,spacer
#   python3 scripts/sesja-kadry.py /tmp/podglad --preview      # szybki podgląd w pół rozdzielczości
#
# Wymaga: ffmpeg, Python 3 z numpy i Pillow, oraz ~/coding/fi-reklama/build/grade.py
# (ta sama korekta koloru co w reklamach). Źródła leżą w iCloud: sesje/sesja fi vid 1|2,
# sesje/sesja wizerunkowa. Wideo z Canona jest zapisane poziomo, stąd transpose=1.
import argparse, os, subprocess, sys
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, os.path.expanduser('~/coding/fi-reklama/build'))
import grade
LOOK_B = dict(knee=0.4, shadows=0.0, black=0.045, white=0.95, sat=0.8, skin_sat=0.9, warm=0.045, ev=0.7)

def lut(**kw):
    t = grade.table(33, **{**LOOK_B, **kw})
    return ImageFilter.Color3DLUT(33, t.ravel().tolist())

def frame(clip, t, w=2160, h=3840):
    cmd = ['ffmpeg', '-v', 'error', '-ss', f'{t:.3f}', '-i', clip, '-frames:v', '1',
           '-vf', f'transpose=1,scale={w}:{h}:in_color_matrix=bt709:in_range=full:out_range=full,format=rgb24',
           '-f', 'rawvideo', '-']
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    return Image.frombuffer('RGB', (w, h), raw, 'raw', 'RGB', 0, 1)

SESJE = '/Users/arturro/Library/Mobile Documents/com~apple~CloudDocs/sesje'
V1 = f'{SESJE}/sesja fi vid 1'
V2 = f'{SESJE}/sesja fi vid 2'
FOTO = f'{SESJE}/sesja wizerunkowa'

# kadr: (środek x, środek y, szerokość jako ułamek szerokości źródła, proporcja w/h)
ASSETS = {
    # bohaterowie wariantów (klatka pierwszego ujęcia reklamy)
    'stojac':  dict(src=('video', f'{V2}/IMG_5158.MP4', 13.5), ev=0.7,
                    crops={'4x3': (0.5, 0.335, 1.0, 4/3), '4x5': (0.5, 0.42, 1.0, 4/5)}),
    'oczy':    dict(src=('video', f'{V2}/IMG_5156.MP4', 2.0), ev=0.7,
                    crops={'4x3': (0.5, 0.31, 1.0, 4/3), '4x5': (0.5, 0.40, 1.0, 4/5)}),
    'spacer':  dict(src=('video', f'{V2}/IMG_5160.MP4', 24.3), ev=0.7,
                    crops={'4x3': (0.5, 0.40, 1.0, 4/3), '4x5': (0.5, 0.45, 1.0, 4/5)}),
    'reka':    dict(src=('video', f'{V2}/IMG_5156.MP4', 11.2), ev=0.7,
                    crops={'4x3': (0.5, 0.36, 1.0, 4/3), '4x5': (0.5, 0.40, 1.0, 4/5)}),
    'lopatka': dict(src=('video', f'{V1}/IMG_5002.MP4', 1.2), ev=0.95,
                    crops={'4x3': (0.5, 0.40, 1.0, 4/3), '4x5': (0.5, 0.42, 1.0, 4/5)}),
    # pozycje w trakcie lekcji
    'lezac':   dict(src=('photo', f'{FOTO}/Artur_gabinet-14.jpg'), ev=0.25,
                    crops={'4x5': (0.5, 0.47, 1.0, 4/5)}),
    'siedzac': dict(src=('photo', f'{FOTO}/Artur_gabinet-13.jpg'), ev=0.25,
                    crops={'4x5': (0.43, 0.5, 0.533, 4/5)}),
    'stojac-plecy': dict(src=('video', f'{V2}/IMG_5158.MP4', 10.5), ev=0.7,
                    crops={'4x5': (0.47, 0.34, 0.78, 4/5)}),
    # prowadzący
    'artur':   dict(src=('photo', f'{FOTO}/Artur_gabinet-7.jpg'), ev=0.25,
                    crops={'4x5': (0.31, 0.47, 0.62, 4/5)}),
}

def load(spec, preview):
    kind = spec['src'][0]
    if kind == 'video':
        _, clip, t = spec['src']
        w, h = (1080, 1920) if preview else (2160, 3840)
        return frame(clip, t, w, h)
    im = Image.open(spec['src'][1]).convert('RGB')
    if preview:
        im.thumbnail((1400, 1400))
    return im

def crop(im, c):
    cx, cy, wf, asp = c
    W, H = im.size
    bw = wf * W
    bh = bw / asp
    if bh > H:
        bh = H; bw = bh * asp
    x0 = min(max(cx * W - bw / 2, 0), W - bw)
    y0 = min(max(cy * H - bh / 2, 0), H - bh)
    return im.crop((round(x0), round(y0), round(x0 + bw), round(y0 + bh)))

MAX = {'4x3': 1800, '4x5': 1440}

if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('out'); p.add_argument('--only'); p.add_argument('--preview', action='store_true')
    a = p.parse_args()
    os.makedirs(a.out, exist_ok=True)
    for name, spec in ASSETS.items():
        if a.only and name not in a.only.split(','):
            continue
        im = load(spec, a.preview).filter(lut(ev=spec['ev']))
        for cname, c in spec['crops'].items():
            out = crop(im, c)
            mw = 600 if a.preview else MAX[cname]
            if out.width > mw:
                out = out.resize((mw, round(mw * out.height / out.width)), Image.LANCZOS)
            path = f'{a.out}/sesja-{name}-{cname}.jpg'
            out.save(path, quality=90 if not a.preview else 80, optimize=True, progressive=True)
            print(path, out.size)
