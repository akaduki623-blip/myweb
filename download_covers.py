import subprocess, json, urllib.request, os, sys

bvids = [
    'BV1A5wuzQEhN','BV1jUwkzqEvK','BV17mwkzME79','BV17mwkzMEQk',
    'BV1uPwCz4ESG','BV1UJAczuEwQ','BV1id9LBBEBE','BV1PvDLBGExy',
    'BV1xPdpB5EGx','BV1CyofB2EeS','BV1SGZFB4ET6','BV1FJ546LEHS','BV1JJ546LEiM'
]

yt_exe = r'/c/Users/Administrator/python-sdk/python3.13.2/Scripts/yt-dlp.exe'
results = {}

print("=== 获取封面URL ===")
for bvid in bvids:
    try:
        r = subprocess.run([yt_exe, '--dump-json', '--skip-download', f'https://www.bilibili.com/video/{bvid}'],
            capture_output=True, text=True, timeout=30)
        if r.returncode == 0:
            info = json.loads(r.stdout)
            thumb = info.get('thumbnail', '')
            # 尝试获取更高清的封面（B站支持 @.jpg）
            if thumb and '/archive/' in thumb:
                high = thumb.replace('.jpg', '@.jpg')
                try:
                    req = urllib.request.Request(high, headers={'User-Agent':'Mozilla/5.0','Referer':'https://www.bilibili.com'})
                    urllib.request.urlopen(req, timeout=5).read()
                    thumb = high
                except:
                    pass
            results[bvid] = thumb
            print(f'  ✓ {bvid}: {thumb[-50:]}')
        else:
            print(f'  ✗ {bvid}: {r.stderr[:80]}')
    except Exception as e:
        print(f'  ✗ {bvid}: {e}')

print(f"\n=== 下载封面到本地 ({len(results)} 个) ===")
for bvid, url in results.items():
    if not url:
        print(f'  ✗ {bvid}: 无封面URL，跳过')
        continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Referer':'https://www.bilibili.com'})
        data = urllib.request.urlopen(req, timeout=15).read()
        fname = f'{bvid}.jpg'
        with open(fname, 'wb') as f:
            f.write(data)
        fsize = os.path.getsize(fname)
        print(f'  ✓ 已保存 {fname} ({fsize//1024}KB)')
    except Exception as e:
        print(f'  ✗ {bvid} 下载失败: {e}')

print('\n完成!')
