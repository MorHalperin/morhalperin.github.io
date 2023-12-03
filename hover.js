function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function checkVisibility() {
    document.querySelectorAll('.button.visit').forEach((element) => {
        if (isInViewport(element)) {
            setTimeout(() => element.classList.add('active'), 100);
        } else {
            element.classList.remove('active');
        }
    })
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

var throttledCheckVisibility = throttle(checkVisibility, 100);

window.addEventListener('scroll', throttledCheckVisibility);

// Just for init
setTimeout(checkVisibility, 0)
