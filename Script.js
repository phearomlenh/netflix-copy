// Render Lucide icons (chevrons, etc.)
lucide.createIcons();

// ============ Trending row horizontal scroll buttons ============
const trendingRow = document.getElementById('trendingRow');
const scrollLeftBtn = document.querySelector('.scroll-btn--left');
const scrollRightBtn = document.querySelector('.scroll-btn--right');

const SCROLL_AMOUNT = 600;

scrollLeftBtn.addEventListener('click', () => {
    trendingRow.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
    trendingRow.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
});

function updateScrollButtons() {
    const maxScrollLeft = trendingRow.scrollWidth - trendingRow.clientWidth;

    if (trendingRow.scrollLeft <= 0) {
        scrollLeftBtn.style.visibility = 'hidden';
        scrollLeftBtn.style.opacity = '0';
    } else {
        scrollLeftBtn.style.visibility = 'visible';
        scrollLeftBtn.style.opacity = '1';
    }

    if (trendingRow.scrollLeft >= maxScrollLeft - 1) {
        scrollRightBtn.style.visibility = 'hidden';
        scrollRightBtn.style.opacity = '0';
    } else {
        scrollRightBtn.style.visibility = 'visible';
        scrollRightBtn.style.opacity = '1';
    }
}

trendingRow.addEventListener('scroll', updateScrollButtons);
window.addEventListener('load', updateScrollButtons);
updateScrollButtons(); // run once immediately too, in case load already fired


// ============ Language selector dropdown ============
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langLabel = document.getElementById('langLabel');
const langItems = langDropdown.querySelectorAll('li');

// Toggle dropdown open/close
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langDropdown.classList.contains('show');

    if (isOpen) {
        closeDropdown();
    } else {
        openDropdown();
    }
});

function openDropdown() {
    langDropdown.classList.add('show');
    langBtn.classList.add('open');
}

function closeDropdown() {
    langDropdown.classList.remove('show');
    langBtn.classList.remove('open');
}

// Select a language
langItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedLang = item.getAttribute('data-lang');
        langLabel.textContent = selectedLang;

        langItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        closeDropdown();
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        closeDropdown();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDropdown();
    }
});