'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================
     VIDEO LIBRARY DATA
     Exact video URLs — do NOT modify
     ========================================================== */

  var videoData = {
    '11': {
      'Maths': {
        'Chapter 1 - Set': [
          { title: 'Video 1 — Sets Introduction', url: 'https://www.youtube.com/embed/ckSvQ-R1XX0' },
          { title: 'Video 2 — Representation of Sets', url: 'https://www.youtube.com/embed/ZsKEx-g3aAA' },
          { title: 'Video 3 — Types of Sets', url: 'https://www.youtube.com/embed/KpKnBq08UZo' },
          { title: 'Video 4 — Subsets', url: 'https://www.youtube.com/embed/dInnWiVDYG4' },
          { title: 'Video 5 — Power Set & Universal Set', url: 'https://www.youtube.com/embed/bbjUzHWITAI' },
          { title: 'Video 6 — Venn Diagrams', url: 'https://www.youtube.com/embed/RacC2kBEqdE' },
          { title: 'Video 7 — Union of Sets', url: 'https://www.youtube.com/embed/uoUvlMhqEuU' },
          { title: 'Video 8 — Intersection of Sets', url: 'https://www.youtube.com/embed/s2hoPd2YKPg' },
          { title: 'Video 9 — Difference of Sets', url: 'https://www.youtube.com/embed/7TdW6pkB46I' },
          { title: 'Video 10 — Complement of a Set', url: 'https://www.youtube.com/embed/y0jJnMq0CRw' },
          { title: 'Video 11 — Properties of Operations', url: 'https://www.youtube.com/embed/5YfshVR9EVI' },
          { title: 'Video 12 — Practical Problems on Union & Intersection', url: 'https://www.youtube.com/embed/dDruYCX0eFI' },
          { title: 'Video 13 — Miscellaneous Examples', url: 'https://www.youtube.com/embed/1LCkOv-FJhE' },
          { title: 'Video 14 — Summary & Exercises', url: 'https://www.youtube.com/embed/YsLHfD92prk' }
        ],
        'Chapter 2 - Relations and Functions': [
          { title: 'Video 1 — Ordered Pairs', url: 'https://www.youtube.com/embed/-vgE-oeS53c' },
          { title: 'Video 2 — Cartesian Product', url: 'https://www.youtube.com/embed/7dYSTTUomf0' },
          { title: 'Video 3 — Relations', url: 'https://www.youtube.com/embed/1nkmlJnvqvI' },
          { title: 'Video 4 — Domain & Range', url: 'https://www.youtube.com/embed/JmU6DQspVB8' },
          { title: 'Video 5 — Functions', url: 'https://www.youtube.com/embed/rAACEo_t4YM' },
          { title: 'Video 6 — Function Notation', url: 'https://www.youtube.com/embed/rjR5TpnmzjQ' },
          { title: 'Video 7 — Types of Functions', url: 'https://www.youtube.com/embed/D62KRPZi124' },
          { title: 'Video 8 — Algebra of Functions', url: 'https://www.youtube.com/embed/nrzFeVNeNQM' },
          { title: 'Video 9 — Real Valued Functions', url: 'https://www.youtube.com/embed/MC9HrbC3zQc' },
          { title: 'Video 10 — Some Standard Functions', url: 'https://www.youtube.com/embed/EpPMDJm-7TE' },
          { title: 'Video 11 — Graphs of Functions', url: 'https://www.youtube.com/embed/BrOQ_Prz5cg' },
          { title: 'Video 12 — Miscellaneous Examples', url: 'https://www.youtube.com/embed/BugzcwtheVs' },
          { title: 'Video 13 — Summary & Exercises', url: 'https://www.youtube.com/embed/fIuKkMx1pP8' }
        ]
      }
    },
    '12': {
      'Maths': {
        'Chapter 1 - Relations and Functions': [
          { title: 'Video 1 — Types of Relations', url: 'https://www.youtube.com/embed/coLzLhW10jI' },
          { title: 'Video 2 — Reflexive Relations', url: 'https://www.youtube.com/embed/J3yU8rjHQ4U' },
          { title: 'Video 3 — Symmetric Relations', url: 'https://www.youtube.com/embed/KrxSbMhEaCs' },
          { title: 'Video 4 — Transitive Relations', url: 'https://www.youtube.com/embed/-mKmWRsGgI0' },
          { title: 'Video 5 — Equivalence Relations', url: 'https://www.youtube.com/embed/idS2f5xknS0' },
          { title: 'Video 6 — Types of Functions', url: 'https://www.youtube.com/embed/oqCmFMBfInQ' },
          { title: 'Video 7 — One-One & Onto Functions', url: 'https://www.youtube.com/embed/RZPZuGjBtaI' },
          { title: 'Video 8 — Composition of Functions', url: 'https://www.youtube.com/embed/F12vn3732S8' },
          { title: 'Video 9 — Invertible Functions', url: 'https://www.youtube.com/embed/bOnSlJZol9Y' },
          { title: 'Video 10 — Binary Operations', url: 'https://www.youtube.com/embed/lLn1-HLpECQ' },
          { title: 'Video 11 — Properties of Binary Operations', url: 'https://www.youtube.com/embed/qKBgxFzFjC4' },
          { title: 'Video 12 — Miscellaneous Examples', url: 'https://www.youtube.com/embed/l1lhyikeVV4' },
          { title: 'Video 13 — Summary & Exercises', url: 'https://www.youtube.com/embed/W41J0T5qquw' }
        ],
        'Chapter 2 - Inverse Trigonometric Function': [
          { title: 'Video 1 — Introduction to Inverse Trig', url: 'https://www.youtube.com/embed/TJPjy8h9Rzc' },
          { title: 'Video 2 — Basic Concepts', url: 'https://www.youtube.com/embed/napTRpvqPrA' },
          { title: 'Video 3 — Principal Value Branch', url: 'https://www.youtube.com/embed/myL3clyl5DI' },
          { title: 'Video 4 — Properties Part 1', url: 'https://www.youtube.com/embed/56gwWbaEkPo' },
          { title: 'Video 5 — Properties Part 2', url: 'https://www.youtube.com/embed/6EkCvgPF4EU' },
          { title: 'Video 6 — Properties Part 3', url: 'https://www.youtube.com/embed/6EkCvgPF4EU' },
          { title: 'Video 7 — Miscellaneous Examples', url: 'https://www.youtube.com/embed/QMHdlRywgfg' },
          { title: 'Video 8 — Summary & Exercises', url: 'https://www.youtube.com/embed/2b-VublRmRQ' }
        ]
      }
    }
  };


  /* ==========================================================
     DOM REFERENCES
     ========================================================== */
  var classSelect = document.getElementById('classSelect');
  var subjectSelect = document.getElementById('subjectSelect');
  var chapterSelect = document.getElementById('chapterSelect');
  var videoContainer = document.getElementById('videoContainer');
  var videoCount = document.getElementById('videoCount');


  /* ==========================================================
     DROPDOWN FUNCTIONS
     ========================================================== */

  /**
   * Populate subject dropdown based on class selection
   */
  function showSubjects() {
    if (!classSelect || !subjectSelect) return;

    var selectedClass = classSelect.value;

    // Reset downstream
    subjectSelect.innerHTML = '<option value="">— Select Subject —</option>';
    if (chapterSelect) chapterSelect.innerHTML = '<option value="">— Select Chapter —</option>';
    if (videoContainer) {
      videoContainer.innerHTML = '';
      videoContainer.style.display = 'none';
    }
    if (videoCount) videoCount.textContent = '';

    // Disable downstream if no class
    subjectSelect.disabled = !selectedClass;
    if (chapterSelect) chapterSelect.disabled = true;

    if (!selectedClass || !videoData[selectedClass]) return;

    var subjects = Object.keys(videoData[selectedClass]);
    subjects.forEach(function (subject) {
      var option = document.createElement('option');
      option.value = subject;
      option.textContent = subject;
      subjectSelect.appendChild(option);
    });

    subjectSelect.disabled = false;

    // Smooth transition
    subjectSelect.style.opacity = '0';
    requestAnimationFrame(function () {
      subjectSelect.style.transition = 'opacity 0.3s ease';
      subjectSelect.style.opacity = '1';
    });
  }

  /**
   * Populate chapter dropdown based on subject selection
   */
  function showChapters() {
    if (!classSelect || !subjectSelect || !chapterSelect) return;

    var selectedClass = classSelect.value;
    var selectedSubject = subjectSelect.value;

    // Reset downstream
    chapterSelect.innerHTML = '<option value="">— Select Chapter —</option>';
    if (videoContainer) {
      videoContainer.innerHTML = '';
      videoContainer.style.display = 'none';
    }
    if (videoCount) videoCount.textContent = '';

    chapterSelect.disabled = !selectedSubject;

    if (!selectedClass || !selectedSubject || !videoData[selectedClass] || !videoData[selectedClass][selectedSubject]) return;

    var chapters = Object.keys(videoData[selectedClass][selectedSubject]);
    chapters.forEach(function (chapter) {
      var option = document.createElement('option');
      option.value = chapter;
      option.textContent = chapter;
      chapterSelect.appendChild(option);
    });

    chapterSelect.disabled = false;

    // Smooth transition
    chapterSelect.style.opacity = '0';
    requestAnimationFrame(function () {
      chapterSelect.style.transition = 'opacity 0.3s ease';
      chapterSelect.style.opacity = '1';
    });
  }

  /**
   * Render video grid based on chapter selection
   */
  function showVideos() {
    if (!classSelect || !subjectSelect || !chapterSelect || !videoContainer) return;

    var selectedClass = classSelect.value;
    var selectedSubject = subjectSelect.value;
    var selectedChapter = chapterSelect.value;

    videoContainer.innerHTML = '';
    videoContainer.style.display = 'none';
    if (videoCount) videoCount.textContent = '';

    if (!selectedClass || !selectedSubject || !selectedChapter) return;

    var videos = videoData[selectedClass] &&
                 videoData[selectedClass][selectedSubject] &&
                 videoData[selectedClass][selectedSubject][selectedChapter];

    if (!videos || videos.length === 0) {
      videoContainer.innerHTML = '<div class="text-center py-12"><p class="text-gray-400 text-lg">No videos available for this selection.</p></div>';
      videoContainer.style.display = 'block';
      return;
    }

    // Update video count
    if (videoCount) {
      videoCount.textContent = videos.length + ' video' + (videos.length !== 1 ? 's' : '') + ' available';
    }

    // Build video grid
    var gridHTML = '<div class="video-grid">';

    videos.forEach(function (video, index) {
      gridHTML += '' +
        '<div class="video-card reveal" style="transition-delay: ' + (index * 0.05) + 's;">' +
          '<iframe ' +
            'src="' + video.url + '" ' +
            'title="' + video.title + '" ' +
            'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
            'allowfullscreen ' +
            'loading="lazy">' +
          '</iframe>' +
          '<div class="video-card-title">' +
            '<span class="text-primary font-bold mr-2">' + (index + 1) + '.</span>' +
            video.title +
          '</div>' +
        '</div>';
    });

    gridHTML += '</div>';
    videoContainer.innerHTML = gridHTML;
    videoContainer.style.display = 'block';

    // Trigger reveal animations for newly added cards
    requestAnimationFrame(function () {
      var newRevealEls = videoContainer.querySelectorAll('.reveal');
      newRevealEls.forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('active');
        }, i * 80);
      });
    });

    // Smooth scroll to video container
    videoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  /* ==========================================================
     RESOURCE MODAL
     ========================================================== */

  var modalOverlay = null;

  /**
   * Open resource popup with "coming soon" message
   */
  function openResourceModal(type) {
    // Remove existing modal if any
    closeResourceModal();

    var typeName = type || 'Resource';
    var typeCapitalized = typeName.charAt(0).toUpperCase() + typeName.slice(1);

    modalOverlay = document.createElement('div');
    modalOverlay.className = 'resource-modal-overlay';
    modalOverlay.innerHTML = '' +
      '<div class="resource-modal">' +
        '<div style="font-size: 3rem; margin-bottom: 1rem;">🚧</div>' +
        '<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">' +
          typeCapitalized + ' Coming Soon!' +
        '</h3>' +
        '<p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">' +
          'We\'re working hard to bring you amazing ' + typeName.toLowerCase() + ' resources. ' +
          'Stay tuned for updates!' +
        '</p>' +
        '<button class="btn-primary" onclick="closeResourceModal()" style="margin: 0 auto;">' +
          'Got it! 👍' +
        '</button>' +
      '</div>';

    document.body.appendChild(modalOverlay);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Animate in
    requestAnimationFrame(function () {
      modalOverlay.classList.add('open');
    });

    // Close on overlay click
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        closeResourceModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', handleModalEscape);
  }

  function handleModalEscape(e) {
    if (e.key === 'Escape') {
      closeResourceModal();
    }
  }

  /**
   * Close resource modal
   */
  function closeResourceModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      setTimeout(function () {
        if (modalOverlay && modalOverlay.parentNode) {
          modalOverlay.parentNode.removeChild(modalOverlay);
        }
        modalOverlay = null;
        document.body.style.overflow = '';
      }, 300);
    }
    document.removeEventListener('keydown', handleModalEscape);
  }


  /* ==========================================================
     EVENT LISTENERS FOR DROPDOWNS
     ========================================================== */

  if (classSelect) {
    classSelect.addEventListener('change', showSubjects);
  }

  if (subjectSelect) {
    subjectSelect.addEventListener('change', showChapters);
  }

  if (chapterSelect) {
    chapterSelect.addEventListener('change', showVideos);
  }

  // Initialize: disable downstream selects on load
  if (subjectSelect) subjectSelect.disabled = true;
  if (chapterSelect) chapterSelect.disabled = true;


  /* ==========================================================
     EXPOSE FUNCTIONS GLOBALLY (for inline onclick if needed)
     ========================================================== */
  window.showSubjects = showSubjects;
  window.showChapters = showChapters;
  window.showVideos = showVideos;
  window.openResourceModal = openResourceModal;
  window.closeResourceModal = closeResourceModal;

});
