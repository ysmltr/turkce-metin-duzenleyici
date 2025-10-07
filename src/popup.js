// ===== TÜRKÇE KARAKTER PALETİ =====
document.querySelectorAll('.char-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const char = this.getAttribute('data-char');
        const textarea = document.getElementById('inputText');
        
        // İmlecin olduğu pozisyonu bul
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const textBefore = textarea.value.substring(0, startPos);
        const textAfter = textarea.value.substring(endPos);
        
        // Karakteri ekle
        textarea.value = textBefore + char + textAfter;
        
        // İmleci karakterden sonraya taşı
        textarea.selectionStart = textarea.selectionEnd = startPos + 1;
        textarea.focus();
        
        // Görsel feedback
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 400);
    });
});

// ===== AKILLI DÖNÜŞTÜRME FONKSİYONLARI =====
const commonWords = {
    'sistem': 'sistem',
    'sistemden': 'sistemden',
    'sistemi': 'sistemi',
    'sistemde': 'sistemde',
    'eris': 'eriş',
    'erismek': 'erişmek',
    'erisim': 'erişim',
    'erisebilir': 'erişebilir',
    'erisebilirsiniz': 'erişebilirsiniz',
    'haber': 'haber',
    'haberin': 'haberin',
    'tamamina': 'tamamına',
    'tamami': 'tamamı',
    // ... (önceki tüm kelimeler)
    'ben': 'ben',
    'bir': 'bir',
    'cok': 'çok',
    'gel': 'gel',
    'git': 'git',
    'gun': 'gün',
    'gunaydin': 'günaydın',
    'bugun':'bugün',
    'guzel': 'güzel',
    'iyi': 'iyi',
    'nasil': 'nasıl',
    'nasilsin': 'nasılsın',
    'nasilsiniz': 'nasılsınız',
    'simdi': 'şimdi',
    'tesekkur': 'teşekkür',
    'tesekkurler': 'teşekkürler',
    'degil': 'değil',
    'dogru': 'doğru',
    'yanlis': 'yanlış',
    'olmak': 'olmak',
    'oldu': 'oldu',
    'oluyor': 'oluyor',
    // Daha fazla kelime ekleyin...
};

// Kural bazlı dönüştürme
function smartCharConvert(word) {
    let result = '';
    
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const lowerChar = char.toLowerCase();
        const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
        
        const prev = i > 0 ? word[i-1].toLowerCase() : '';
        const next = i < word.length - 1 ? word[i+1].toLowerCase() : '';
        
        // S karakteri
        if (lowerChar === 's') {
            if (i === 0 && 'aeiu'.includes(next)) {
                result += char;
            } else if ((lowerChar + next).startsWith('st') || 
                       (lowerChar + next).startsWith('sp') ||
                       (lowerChar + next).startsWith('sk')) {
                result += char;
            } else {
                result += isUpper ? 'Ş' : 'ş';
            }
        }
        // G karakteri
        else if (lowerChar === 'g') {
            if (i === 0 || prev === 'n') {
                result += char;
            } else {
                result += isUpper ? 'Ğ' : 'ğ';
            }
        }
        // C karakteri
        else if (lowerChar === 'c') {
            if ('aou'.includes(next)) {
                result += char;
            } else {
                result += isUpper ? 'Ç' : 'ç';
            }
        }
        // I karakteri
        else if (lowerChar === 'i') {
            if (i === 0 || 'aeıioöuü'.includes(prev)) {
                result += char;
            } else {
                result += isUpper ? 'İ' : 'ı';
            }
        }
        // O karakteri
        else if (lowerChar === 'o') {
            if ('eöiü'.includes(prev)) {
                result += isUpper ? 'Ö' : 'ö';
            } else {
                result += char;
            }
        }
        // U karakteri
        else if (lowerChar === 'u') {
            if ('eöiü'.includes(prev)) {
                result += isUpper ? 'Ü' : 'ü';
            } else {
                result += char;
            }
        }
        else {
            result += char;
        }
    }
    
    return result;
}

// Ana dönüştürme fonksiyonu
function smartConvert(text) {
    const words = text.split(/(\s+|[.,!?;:()"])/);
    
    return words.map(word => {
        if (word.trim() === '' || /^[.,!?;:()"']$/.test(word)) {
            return word;
        }
        
        const lowerWord = word.toLowerCase();
        const isCapitalized = word[0] === word[0].toUpperCase();
        
        if (commonWords[lowerWord]) {
            const corrected = commonWords[lowerWord];
            return isCapitalized 
                ? corrected.charAt(0).toUpperCase() + corrected.slice(1)
                : corrected;
        }
        
        return smartCharConvert(word);
    }).join('');
}

// Dönüştür butonu
document.getElementById('convertBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText');
    const text = inputText.value;
    
    if (text.trim() === '') {
        alert('⚠️ Lütfen bir metin girin!');
        return;
    }
    
    const converted = smartConvert(text);
    inputText.value = converted;
    
    this.innerHTML = '<i class="fas fa-check-circle"></i> TAMAMLANDI!';
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> DÖNÜŞTÜR';
    }, 1500);
});

// Kopyala butonu
document.getElementById('copyBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText');
    
    if (inputText.value.trim() === '') {
        alert('⚠️ Kopyalanacak metin yok!');
        return;
    }
    
    inputText.select();
    document.execCommand('copy');
    
    const icon = this.querySelector('i');
    const span = this.querySelector('span');
    
    icon.className = 'fas fa-check';
    span.textContent = 'Kopyalandı!';
    this.classList.add('copied');
    
    setTimeout(() => {
        icon.className = 'fas fa-copy';
        span.textContent = 'Kopyala';
        this.classList.remove('copied');
    }, 2000);
});