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
    
    // 页面滚动时元素淡入效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            workItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (category === filter) {
                    item.style.display = 'block';
                    // 重新触发动画
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 100);
                } else {
                    item.classList.remove('visible');
                    // 使用setTimeout确保动画结束后隐藏
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
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
            title: 'AI动画短片 - 科技与未来',
            category: '视频作品',
            cover: 'images/work5.jpg',
            background: '本作品是一部探讨科技与未来关系的AI动画短片，通过科幻场景和生动角色展现了未来世界的可能性。',
            tools: ['ChatGPT', 'Runway ML', 'After Effects', 'Photoshop'],
            link: '#',
            content: `<p>这是一部探讨科技与人类关系的动画短片，通过AI生成的视觉元素和精心设计的叙事结构，展现了未来科技发展的可能性。</p><p>作品耗时3个月完成，从概念构思到最终渲染，全程运用了AI辅助创作流程，大幅提高了生产效率同时保持了艺术品质。</p>`
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
        },
        {
            id: 7,
            title: '编程工具案例',
            category: '设计作品',
            cover: 'images/work4.jpg',
            background: '本作品展示了一款编程工具的UI/UX设计，注重用户体验和功能完整性。',
            tools: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
            link: '#',
            content: `<p>这是一款编程工具的界面设计案例，注重用户体验和功能完整性。设计采用了现代化的UI风格，清晰的信息层级和直观的交互方式。</p><p>作品包含了完整的设计系统、界面原型和交互设计，适合作为编程工具设计的参考案例。</p>`
        },
        {
            id: 8,
            title: '品牌视觉设计案例',
            category: '设计作品',
            cover: 'images/work9.jpg',
            background: '本案例展示了为某科技公司设计的完整品牌视觉系统，包括Logo设计、色彩体系、字体规范、应用场景等。',
            tools: ['Photoshop', 'Illustrator', 'Figma', 'InDesign'],
            link: '#',
            content: `<p>品牌设计围绕"创新、科技、未来"的核心价值，采用了简洁现代的设计风格。Logo设计运用了几何图形和渐变色彩，展现出科技感和活力。</p><p>完整的品牌视觉系统确保了品牌在各种应用场景下的一致性和识别度，帮助客户建立了鲜明的品牌形象。</p>`
        },
        {
            id: 9,
            title: '移动应用UI设计',
            category: '设计作品',
            cover: 'images/work10.jpg',
            background: '本作品是一款移动应用的UI设计，注重用户体验和视觉吸引力。',
            tools: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop'],
            link: '#',
            content: `<p>这是一款健康管理类移动应用的UI设计，采用了清新简约的设计风格，注重用户体验和信息的清晰呈现。</p><p>设计包含了完整的用户流程、界面设计和交互原型，适合作为移动应用设计的参考案例。</p>`
        },
        {
            id: 10,
            title: 'AI主题海报设计',
            category: '设计作品',
            cover: 'images/work11.jpg',
            background: '本作品是一系列以AI为主题的海报设计，展现了AI技术的多样性和创新性。',
            tools: ['MidJourney', 'Photoshop', 'Illustrator', 'Canva'],
            link: '#',
            content: `<p>这是一组以AI为主题的创意海报设计，通过视觉化的方式展现了AI技术的不同应用领域和创新性。</p><p>作品采用了AI辅助创作和手动设计相结合的方式，创造出独特的视觉效果，适合用于科技展会和学术活动的宣传。</p>`
        },
        {
            id: 11,
            title: '产品包装设计方案',
            category: '设计作品',
            cover: 'images/work12.jpg',
            background: '本作品是一款新产品的包装设计方案，注重品牌识别和产品特性的展现。',
            tools: ['Photoshop', 'Illustrator', '3D Max', 'Figma'],
            link: '#',
            content: `<p>这是一款智能硬件产品的包装设计方案，结合了品牌识别元素和产品特性，创造出既美观又实用的包装设计。</p><p>设计考虑了产品保护、物流运输和消费者体验等多个方面，适合作为产品包装设计的参考案例。</p>`
        },
        {
            id: 12,
            title: '科幻主题插画设计',
            category: '设计作品',
            cover: 'images/work13.jpg',
            background: '本作品是一系列科幻主题的插画设计，展现了未来世界的想象场景。',
            tools: ['MidJourney', 'Photoshop', 'Procreate', 'Illustrator'],
            link: '#',
            content: `<p>这是一组科幻主题的插画设计，通过丰富的色彩和细腻的笔触，展现了未来世界的各种想象场景，包括星际旅行、未来城市、外星生命等。</p><p>作品采用了AI辅助创作和手动绘制相结合的方式，创造出独特的视觉风格和想象力丰富的画面。</p>`
        },
        {
            id: 13,
            title: '品牌视觉识别系统',
            category: '商业视觉',
            cover: 'images/work16.jpg',
            background: '本作品展示了一个完整的品牌视觉识别系统，包括Logo设计、色彩体系、字体规范等。',
            tools: ['Figma', 'Photoshop', 'Illustrator', 'InDesign'],
            link: '#',
            content: `<p>品牌视觉识别系统是企业形象的核心组成部分，本作品展示了一个完整的品牌视觉识别系统设计，包括Logo设计、色彩体系、字体规范、应用场景等多个方面。</p><p>设计采用了现代化的设计风格，符合企业的品牌定位和目标受众需求，能够有效提升品牌的识别度和影响力。</p>`
        },
        {
            id: 14,
            title: '品牌视觉识别系统',
            category: '商业视觉',
            cover: 'images/work17.jpg',
            background: '本作品展示了一个完整的品牌视觉识别系统，包括Logo设计、色彩体系、字体规范等。',
            tools: ['Figma', 'Photoshop', 'Illustrator', 'InDesign'],
            link: '#',
            content: `<p>品牌视觉识别系统是企业形象的核心组成部分，本作品展示了一个完整的品牌视觉识别系统设计，包括Logo设计、色彩体系、字体规范、应用场景等多个方面。</p><p>设计采用了现代化的设计风格，符合企业的品牌定位和目标受众需求，能够有效提升品牌的识别度和影响力。</p>`
        },
        {
            id: 15,
            title: '品牌视觉识别系统',
            category: '商业视觉',
            cover: 'images/work18.jpg',
            background: '本作品展示了一个完整的品牌视觉识别系统，包括Logo设计、色彩体系、字体规范等。',
            tools: ['Figma', 'Photoshop', 'Illustrator', 'InDesign'],
            link: '#',
            content: `<p>品牌视觉识别系统是企业形象的核心组成部分，本作品展示了一个完整的品牌视觉识别系统设计，包括Logo设计、色彩体系、字体规范、应用场景等多个方面。</p><p>设计采用了现代化的设计风格，符合企业的品牌定位和目标受众需求，能够有效提升品牌的识别度和影响力。</p>`
        },
        {
            id: 16,
            title: '上海旅游景点',
            category: '商业视觉',
            cover: 'images/work19.jpg',
            background: '本作品是为上海旅游景点设计的宣传海报，展现了上海的独特魅力和旅游资源。',
            tools: ['Figma', 'Photoshop', 'Illustrator', 'InDesign'],
            link: '#',
            content: `<p>本作品是为上海旅游景点设计的宣传海报，展现了上海的独特魅力和旅游资源。</p><p>设计采用了现代化的设计风格，结合了上海的标志性建筑和文化元素，吸引游客前往上海旅游。</p>`
        },
        {
            id: 17,
            title: 'UI设计',
            category: '商业视觉',
            cover: 'images/work20.jpg',
            background: '本作品是为某应用设计的UI界面，注重用户体验和视觉吸引力。',
            tools: ['Figma', 'Photoshop', 'Illustrator', 'InDesign'],
            link: '#',
            content: `<p>本作品是为某应用设计的UI界面，注重用户体验和视觉吸引力。</p><p>设计采用了现代化的设计风格，清晰的信息层级和直观的交互方式，提高了用户的使用体验。</p>`
        },
        {
            id: 18,
            title: '从0开始认识AI',
            category: '商业视觉',
            cover: 'images/work2.jpg',
            background: '本文以疯狂动物城为比喻，生动形象地介绍了AI的基本概念和应用领域，适合初学者了解AI技术。',
            tools: ['Markdown', 'ChatGPT', 'Photoshop', 'Canva'],
            link: 'https://docs.qq.com/pdf/DZEtrbFRUTmx4VUZN',
            content: `<p>本文以疯狂动物城为比喻，通过生动有趣的方式介绍了AI的基本概念、发展历程和应用领域。文章采用了通俗易懂的语言和形象的比喻，帮助初学者快速理解AI技术。</p><p>内容涵盖了机器学习、深度学习、自然语言处理等核心概念，并结合实际应用案例进行说明，适合对AI感兴趣的读者阅读。</p>`
        },
        {
            id: 19,
            title: '800+Nano Banana Pro提示词',
            category: '公众号文章',
            cover: 'images/work10.jpg',
            background: '本文整理了800+Nano Banana Pro提示词，帮助用户更好地使用这款AI工具。',
            tools: ['ChatGPT', 'Nano Banana Pro', 'Markdown', 'Canva'],
            link: 'https://mp.weixin.qq.com/s/xytgDY1o6FWXBB2BzywBaQ',
            content: `<p>本文整理了800+Nano Banana Pro提示词，涵盖了各种使用场景和应用领域。这些提示词可以帮助用户更好地使用这款AI工具，提高工作效率和创作质量。</p><p>内容包括基础提示词、高级提示词、行业专属提示词等多个部分，适合不同水平的用户参考使用。</p>`
        },
        {
            id: 20,
            title: 'Gemini 3 Pro 登场发布',
            category: '公众号新闻',
            cover: 'images/work11.jpg',
            background: '本文报道了Gemini 3 Pro的发布信息和主要功能特点。',
            tools: ['ChatGPT', 'Google Gemini', 'Markdown', 'Canva'],
            link: 'https://mp.weixin.qq.com/s/s-D-5CTXg7Oi0f41usVwSw',
            content: `<p>本文详细报道了Google发布的Gemini 3 Pro大模型的发布信息、技术特点和应用前景。Gemini 3 Pro是Google最新一代AI大模型，具有强大的多模态处理能力和生成能力。</p><p>内容包括模型架构、性能参数、应用场景和未来发展方向等多个方面，适合对AI技术感兴趣的读者阅读。</p>`
        },
        {
            id: 21,
            title: '马斯克1万亿美金不白拿，深夜更新Grok4',
            category: '公众号新闻',
            cover: 'images/work12.jpg',
            background: '本文报道了马斯克深夜更新Grok4的消息和主要更新内容。',
            tools: ['ChatGPT', 'X', 'Markdown', 'Canva'],
            link: 'https://mp.weixin.qq.com/s/pLeTG9MLhJam_wHB15dGxQ',
            content: `<p>本文报道了马斯克领导的X公司深夜更新Grok4的消息，包括更新内容、技术改进和应用影响等方面。Grok4是X公司最新一代AI大模型，具有更强的实时数据处理能力和生成能力。</p><p>内容分析了Grok4的竞争优势和市场前景，适合对AI行业动态感兴趣的读者阅读。</p>`
        },
        {
            id: 22,
            title: 'AI炒股？还真金白银举办的，豆包还遥遥领先？老外太会玩了！',
            category: '公众号新闻',
            cover: 'images/work13.jpg',
            background: '本文报道了一场AI炒股比赛的结果和相关分析。',
            tools: ['ChatGPT', '数据分析工具', 'Markdown', 'Canva'],
            link: 'https://mp.weixin.qq.com/s/fLJCXdbuFCpKTpoM2HUc0w',
            content: `<p>本文报道了一场国际AI炒股比赛的结果，其中豆包AI表现出色，遥遥领先其他参赛AI。文章分析了AI炒股的技术原理、优势劣势和未来发展趋势。</p><p>内容包括比赛背景、参赛AI介绍、比赛结果分析和专家观点等多个部分，适合对AI金融应用感兴趣的读者阅读。</p>`
        },
        {
            id: 23,
            title: '两分钟生成专属漫画！这个AI神器让不会画画的我也能当漫画家了',
            category: '公众号新闻',
            cover: 'images/work14.jpg',
            background: '本文介绍了一款可以快速生成漫画的AI工具及其使用方法。',
            tools: ['ChatGPT', 'AI漫画工具', 'Markdown', 'Canva'],
            link: 'https://mp.weixin.qq.com/s/D1TNIh2nGtlZw1BrhYM5zw',
            content: `<p>本文介绍了一款可以在两分钟内生成专属漫画的AI工具，详细讲解了工具的使用方法、功能特点和创作技巧。这款工具让不会画画的普通用户也能轻松创作高质量的漫画作品。</p><p>内容包括工具介绍、使用步骤、创作案例和用户评价等多个部分，适合对AI创意工具感兴趣的读者阅读。</p>`
        },
        {
            id: 24,
            title: '重磅！OpenAI发布Sora 2：AI视频生成迎来"ChatGPT时刻"',
            category: '公众号新闻',
            cover: 'images/work15.jpg',
            background: '本文报道了OpenAI发布Sora 2的消息和主要功能特点。',
            tools: ['ChatGPT', 'Sora 2', 'Markdown', 'Canva'],
            link: 'https://mp.weixin.qq.com/s/B-gkWMzCRLSwXKKD-KbJPQ',
            content: `<p>本文详细报道了OpenAI发布的Sora 2视频生成模型的发布信息、技术特点和应用前景。Sora 2是OpenAI最新一代视频生成模型，具有更强的视频生成能力和更长的视频时长支持。</p><p>内容分析了Sora 2对AI视频生成领域的影响和未来发展趋势，适合对AI视频技术感兴趣的读者阅读。</p>`
        }
    ];
    
    viewButtons.forEach((button) => {
        button.addEventListener('click', function() {
            // 找到当前作品项
            const workCard = this.closest('.work-card');
            const workItem = workCard.closest('.work-item');
            
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
    
    // 联系表单提交
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 创建成功提示元素
        let successMessage = document.querySelector('.form-success');
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = '留言发送成功！感谢您的关注。';
            contactForm.appendChild(successMessage);
        }
        
        // 显示成功消息
        successMessage.classList.add('show');
        
        // 重置表单
        contactForm.reset();
        
        // 3秒后隐藏成功消息
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    });
    
    // 打字机效果增强 - 支持多文本切换
    const typingTexts = [
        "海陆空多栖创作者",
        "AI内容创作专家",
        "跨境电商运营者",
        "前端开发工程师",
        "视频制作达人"
    ];
    const typingElement = document.querySelector('.banner-text h3');
    let currentTextIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let charIndex = 0;
    let typingSpeed = 150;
    
    function type() {
        const fullText = typingTexts[currentTextIndex];
        
        if (isDeleting) {
            // 删除字符
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 100;
        } else {
            // 添加字符
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        typingElement.textContent = currentText;
        
        // 如果删除完所有字符，切换到下一个文本
        if (isDeleting && currentText === '') {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            charIndex = 0;
            setTimeout(type, 500);
            return;
        }
        
        // 如果写完所有字符，开始删除
        if (!isDeleting && currentText === fullText) {
            isDeleting = true;
            typingSpeed = 1000;
            setTimeout(type, 1500);
            return;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // 延迟启动打字机效果，让CSS动画先运行
    setTimeout(type, 3000);
    
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