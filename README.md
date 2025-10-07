

## ✨ Özellikler

### 🎯 Akıllı Otomatik Dönüştürme
- **2000+ kelime veritabanı** ile doğru tanıma
- **Kural bazlı algoritma**: Kelime yapısını analiz eder
- **Akıllı kontrol**: Kelime başında yanlış karakter kullanmaz
  - ✅ `"gel"` → `"gel"` (doğru kalır)
  - ✅ `"degil"` → `"değil"` (düzeltir)
  - ✅ `"sistem"` → `"sistem"` (st kombinasyonu korunur)

### ⌨️ Türkçe Karakter Paleti
- 12 Türkçe karaktere **tek tıkla** erişim (ç, ğ, ı, ö, ş, ü + büyük harfler)
- İmlecin olduğu yere direkt ekleme
- Görsel animasyon geri bildirimi

### 🚀 Hızlı ve Pratik
- Tek tuşla tüm metni dönüştürme
- Otomatik kopyalama özelliği
- Offline çalışır (internet bağlantısı gerektirmez)
- Hafif ve hızlı (< 100KB)


## 🛠️ Teknoloji
- Vanilla JavaScript (framework gerektirmez)
- Modern CSS3 (gradient, animations)
- Font Awesome Icons
- Responsive Design

---

## 📂 Proje Yapısı

```
turkce-karakter-donusturucu/
├── manifest.json          # Extension yapılandırması
├── src/
│   ├── popup.html        # Ana popup arayüzü
│   ├── popup.js          # Dönüştürme algoritması
│   └── style.css         # (Opsiyonel - inline CSS)
├── icons/
│   ├── icon16.png        # Toolbar ikonu
│   ├── icon48.png        # Extension sayfası ikonu
│   └── icon128.png       # Web Store ikonu
├── screenshots/          # Promo görselleri
├── README.md             # Bu dosya
└── LICENSE              # MIT Lisansı
```

---

## 🧠 Algoritma Nasıl Çalışır?

### 1. Kelime Sözlüğü Kontrolü
Extension, 2000+ yaygın Türkçe kelimeyi tanır:
```javascript
'gunaydin' → 'günaydın'
'sistem' → 'sistem' (doğru olduğu için değişmez)
```

### 2. Kök + Ek Ayrımı
Ekleri ayırarak kökü tanır:
```javascript
'sistemden' → 'sistem' (kök) + 'den' (ek) → 'sistemden'
```

### 3. Kural Bazlı Dönüştürme
Türkçe dil kurallarını uygular:
- **G harfi**: Kelime başında genelde korunur (`gel` → `gel`)
- **S harfi**: `st`, `sp`, `sk` kombinasyonlarında korunur (`sistem`)
- **C harfi**: `ca`, `co`, `cu` varsa korunur (`can`)
- **Sesli uyum**: Ön/arka ünlü kurallarına dikkat eder


MIT License

Copyright (c) 2025 [Adınız]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...

