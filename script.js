let cardPool = [];
let isFlipped = false;

// 加载 CSV 数据
async function loadCSV() {
    try {
        const r = await fetch('cards.csv?v=' + Date.now());
        const t = await r.text();
        const rows = t.trim().split('\n').filter(line => line.includes(','));
        cardPool = rows.slice(1).map(row => {
            const c = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            return { id: c[0], name: c[1], rarity: c[2], desc: c[3], img: c[4].trim() };
        });
        document.getElementById('drawBtn').innerText = "抽一张卡";
    } catch(e) { 
        document.getElementById('drawBtn').innerText = "载入失败"; 
    }
}

// 准备卡片（显示背面）
function prepareCard() {
    isFlipped = false;
    document.getElementById('drawBtn').style.display = 'none';
    const container = document.getElementById('cardContainer');
    container.classList.remove('is-flipped');
    
    const res = cardPool[Math.floor(Math.random() * cardPool.length)];
    document.getElementById('cardImage').src = res.img;
    document.getElementById('cardName').innerText = res.name;
    document.getElementById('cardDesc').innerText = res.desc;
    const b = document.getElementById('cardBadge');
    b.innerText = res.rarity;
    b.style.color = `var(--${res.rarity.toLowerCase()})`;

    // 清除之前可能存在的稀有度类名
    const cardFront = document.querySelector('.card-front');
    cardFront.className = 'card-face card-front'; // 重置类名

    // 根据稀有度添加对应的背景颜色类名 (转为小写以匹配 CSS)
    cardFront.classList.add(res.rarity.toLowerCase());
    
    container.classList.add('show');
    setTimeout(() => { 
        document.getElementById('hint').style.opacity = '1'; 
    }, 600);
}

// 翻转逻辑
let startX = 0;
const container = document.getElementById('cardContainer');

const onStart = (x) => startX = x;
const onEnd = (x) => {
    if (isFlipped) return;
    if (x - startX > 50) {
        isFlipped = true;
        container.classList.add('is-flipped');
        document.getElementById('hint').style.opacity = '0';
        
        const rarity = document.getElementById('cardBadge').innerText;
        if(['UR','HR','SSR'].includes(rarity)) {
            setTimeout(() => {
                confetti({ 
                    particleCount: 150, 
                    spread: 70, 
                    origin: { y: 0.6 },
                    colors: ['#ff4500', '#ffd700', '#bae6fd'] 
                });
            }, 400);
        }
        
        setTimeout(() => {
            const btn = document.getElementById('drawBtn');
            btn.innerText = "继续抽卡";
            btn.style.display = 'block';
        }, 1200);
    }
};

// 绑定事件监听
container.addEventListener('touchstart', e => onStart(e.touches[0].clientX));
container.addEventListener('touchend', e => onEnd(e.changedTouches[0].clientX));
container.addEventListener('mousedown', e => onStart(e.clientX));
container.addEventListener('mouseup', e => onEnd(e.clientX));

// 初始化加载
loadCSV();
