#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""更新B站视频封面和标题"""

import re

html_file = "H:/AIxm/grwz - 副本/index.html"

# 读取HTML文件
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 定义视频数据：BV号 -> (真实标题, 封面URL)
video_data = {
    "BV1A5wuzQEhN": ("生活需要仪式感", "http://i0.hdslb.com/bfs/archive/8edfea945a33621d096130317004f684d46f6446.jpg"),
    "BV1jUwkzqEvK": ("电商广告视频", "http://i2.hdslb.com/bfs/archive/afcd7c42c7f450001a5dfda30a1bfbbd959154c6.jpg"),
    "BV17mwkzME79": ("雄安未来城市畅享", "http://i2.hdslb.com/bfs/archive/bfc9a62e30038260f91e75f05e7435b84e6b87c5.jpg"),
    "BV17mwkzMEQk": ("水韵太极酒AIGC广告宣传片", "http://i0.hdslb.com/bfs/archive/3566aac0c55232258f0d86996bb35fbcd40ff53d.jpg"),
    "BV1uPwCz4ESG": ("次世代佩戴：超越界限的动力", "http://i0.hdslb.com/bfs/archive/2f2d8181346f5dbd28613fb3f2dd991fe9895fdd.jpg"),
    "BV1UJAczuEwQ": ("蜜雪冰城AIGC创意广告片", "http://i0.hdslb.com/bfs/archive/ce4d61e4bdb3a002c1f826221343264648371282.jpg"),
    "BV1id9LBBEBE": ("雄安9周年", "http://i0.hdslb.com/bfs/archive/8d8232092db535a207ce43d72e3e6a937efcd7a9.jpg"),
    "BV1PvDLBGExy": ("雪山救狐狸", "http://i1.hdslb.com/bfs/archive/2d8f961bb91ab0c99b10e472fecbc3d368209681.jpg"),
    "BV1xPdpB5EGx": ("藏锋之沈财神重出江湖", "http://i1.hdslb.com/bfs/archive/3e0e83ecb49956edcd0e445229377bbe91c72a3b.jpg"),
    "BV1CyofB2EeS": ("水韵太极诗仙篇-AIGC广告视频", "http://i1.hdslb.com/bfs/archive/85355abdd7fd88a85410131b8ac27279d1f910dd.jpg"),
    "BV1SGZFB4ET6": ("一条视频看雄安", "http://i1.hdslb.com/bfs/archive/a10e6fead03f3716e7ad2b4b8a85b46909e8f845.jpg"),
    "BV1FJ546LEHS": ('来雄安吧，追梦的"傻子们"', "http://i0.hdslb.com/bfs/archive/b16551deffb6707f943813b3b1c1f77400cb297c.jpg"),
    "BV1JJ546LEiM": ("唐僧-大勇活法", "http://i2.hdslb.com/bfs/archive/0ebc9e58c94ffd3b3ff1d86758478e3909da8c26.jpg"),
}

count = 0

for bvid, (title, cover_url) in video_data.items():
    # 更新封面图片 URL
    old_cover_pattern = f'data-bvid="{bvid}" src="https://i0.hdslb.com/bfs/archive/placeholder_cover.png"'
    new_cover = f'data-bvid="{bvid}" src="{cover_url}"'
    if old_cover_pattern in content:
        content = content.replace(old_cover_pattern, new_cover)
        count += 1
        print(f"✓ 更新封面: {bvid}")

    # 更新alt文本
    old_alt_pattern = f'alt="{title}封面"'
    # 检查是否存在该视频的work-info部分，并更新标题
    work_info_pattern = rf'(<h3>)[^<]*(</h3>\s*<p class="work-category">AIGC视频</p>)'
    # 找到包含这个bvid的work-card块
    bvid_pattern = rf'(<div class="work-card">.*?<div class="work-cover video-cover-wrapper">.*?data-bvid="{bvid}".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)'
    match = re.search(bvid_pattern, content, re.DOTALL)
    if match:
        old_title = match.group(1).split('<h3>')[-1] if '<h3>' in match.group(1) else ''
        if old_title:
            content = content.replace(
                f'<h3>{old_title}</h3>',
                f'<h3>{title}</h3>'
            )
            print(f"✓ 更新标题: {old_title} -> {title}")

print(f"\n✅ 完成！共更新 {count} 个封面")
