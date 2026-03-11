/**
 * HR 级别专属动画：星光漂浮
 */
function triggerHRAnimation() {
    const stage = document.querySelector('.stage');
    
    // 产生 15 颗随机漂浮的金色星星
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        
        // 随机位置
        star.style.left = (Math.random() * 80 + 10) + '%';
        star.style.top = (Math.random() * 50 + 20) + '%';
        
        // 随机延迟，让星星错开出现
        star.style.animationDelay = (Math.random() * 0.5) + 's';
        
        stage.appendChild(star);
        
        // 动画结束后移除
        setTimeout(() => star.remove(), 2000);
    }
    
    console.log("🌟 已触发 HR 级别星光特效！");
}
