#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""更新B站视频封面"""

import re

with open(r'H:\AIxm\grwz - 副本\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 精确替换 - BV号对应封面
replacements = [
    ('data-bvid="BV1A5wuzQEhN" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1A5wuzQEhN" src="http://i0.hdslb.com/bfs/archive/8edfea945a33621d096130317004f684d46f6446.jpg"'),
    ('data-bvid="BV1jUwkzqEvK" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1jUwkzqEvK" src="http://i2.hdslb.com/bfs/archive/afcd7c42c7f450001a5dfda30a1bfbbd959154c6.jpg"'),
    ('data-bvid="BV17mwkzME79" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV17mwkzME79" src="http://i2.hdslb.com/bfs/archive/bfc9a62e30038260f91e75f05e7435b84e6b87c5.jpg"'),
    ('data-bvid="BV17mwkzMEQk" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV17mwkzMEQk" src="http://i0.hdslb.com/bfs/archive/3566aac0c55232258f0d86996bb35fbcd40ff53d.jpg"'),
    ('data-bvid="BV1uPwCz4ESG" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1uPwCz4ESG" src="http://i0.hdslb.com/bfs/archive/2f2d8181346f5dbd28613fb3f2dd991fe9895fdd.jpg"'),
    ('data-bvid="BV1UJAczuEwQ" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1UJAczuEwQ" src="http://i0.hdslb.com/bfs/archive/ce4d61e4bdb3a002c1f826221343264648371282.jpg"'),
    ('data-bvid="BV1id9LBBEBE" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1id9LBBEBE" src="http://i0.hdslb.com/bfs/archive/8d8232092db535a207ce43d72e3e6a937efcd7a9.jpg"'),
    ('data-bvid="BV1PvDLBGExy" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1PvDLBGExy" src="http://i1.hdslb.com/bfs/archive/2d8f961bb91ab0c99b10e472fecbc3d368209681.jpg"'),
    ('data-bvid="BV1xPdpB5EGx" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1xPdpB5EGx" src="http://i1.hdslb.com/bfs/archive/3e0e83ecb49956edcd0e445229377bbe91c72a3b.jpg"'),
    ('data-bvid="BV1CyofB2EeS" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1CyofB2EeS" src="http://i1.hdslb.com/bfs/archive/85355abdd7fd88a85410131b8ac27279d1f910dd.jpg"'),
    ('data-bvid="BV1SGZFB4ET6" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1SGZFB4ET6" src="http://i1.hdslb.com/bfs/archive/a10e6fead03f3716e7ad2b4b8a85b46909e8f845.jpg"'),
    ('data-bvid="BV1FJ546LEHS" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1FJ546LEHS" src="http://i0.hdslb.com/bfs/archive/b16551deffb6707f943813b3b1c1f77400cb297c.jpg"'),
    ('data-bvid="BV1JJ546LEiM" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"',
     'data-bvid="BV1JJ546LEiM" src="http://i2.hdslb.com/bfs/archive/0ebc9e58c94ffd3b3ff1d86758478e3909da8c26.jpg"'),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        bvid = old.split('"')[1]
        print(f"[OK] {bvid}")
        count += 1
    else:
        bvid = old.split('"')[1]
        print(f"[SKIP] {bvid}")

with open(r'H:\AIxm\grwz - 副本\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n总计更新 {count} 个封面")
