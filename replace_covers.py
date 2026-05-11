import re

html_path = 'H:/AIxm/grwz - 副本/index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 匹配：data-bvid="XXX" src="..."
# 替换为：data-bvid="XXX" src="images/XXX.jpg"
pattern = r'(data-bvid="(BV\w+)") src="[^"]*"'
replacement = r'\1 src="images/\2.jpg"'

new_content, count = re.subn(pattern, replacement, content)
print(f'匹配到 {count} 处，准备替换...')

if count > 0:
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'✓ 已替换 {count} 处封面路径为本地路径')
else:
    print('未找到匹配，请检查HTML格式')
