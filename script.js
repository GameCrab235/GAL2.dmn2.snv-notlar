document.addEventListener('DOMContentLoaded', () => {
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');

    const lessonList = document.getElementById('lessonList');
    const subjectList = document.getElementById('subjectList');
    const lessonNotesContent = document.getElementById('lessonNotesContent');

    const subjectLessonTitle = document.getElementById('subjectLessonTitle');
    const notesSubjectTitle = document.getElementById('notesSubjectTitle');

    const backToLessonsBtn = document.getElementById('backToLessons');
    const backToSubjectsBtn = document.getElementById('backToSubjects');

    let currentLesson = '';
    let currentSubject = '';

    // Tüm derslerin ve konuların verisi (Gerçek bir uygulamada bu veriler bir API'den veya JSON dosyasından gelebilir)
    const lessonsData = {
        matematik: {
            konular: {
                "Cebir": "Matematik Cebir notları...",
                "Geometri": "Matematik Geometri notları...",
                "Limit ve Türev": "Matematik Limit ve Türev notları..."
            }
        },
        edebiyat: {
            konular: {
                "Divan Edebiyatı": "Edebiyat Divan Edebiyatı notları...",
                "Tanzimat Dönemi": "Edebiyat Tanzimat Dönemi notları...",
                "Servet-i Fünun": "Edebiyat Servet-i Fünun notları..."
            }
        },
        ingilizce: {
            konular: {
                "Grammar": "İngilizce Grammar notları...",
                "Vocabulary": "İngilizce Vocabulary notları...",
                "Reading Comprehension": "İngilizce Reading Comprehension notları..."
            }
        },
        almanca: {
            konular: {
                "Grammatik": "Almanca Grammatik notları...",
                "Vokabeln": "Almanca Vokabeln notları...",
                "Konversation": "Almanca Konversation notları..."
            }
        },
        felsefe: {
            konular: {
                "Antik Felsefe": "Felsefe Antik Felsefe notları...",
                "Çağdaş Felsefe": "Felsefe Çağdaş Felsefe notları...",
                "Etik": "Felsefe Etik notları..."
            }
        },
        fizik: {
            konular: {
                "Mekanik": "Fizik Mekanik notları...",
                "Termodinamik": "Fizik Termodinamik notları...",
                "Elektromanyetizma": "Fizik Elektromanyetizma notları..."
            }
        },
        kimya: {
            konular: {
                "Organik Kimya": "Kimya Organik Kimya notları...",
                "Anorganik Kimya": "Kimya Anorganik Kimya notları...",
                "Fiziksel Kimya": "Kimya Fiziksel Kimya notları..."
            }
        },
        biyoloji: {
            konular: {
                "Hücre Biyolojisi": "Biyoloji Hücre Biyolojisi notları...",
                "Genetik": "Biyoloji Genetik notları...",
                "Ekoloji": "Biyoloji Ekoloji notları..."
            }
        },
        cografya: {
            konular: {
                "Fiziki Coğrafya": "Coğrafya Fiziki Coğrafya notları...",
                "Beşeri Coğrafya": "Coğrafya Beşeri Coğrafya notları...",
                "Ekonomik Coğrafya": "Coğrafya Ekonomik Coğrafya notları..."
            }
        },
        tarih: {
            konular: {
                "İlk Çağ Tarihi": "Tarih İlk Çağ Tarihi notları...",
                "Orta Çağ Tarihi": "Tarih Orta Çağ Tarihi notları...",
                "Cumhuriyet Tarihi": "Tarih Cumhuriyet Tarihi notları..."
            }
        },
        bilisim: {
            konular: {
                "Programlamaya Giriş": "Bilişim Programlamaya Giriş notları...",
                "Web Geliştirme": "Bilişim Web Geliştirme notları...",
                "Veritabanları": "Bilişim Veritabanları notları..."
            }
        }
    };

    // Bölümleri gizleyen ve gösteren fonksiyon
    function showSection(sectionToShow) {
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });
        sectionToShow.classList.add('active');
    }

    // Kısım 1'deki ders butonlarına tıklama olayı
    lessonList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            currentLesson = event.target.dataset.lesson;
            const lessonName = event.target.textContent; // Butonun görünen metnini al
            subjectLessonTitle.textContent = `${lessonName} Konu Başlıkları`; // Kısım 2 başlığını ayarla

            // Konu başlıklarını yükle
            loadSubjects(currentLesson);
            showSection(section2); // Kısım 2'yi göster
        }
    });

    // Konuları Kısım 2'ye yükleyen fonksiyon
    function loadSubjects(lessonKey) {
        subjectList.innerHTML = ''; // Önceki konuları temizle
        const subjects = lessonsData[lessonKey].konular;
        for (const subject in subjects) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = subject;
            button.dataset.subject = subject;
            li.appendChild(button);
            subjectList.appendChild(li);
        }
    }

    // Kısım 2'deki konu butonlarına tıklama olayı
    subjectList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            currentSubject = event.target.dataset.subject;
            const subjectName = event.target.textContent; // Butonun görünen metnini al
            notesSubjectTitle.textContent = `${currentLesson.charAt(0).toUpperCase() + currentLesson.slice(1)} - ${subjectName} Notları`; // Kısım 3 başlığını ayarla

            // Ders notlarını yükle
            loadLessonNotes(currentLesson, currentSubject);
            showSection(section3); // Kısım 3'ü göster
        }
    });

    // Ders notlarını Kısım 3'e yükleyen fonksiyon
    function loadLessonNotes(lessonKey, subjectKey) {
        lessonNotesContent.innerHTML = `<p>${lessonsData[lessonKey].konular[subjectKey]}</p>`;
        // Gerçek bir senaryoda burada daha uzun ve düzenli notlar olabilir (HTML içeriği).
        // Örneğin: `lessonNotesContent.innerHTML = lessonsData[lessonKey].konular[subjectKey];`
    }

    // Geri dön butonları
    backToLessonsBtn.addEventListener('click', () => {
        showSection(section1); // Kısım 1'e geri dön
    });

    backToSubjectsBtn.addEventListener('click', () => {
        showSection(section2); // Kısım 2'ye geri dön
    });
});