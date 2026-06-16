// DOM加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
    // 响应式菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // 点击导航链接后关闭菜单
    const navLinkItems = document.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // 平滑滚动
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // 高亮当前导航项
        const sections = document.querySelectorAll('.section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // 统一的IntersectionObserver配置，用于处理所有需要观察的元素
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // 统一的IntersectionObserver实例，处理所有观察逻辑
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 处理元素淡入效果
                if (entry.target.classList.contains('section') || entry.target.classList.contains('work-item')) {
                    entry.target.classList.add('visible');
                }
                // 对于懒加载图片，浏览器的原生lazyload会处理，这里可以保留原有的JavaScript逻辑作为备选
                if (entry.target.classList.contains('lazy')) {
                    // 这里保留原有的懒加载逻辑作为备选
                }
                // 不再需要取消观察，浏览器会处理
            }
        });
    }, observerOptions);
    
    // 观察所有需要淡入的元素
    const fadeElements = document.querySelectorAll('.section, .work-item');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // 作品筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    // 筛选逻辑（单独函数，供初始化和点击事件共用）
    function doFilter(filter) {
        workItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (category === filter) {
                item.classList.remove('hiding');
                item.style.display = '';
                setTimeout(() => {
                    item.classList.add('visible');
                }, 50);
            } else {
                item.classList.add('hiding');
                setTimeout(() => {
                    if (item.classList.contains('hiding')) item.style.display = 'none';
                }, 300);
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 如果点击的是已选中的按钮，什么都不做
            if (this.classList.contains('active')) {
                return;
            }

            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            doFilter(filter);
        });
    });

    // 页面加载时，立即执行一次筛选（根据当前 active 按钮）
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        doFilter(activeBtn.getAttribute('data-filter'));
    }
    
    // 作品详情模态框
    const modal = document.getElementById('workModal');
    const closeModal = document.querySelector('.close');
    const viewButtons = document.querySelectorAll('.view-btn');
    const modalBody = document.querySelector('.modal-body');
    
    // 作品数据
    const workData = [
        {
            id: 1,
            title: 'AI广告宣传片 - “满井坡”矿泉水广告商单',
            category: '视频作品',
            cover: 'images/work1.jpg',
            background: '本作品是为"满井坡"矿泉水制作的AI广告宣传片，结合了AI生成的视觉效果和创意文案，展现产品的自然纯净特性。',
            tools: ['ChatGPT', 'Runway ML', 'After Effects', 'Premiere Pro'],
            link: 'https://www.xiaohongshu.com/discovery/item/6937d432000000000d038dbd?source=webshare&xhsshare=pc_web&xsec_token=ABctCHE19xr1BsuiKGqjsjTdxYALhGAX5kmdLxOEh0goA=&xsec_source=pc_share',
            content: `<p>这是一部运用AI技术制作的矿泉水广告宣传片，通过AI生成的自然场景和流畅动画，展现了"满井坡"矿泉水的纯净品质和自然起源。</p><p>作品采用了AI辅助创作流程，从创意构思到最终渲染，大幅提高了制作效率，同时保持了高品质的视觉效果。</p>`
        },
        {
            id: 2,
            title: '原创歌曲《来雄安吧，追梦的“傻子们”》',
            category: '视频作品',
            cover: 'images/work3.jpg',
            background: '本作品是一首原创歌曲的音乐视频，以雄安新区为背景，表达了年轻人追逐梦想的精神。',
            tools: ['Logic Pro', 'After Effects', 'Premiere Pro', 'AI音频生成'],
            link: 'http://xhslink.com/o/69Ojfr4lY0z',
            content: `<p>这是一首为雄安新区创作的原创歌曲，通过音乐和视频展现了年轻人在雄安追逐梦想的故事。歌曲融合了流行元素和励志主题，视频则记录了雄安新区的发展变化。</p><p>作品采用了AI辅助的音频制作和视频剪辑技术，提高了创作效率和作品质量。</p>`
        },
        {
            id: 3,
            title: '一条视频看雄安 - 起笔千年，画就未来',
            category: '视频作品',
            cover: 'http://i1.hdslb.com/bfs/archive/a10e6fead03f3716e7ad2b4b8a85b46909e8f845.jpg',
            background: '"这么近，那么美，周末到河北。" 五一长假将至，雄安与你同行AI视觉实验室开启了两天两夜的极限创作模式。通过"实拍+AIGC视觉重构"，无数次AI"抽卡"与筛选，最终剪辑出白鹭视角飞越雄安的短片。',
            tools: ['AI视频生成', '实拍', 'AI抽卡筛选', '后期剪辑'],
            link: 'https://www.bilibili.com/video/BV1SGZFB4ET6',
            content: `<p>一条视频看雄安 - 起笔千年，画就未来</p><p>这是雄安与你同行AI视觉实验室为五一长假创作的雄安旅游应援片。通过"实拍+AIGC视觉重构"的创新方式，用白鹭视角飞越雄安，展现这座"未来之城"的崛起。</p><p>虽然目前的AI技术在处理超宏大场景时仍带有某些"梦境般的瑕疵"，但这种不完美的数字质感，恰恰记录了我们与这座"未来之城"共同成长的痕迹。</p>`
        },
        {
            id: 4,
            title: '短视频制作全流程教程',
            category: '视频作品',
            cover: 'images/work6.jpg',
            background: '本教程系统介绍了短视频制作的完整流程，从选题策划到后期剪辑，帮助初学者快速掌握短视频制作技能。',
            tools: ['Premiere Pro', 'CapCut', 'DaVinci Resolve', 'Photoshop'],
            link: '#',
            content: `<p>教程包含了短视频制作的各个环节：选题策划、脚本撰写、拍摄技巧、灯光布置、后期剪辑、音效处理等。通过实际案例演示，让读者直观了解每个环节的操作方法。</p><p>本教程适合想从事短视频创作的初学者，也可以作为专业创作者的参考资料。</p>`
        },
        {
            id: 5,
            title: 'AI特效制作案例 - 科幻场景',
            category: '视频作品',
            cover: 'images/work7.jpg',
            background: '本作品展示了如何运用AI工具制作震撼的科幻场景特效，包括星际旅行、未来城市等元素。',
            tools: ['MidJourney', 'After Effects', 'Premiere Pro', 'DaVinci Resolve'],
            link: '#',
            content: `<p>这是一个AI特效制作案例，展示了如何运用多种AI工具创建震撼的科幻场景。作品包含了星际旅行、未来城市、外星生物等元素，通过AI生成和后期合成技术实现。</p><p>本案例详细介绍了从概念设计到最终渲染的完整流程，适合学习AI特效制作的创作者参考。</p>`
        },
        {
            id: 6,
            title: '产品演示视频 - AI工具介绍',
            category: '视频作品',
            cover: 'images/work8.jpg',
            background: '本作品是一款AI工具的产品演示视频，通过简洁明了的方式展示了工具的核心功能和使用方法。',
            tools: ['Premiere Pro', 'After Effects', 'ScreenFlow', 'AI配音'],
            link: '#',
            content: `<p>这是一款AI创作工具的产品演示视频，通过直观的界面展示和功能演示，向用户介绍了工具的核心特性和使用方法。</p><p>视频采用了清晰的结构和流畅的动画，帮助用户快速了解产品的价值和使用流程。</p>`
        }
    ];
    
    viewButtons.forEach((button) => {
        button.addEventListener('click', function() {
            // 找到当前作品项
            const workCard = this.closest('.work-card');
            const workItem = workCard.closest('.work-item');

            // 如果是 case 分类（网站小程序），使用新的图片弹窗，不走旧逻辑
            if (workItem && (workItem.getAttribute('data-category') === 'case' || workItem.getAttribute('data-category') === 'visual')) {
                return;
            }

            // 获取作品索引（基于作品在HTML中的位置）
            const workItems = document.querySelectorAll('.work-item');
            const index = Array.from(workItems).indexOf(workItem);
            
            // 获取对应作品数据
            const work = workData[index];
            
            modalBody.innerHTML = `
                <div class="work-detail">
                    <img src="${work.cover}" alt="${work.title}" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                    <h2>${work.title}</h2>
                    <p class="work-category" style="margin-bottom: 20px;">${work.category}</p>
                    
                    <div class="detail-section">
                        <h3 style="margin-bottom: 10px; color: #2c3e50;">创作背景</h3>
                        <p style="margin-bottom: 20px; color: #555;">${work.background}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h3 style="margin-bottom: 10px; color: #2c3e50;">使用工具</h3>
                        <div class="tools-list" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
                            ${work.tools.map(tool => `<span style="padding: 8px 16px; background-color: #ecf0f1; color: #2c3e50; border-radius: 20px; font-size: 14px;">${tool}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3 style="margin-bottom: 10px; color: #2c3e50;">作品内容</h3>
                        <div style="color: #555; line-height: 1.6; margin-bottom: 20px;">${work.content}</div>
                    </div>
                    
                    <div class="detail-section">
                        <a href="${work.link}" target="_blank" style="display: inline-block; padding: 12px 30px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 25px; font-weight: 600; transition: all 0.3s ease;">查看成品</a>
                    </div>
                </div>
            `;
            
            modal.style.display = 'block';
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 动态背景交互 - 根据鼠标位置移动背景光效
    const homeSection = document.querySelector('.home');

    homeSection.addEventListener('mousemove', function(e) {
        const rect = homeSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 计算鼠标在容器中的百分比位置
        const xPercent = (x / rect.width) * 2 - 1;
        const yPercent = (y / rect.height) * 2 - 1;

        // 应用动态效果
        homeSection.style.setProperty('--mouse-x', xPercent * 20 + 'px');
        homeSection.style.setProperty('--mouse-y', yPercent * 20 + 'px');
    });
});

// 点击播放视频函数 - 弹窗播放
function playVideo(overlay) {
    const wrapper = overlay.closest('.video-cover-wrapper');
    const iframe = wrapper.querySelector('.video-iframe');
    const bvid = iframe.getAttribute('data-bvid') || wrapper.querySelector('.video-cover-img')?.getAttribute('data-bvid') || '';
    
    // 获取标题
    const workCard = wrapper.closest('.work-card');
    const titleEl = workCard?.querySelector('.work-info h3');
    const title = titleEl ? titleEl.textContent : '视频播放';
    
    // 获取视频URL
    const videoSrc = iframe.getAttribute('data-src');
    
    // 填充弹窗
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoModalPlayer');
    const titleBar = document.getElementById('videoModalTitle');
    
    // 清空并重新创建iframe
    player.innerHTML = '';
    const newIframe = document.createElement('iframe');
    newIframe.src = videoSrc;
    newIframe.style.width = '100%';
    newIframe.style.height = '100%';
    newIframe.style.border = 'none';
    newIframe.allowFullscreen = true;
    newIframe.allow = 'autoplay; encrypted-media';
    player.appendChild(newIframe);
    
    titleBar.textContent = title;
    modal.style.display = 'flex';
    
    // ESC关闭
    document.addEventListener('keydown', function escClose(e) {
        if (e.key === 'Escape') {
            closeVideoModal();
            document.removeEventListener('keydown', escClose);
        }
    });
}

// 关闭视频弹窗
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoModalPlayer');
    modal.style.display = 'none';
    // 停止播放：清空iframe
    player.innerHTML = '';
}

// 图片查看弹窗
function openImgModal(src) {
    const modal = document.getElementById('imgModal');
    const content = document.getElementById('imgModalContent');
    if (modal && content) {
        content.src = src;
        modal.style.display = 'flex';
    }
}

function closeImgModal() {
    const modal = document.getElementById('imgModal');
    const content = document.getElementById('imgModalContent');
    if (modal) {
        modal.style.display = 'none';
    }
    if (content) {
        content.src = '';
    }
}

// 导航栏滚动高亮
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// 返回顶部按钮
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });
}