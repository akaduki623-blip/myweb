# 批量更新B站视频封面URL
$htmlFile = "H:/AIxm/grwz - 副本/index.html"

# 读取文件内容
$content = Get-Content $htmlFile -Raw -Encoding UTF8

# 定义BV号到封面URL的映射
$coverMap = @{
    "BV1A5wuzQEhN" = "http://i0.hdslb.com/bfs/archive/8edfea945a33621d096130317004f684d46f6446.jpg"
    "BV1jUwkzqEvK" = "http://i2.hdslb.com/bfs/archive/afcd7c42c7f450001a5dfda30a1bfbbd959154c6.jpg"
    "BV17mwkzME79" = "http://i2.hdslb.com/bfs/archive/bfc9a62e30038260f91e75f05e7435b84e6b87c5.jpg"
    "BV17mwkzMEQk" = "http://i0.hdslb.com/bfs/archive/3566aac0c55232258f0d86996bb35fbcd40ff53d.jpg"
    "BV1uPwCz4ESG" = "http://i0.hdslb.com/bfs/archive/2f2d8181346f5dbd28613fb3f2dd991fe9895fdd.jpg"
    "BV1UJAczuEwQ" = "http://i0.hdslb.com/bfs/archive/ce4d61e4bdb3a002c1f826221343264648371282.jpg"
    "BV1id9LBBEBE" = "http://i0.hdslb.com/bfs/archive/8d8232092db535a207ce43d72e3e6a937efcd7a9.jpg"
    "BV1PvDLBGExy" = "http://i1.hdslb.com/bfs/archive/2d8f961bb91ab0c99b10e472fecbc3d368209681.jpg"
    "BV1xPdpB5EGx" = "http://i1.hdslb.com/bfs/archive/3e0e83ecb49956edcd0e445229377bbe91c72a3b.jpg"
    "BV1CyofB2EeS" = "http://i1.hdslb.com/bfs/archive/85355abdd7fd88a85410131b8ac27279d1f910dd.jpg"
    "BV1SGZFB4ET6" = "http://i1.hdslb.com/bfs/archive/a10e6fead03f3716e7ad2b4b8a85b46909e8f845.jpg"
    "BV1FJ546LEHS" = "http://i0.hdslb.com/bfs/archive/b16551deffb6707f943813b3b1c1f77400cb297c.jpg"
    "BV1JJ546LEiM" = "http://i2.hdslb.com/bfs/archive/0ebc9e58c94ffd3b3ff1d86758478e3909da8c26.jpg"
}

# 替换所有封面URL
foreach ($bvid in $coverMap.Keys) {
    $oldPattern = "data-bvid=`"$bvid`" src=`"https://i0.hdslb.com/bfs/archive/placeholder_cover.png`""
    $newPattern = "data-bvid=`"$bvid`" src=`"$($coverMap[$bvid])`""
    $content = $content -replace [regex]::Escape($oldPattern), $newPattern
}

# 写回文件
Set-Content $htmlFile -Value $content -Encoding UTF8

Write-Host "✅ 已更新所有视频封面URL" -ForegroundColor Green
