document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) {
        console.error('Canvas element with ID "starfield-Canvas" not found.');
        return;
    }
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    // Ensure the canvas is resized correctly after all content is loaded
    window.addEventListener('load', resizeCanvas);
    
    resizeCanvas(); // Initial size

    const stars = [];
    const numStars = 250;

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            deltaAlpha: Math.random() * 0.02 - 0.01
        });
    }

    function drawStars() {
        if (canvas.width !== window.innerWidth || canvas.height !== Math.max(window.innerHeight, document.body.scrollHeight)) {
            resizeCanvas();
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(224, 224, 224, 0.7)";
        stars.forEach(star => {
            ctx.save();
            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    function updateStars() {
        stars.forEach(star => {
            star.alpha += star.deltaAlpha;
            if (star.alpha <= 0 || star.alpha >= 1) {
                star.deltaAlpha *= -1;
            }
        });
    }

    function animate() {
        drawStars();
        updateStars();
        requestAnimationFrame(animate);
    }

    animate();
});