/**
 * UR 级别专属动画：全屏闪光冲击
 */
function triggerURAnimation() {
    // 1. 创建全屏闪光层
    const flash = document.createElement('div');
    flash.className = 'ur-flash';
    document.body.appendChild(flash);
    
    // 2. 这里的 flash-out 动画已经在 style.css 中定义好了
    setTimeout(() => {
        flash.remove();
    }, 1000);

    console.log("✨ 已触发 UR 级别神话级特效！");
}
