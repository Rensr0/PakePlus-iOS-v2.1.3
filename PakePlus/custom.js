window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug

// ==================== 新增：Cloudflare DNS 预解析 ====================
// 通过 <link rel="dns-prefetch"> 标签，告诉浏览器提前解析 Cloudflare 的 DNS 服务器域名。
// 这可以加速后续所有依赖 DNS 解析的网络请求。
(function addCloudflareDnsPrefetch() {
    const cloudflareDnsDomain = '1.1.1.1'; // Cloudflare DNS 服务器的 IP 地址或域名
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `https://${cloudflareDnsDomain}`; // 使用 https 协议来触发 DNS 解析

    // 检查页面中是否已经存在相同的 dns-prefetch 标签，避免重复添加
    const existingLink = document.querySelector(`link[rel="dns-prefetch"][href="https://${cloudflareDnsDomain}"]`);
    if (!existingLink) {
        document.head.appendChild(link);
        console.log(`[DNS Prefetch] Added for Cloudflare DNS: ${cloudflareDnsDomain}`);
    } else {
        console.log(`[DNS Prefetch] Already exists for Cloudflare DNS: ${cloudflareDnsDomain}`);
    }
})();

// ==================== 原有逻辑 (保持不变) ====================

const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })