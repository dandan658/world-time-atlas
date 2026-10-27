from pathlib import Path
from PIL import Image, ImageOps
import json
root=Path.cwd().resolve()
expected=Path(r'D:\Baidu Cloud\BaiduSyncdisk\静态网页\github-pages').resolve()
assert root==expected
assets=(root/'assets').resolve()
assert assets.parent==root
files=['poster-countries.json','city-images.json','landmarks.json','city-landmarks.json']
objects={name:json.loads((root/name).read_text(encoding='utf-8-sig')) for name in files}
references=set()
for data in objects.values():
    for item in (data if isinstance(data,list) else data.values()):
        path=item.get('image')
        if path:
            assert not path.startswith('http'),path
            references.add(path)
converted={};before=after=0
for value in sorted(references):
    src=(root/value).resolve()
    assert assets in src.parents,src
    dst=src.with_suffix('.webp')
    before+=src.stat().st_size
    with Image.open(src) as img:
        img=ImageOps.exif_transpose(img)
        if img.mode not in ('RGB','RGBA'):img=img.convert('RGBA' if 'transparency' in img.info else 'RGB')
        if max(img.size)>1920:img.thumbnail((1920,1920),Image.Resampling.LANCZOS)
        img.save(dst,format='WEBP',quality=85,method=6)
    after+=dst.stat().st_size
    converted[value]=dst.relative_to(root).as_posix()
for name,data in objects.items():
    for item in (data if isinstance(data,list) else data.values()):
        if item.get('image'):item['image']=converted[item['image']]
    (root/name).write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
keep={str((root/value).resolve()) for value in converted.values()}
removed=0
for file in assets.rglob('*'):
    if not file.is_file() or file.suffix.lower() not in ('.jpg','.jpeg','.png','.gif','.avif','.webp'):continue
    absolute=file.resolve()
    assert assets in absolute.parents,absolute
    if str(absolute) not in keep:
        file.unlink();removed+=1
print(f'WebP images: {len(keep)}; active source bytes: {before}; WebP bytes: {after}; removed old/unused images: {removed}')
