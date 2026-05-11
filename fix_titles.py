#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""更新视频标题为B站实际标题"""

with open(r'H:\AIxm\grwz - 副本\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# B站实际标题
title_updates = [
    # 第一个视频
    ('<h3>红酒品牌·AI系列广告片</h3>', '<h3>生活需要仪式感</h3>'),
    # 第二个视频
    ('<h3>AI实战案例分享</h3>', '<h3>电商广告视频</h3>'),
    # 第三个视频
    ('<h3>AI工具实战教程</h3>', '<h3>雄安未来城市畅享</h3>'),
    # 第四个视频 - 需要区分，因为有多个
    # 继续往后找...
]

# 简单替换 - 按顺序替换第一个匹配的
# 由于有重复标题，我们需要更精确的匹配

import re

# 更精确的替换 - 通过BV号上下文来定位
# 创建一个更智能的替换逻辑

# BV1A5wuzQEhN -> 生活需要仪式感
content = re.sub(
    r'(data-bvid="BV1A5wuzQEhN".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>生活需要仪式感\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1A5wuzQEhN -> 生活需要仪式感")

# BV1jUwkzqEvK -> 电商广告视频
content = re.sub(
    r'(data-bvid="BV1jUwkzqEvK".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>电商广告视频\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1jUwkzqEvK -> 电商广告视频")

# BV17mwkzME79 -> 雄安未来城市畅享
content = re.sub(
    r'(data-bvid="BV17mwkzME79".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>雄安未来城市畅享\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV17mwkzME79 -> 雄安未来城市畅享")

# BV17mwkzMEQk -> 水韵太极酒AIGC广告宣传片
content = re.sub(
    r'(data-bvid="BV17mwkzMEQk".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>水韵太极酒AIGC广告宣传片\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV17mwkzMEQk -> 水韵太极酒AIGC广告宣传片")

# BV1uPwCz4ESG -> 次世代佩戴：超越界限的动力
content = re.sub(
    r'(data-bvid="BV1uPwCz4ESG".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>次世代佩戴：超越界限的动力\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1uPwCz4ESG -> 次世代佩戴：超越界限的动力")

# BV1UJAczuEwQ -> 蜜雪冰城AIGC创意广告片
content = re.sub(
    r'(data-bvid="BV1UJAczuEwQ".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>蜜雪冰城AIGC创意广告片\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1UJAczuEwQ -> 蜜雪冰城AIGC创意广告片")

# BV1id9LBBEBE -> 雄安9周年
content = re.sub(
    r'(data-bvid="BV1id9LBBEBE".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>雄安9周年\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1id9LBBEBE -> 雄安9周年")

# BV1PvDLBGExy -> 雪山救狐狸
content = re.sub(
    r'(data-bvid="BV1PvDLBGExy".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>雪山救狐狸\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1PvDLBGExy -> 雪山救狐狸")

# BV1xPdpB5EGx -> 藏锋之沈财神重出江湖
content = re.sub(
    r'(data-bvid="BV1xPdpB5EGx".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>藏锋之沈财神重出江湖\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1xPdpB5EGx -> 藏锋之沈财神重出江湖")

# BV1CyofB2EeS -> 水韵太极诗仙篇-AIGC广告视频
content = re.sub(
    r'(data-bvid="BV1CyofB2EeS".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>水韵太极诗仙篇-AIGC广告视频\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1CyofB2EeS -> 水韵太极诗仙篇-AIGC广告视频")

# BV1SGZFB4ET6 -> 一条视频看雄安
content = re.sub(
    r'(data-bvid="BV1SGZFB4ET6".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>一条视频看雄安\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1SGZFB4ET6 -> 一条视频看雄安")

# BV1FJ546LEHS -> 来雄安吧，追梦的"傻子们"
content = re.sub(
    r'(data-bvid="BV1FJ546LEHS".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>来雄安吧，追梦的"傻子们"\g<2>',
    content, flags=re.DOTALL
)
print('[OK] BV1FJ546LEHS -> 来雄安吧，追梦的"傻子们"')

# BV1JJ546LEiM -> 唐僧-大勇活法
content = re.sub(
    r'(data-bvid="BV1JJ546LEiM".*?<div class="work-info">.*?<h3>)[^<]*(</h3>)',
    r'\g<1>唐僧-大勇活法\g<2>',
    content, flags=re.DOTALL
)
print("[OK] BV1JJ546LEiM -> 唐僧-大勇活法")

with open(r'H:\AIxm\grwz - 副本\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ 所有标题已更新为B站实际标题！")
