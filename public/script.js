document.addEventListener('DOMContentLoaded', () => {
    const distanceEl = document.getElementById('distance');
    const journeyBg = document.querySelector('.journey .parallax-bg');
    const homecomingBg = document.querySelector('.parallax-bg-color');
    
    // Ticker Logic: 17,000 -> 0 based on scroll
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // Parallax for backgrounds
        if (journeyBg) {
            journeyBg.style.transform = `translateY(${window.scrollY * 0.1}px)`;
        }
        
        // Reveal Homecoming Section
        const homecomingOffset = document.querySelector('.homecoming').offsetTop;
        const scrollPos = window.scrollY + window.innerHeight;
        
        if (scrollPos > homecomingOffset) {
            homecomingBg.style.opacity = '0.6';
            homecomingBg.style.transform = `translateY(${(window.scrollY - homecomingOffset) * 0.1}px)`;
        }

        // Ticker math
        // Map 0 -> 1 scroll to 17000 -> 0 meters, but only within the journey area
        const journeySection = document.querySelector('.journey');
        const journalTop = journeySection.offsetTop;
        const journalHeight = journeySection.offsetHeight;
        
        if (window.scrollY > journalTop - window.innerHeight && window.scrollY < journalTop + journalHeight) {
            const range = 17000;
            const progress = (window.scrollY - (journalTop - window.innerHeight)) / (journalHeight + window.innerHeight);
            const currentDistance = Math.max(0, Math.min(range, Math.floor(range * (1 - progress))));
            
            // Format with commas
            distanceEl.innerText = currentDistance.toLocaleString();
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.2
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-box, .home-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 1s cubic-bezier(0.2, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Custom helper for observer
    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.content-box, .home-content').forEach(el => activeObserver.observe(el));
});

function copyCA() {
    const ca = "0x98b7B21087C583890DBD0cC6903d9fdf634FEB4A";
    navigator.clipboard.writeText(ca).then(() => {
        const caVal = document.getElementById('ca-value');
        const originalText = caVal.innerText;
        caVal.innerText = "COPIED TO CLIPBOARD!";
        caVal.style.color = "#FFD700";
        
        setTimeout(() => {
            caVal.innerText = originalText;
            caVal.style.color = "";
        }, 2000);
    });
}
