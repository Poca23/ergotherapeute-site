const config = {
  emailService: "mailto:edwinadecherf@gmail.com",
  emailjs: {
    publicKey: "atEnZgePdH88zB9jU",
    serviceId: "service_do1z2ic",
    templateId: "template_sjc6l0i",
  },
  lang: "fr",
};

const state = { currentSection: "accueil", isMenuOpen: false, isLoading: true };
const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);

class Navigation {
  constructor() {
    this.sections = $$(".section");
    this.navLinks = $$(".nav-link");
    this.init();
  }
  init() {
    this.navLinks.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.navigateTo(link.dataset.section);
      })
    );
    $$("[data-section]").forEach((btn) => {
      if (!btn.classList.contains("nav-link"))
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.navigateTo(btn.dataset.section);
        });
    });
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      if (hash) this.navigateTo(hash);
    });
    const initialHash = window.location.hash.slice(1);
    if (initialHash) this.navigateTo(initialHash);
  }
  navigateTo(section) {
    if (state.currentSection === section) return;
    $(`#${state.currentSection}`)?.classList.remove("active");
    setTimeout(() => {
      const newSection = $(`#${section}`);
      if (newSection) {
        newSection.classList.add("active");
        state.currentSection = section;
        this.updateActiveNav(section);
        history.replaceState(null, null, `#${section}`);
      }
    }, 150);
    this.closeMobileMenu();
  }
  updateActiveNav(section) {
    this.navLinks.forEach((link) =>
      link.classList.toggle("active", link.dataset.section === section)
    );
  }
  closeMobileMenu() {
    $(".nav-menu")?.classList.remove("active");
    state.isMenuOpen = false;
  }
}

class MobileMenu {
  constructor() {
    this.toggle = $(".nav-toggle");
    this.menu = $(".nav-menu");
    this.init();
  }
  init() {
    this.toggle?.addEventListener("click", () => {
      state.isMenuOpen = !state.isMenuOpen;
      this.menu?.classList.toggle("active", state.isMenuOpen);
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav") && state.isMenuOpen) {
        this.menu?.classList.remove("active");
        state.isMenuOpen = false;
      }
    });
  }
}

class ContactForm {
  constructor(formId) {
    this.form = document.getElementById(formId);

    if (!this.form) return;

    this.fields = {
      parentNom: this.form.querySelector("#parent-nom"),
      parentPrenom: this.form.querySelector("#parent-prenom"),
      email: this.form.querySelector("#email"),
      telephone: this.form.querySelector("#telephone"),
      personneNom: this.form.querySelector("#personne-nom"),
      personnePrenom: this.form.querySelector("#personne-prenom"),
      dateNaissance: this.form.querySelector("#date-naissance"),
      classe: this.form.querySelector("#classe"),
      ecole: this.form.querySelector("#ecole"),
      message: this.form.querySelector("#message"),
      rgpd: this.form.querySelector("#rgpd"),
    };

    this.init();
  }

  init() {
    // Définir date max (aujourd'hui) pour date de naissance
    const today = new Date().toISOString().split("T")[0];
    if (this.fields.dateNaissance) {
      this.fields.dateNaissance.setAttribute("max", today);
    }

    // Validation en temps réel
    Object.values(this.fields).forEach((field) => {
      if (!field) return;

      field.addEventListener("blur", () => this.validateField(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") {
          this.validateField(field);
        }
      });
    });

    // Soumission formulaire
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = "";

    // Validation champs requis
    if (field.required && !value) {
      isValid = false;
      errorMessage = "Ce champ est obligatoire";
    }

    // Validations spécifiques
    else if (fieldName === "email" && value) {
      if (!this.isValidEmail(value)) {
        isValid = false;
        errorMessage = "Email invalide (ex: nom@exemple.fr)";
      }
    } else if (fieldName === "telephone" && value) {
      if (!this.isValidPhone(value)) {
        isValid = false;
        errorMessage = "Téléphone invalide (10 chiffres requis)";
      }
    } else if (fieldName === "date_naissance" && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (birthDate > today) {
        isValid = false;
        errorMessage = "La date ne peut pas être dans le futur";
      } else if (age > 18) {
        isValid = false;
        errorMessage = "Pour les adultes, contactez-moi directement";
      }
    } else if (field.type === "checkbox" && field.required && !field.checked) {
      isValid = false;
      errorMessage = "Vous devez accepter pour continuer";
    }

    // Mise à jour UI
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
    field.setAttribute("aria-invalid", !isValid);

    return isValid;
  }

  validateForm() {
    let isValid = true;

    Object.values(this.fields).forEach((field) => {
      if (field && field.required) {
        if (!this.validateField(field)) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validation complète
    if (!this.validateForm()) {
      this.showError("Veuillez corriger les erreurs dans le formulaire");
      // Focus sur premier champ invalide
      const firstInvalid = this.form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    this.showLoader();

    // Préparation données
    const formData = {
      parent_nom: this.fields.parentNom.value.trim(),
      parent_prenom: this.fields.parentPrenom.value.trim(),
      email: this.fields.email.value.trim(),
      telephone: this.fields.telephone.value.trim(),
      personne_nom: this.fields.personneNom.value.trim(),
      personne_prenom: this.fields.personnePrenom.value.trim(),
      date_naissance: this.fields.dateNaissance.value,
      classe: this.fields.classe.value.trim() || "Non renseignée",
      ecole: this.fields.ecole.value.trim() || "Non renseignée",
      message: this.fields.message.value.trim(),
      date_demande: new Date().toLocaleDateString("fr-FR"),
    };

    try {
      // Envoi EmailJS
      const response = await emailjs.send(
        config.emailjs.serviceId,
        config.emailjs.templateId,
        formData
      );

      if (response.status === 200) {
        this.showSuccess();
        this.form.reset();
        // Reset aria-invalid
        Object.values(this.fields).forEach((field) => {
          if (field) field.setAttribute("aria-invalid", "false");
        });
      }
    } catch (error) {
      console.error("Erreur EmailJS:", error);
      this.showError(
        "Impossible d'envoyer votre message. Veuillez réessayer ou me contacter par téléphone."
      );
    } finally {
      this.hideLoader();
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone) {
    const cleaned = phone.replace(/[\s\.\-\(\)]/g, "");
    return /^0[1-9]\d{8}$/.test(cleaned);
  }

  showLoader() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>⏳</span> Envoi en cours...";
    }
  }

  hideLoader() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "<span>📧</span> Envoyer ma demande";
    }
  }

  showSuccess() {
    this.showMessage(
      "Votre demande a été transmise avec succès ! Je vous recontacterai prochainement pour convenir d'un rendez-vous.",
      "success"
    );

    // Scroll vers message
    setTimeout(() => {
      const message = this.form.querySelector(".form-message");
      if (message) {
        message.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  }

  showError(text) {
    this.showMessage("❌ " + text, "error");
  }

  showMessage(text, type) {
    // Supprimer message existant
    const existing = this.form.querySelector(".form-message");
    if (existing) existing.remove();

    // Créer nouveau message
    const message = document.createElement("div");
    message.className = `form-message ${type}`;
    message.innerHTML = text;
    message.setAttribute("role", type === "error" ? "alert" : "status");

    this.form.appendChild(message);

    // Auto-suppression après 8s
    setTimeout(() => message.remove(), 8000);
  }
}

// ============================================
// 📸 GALERIE PHOTOS GÉNÉRIQUE (CABINET + PROFESSION)
// ============================================
class GalleryManager {
  constructor(containerId, images) {
    this.containerId = containerId;
    this.currentIndex = 0;
    this.images = images;
    this.init();
  }

  init() {
    this.galleryContainer = document.getElementById(this.containerId);
    if (!this.galleryContainer) return;

    this.mainImage = this.galleryContainer.querySelector(".gallery-main-image");
    this.captionText = this.galleryContainer.querySelector(".caption-text");
    this.indicators = this.galleryContainer.querySelectorAll(".indicator");

    // Navigation buttons
    const prevBtn = this.galleryContainer.querySelector(".gallery-prev");
    const nextBtn = this.galleryContainer.querySelector(".gallery-next");

    if (prevBtn) prevBtn.addEventListener("click", () => this.navigate(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => this.navigate(1));

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    // Keyboard navigation (global, mais vérifie visibilité)
    document.addEventListener("keydown", (e) => {
      if (!this.isGalleryVisible()) return;
      if (e.key === "ArrowLeft") this.navigate(-1);
      if (e.key === "ArrowRight") this.navigate(1);
    });

    // Touch swipe support
    this.setupTouchSwipe();

    // Lazy loading
    this.setupLazyLoading();

    // Preload images
    this.preloadImages();
  }

  navigate(direction) {
    this.currentIndex += direction;
    if (this.currentIndex < 0) this.currentIndex = this.images.length - 1;
    if (this.currentIndex >= this.images.length) this.currentIndex = 0;
    this.updateGallery();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateGallery();
  }

  updateGallery() {
    const currentImage = this.images[this.currentIndex];

    // Fade out
    this.mainImage.style.opacity = "0";

    setTimeout(() => {
      // Update image
      this.mainImage.src = currentImage.src;
      this.mainImage.alt = currentImage.alt;

      // Update caption
      if (this.captionText) {
        this.captionText.textContent = currentImage.caption;
      }

      // Update indicators
      this.indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === this.currentIndex);
      });

      // Fade in
      this.mainImage.style.opacity = "1";
    }, 150);
  }

  setupTouchSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.galleryContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.galleryContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    });
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.navigate(1); // Swipe left - next
      } else {
        this.navigate(-1); // Swipe right - previous
      }
    }
  }

  setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    if (this.mainImage) {
      imageObserver.observe(this.mainImage);
    }
  }

  preloadImages() {
    this.images.forEach((imageData, index) => {
      if (index === 0) return; // Skip first image (already loaded)
      const img = new Image();
      img.src = imageData.src;
    });
  }

  isGalleryVisible() {
    const section = this.galleryContainer.closest(".section");
    if (!section) return false;
    return section.style.display !== "none";
  }
}

class SEO {
  constructor() {
    this.init();
  }
  init() {
    $$(".nav-link").forEach((link) =>
      link.addEventListener("click", () =>
        this.updatePageTitle(link.dataset.section)
      )
    );
    this.addStructuredData();
  }
  updatePageTitle(section) {
    const titles = {
      accueil:
        "Edwina Decherf - Ergothérapeute spécialisée enfants et personnes âgées",
      profession: "L'ergothérapie - Accompagnement autonomie quotidienne",
      cabinet: "Cabinet Ergothérapie - Consultations et Visites domicile",
      formations: "Formations spécialisées - TSA, Troubles apprentissages",
      tarifs: "Tarifs Ergothérapeute - Bilans, Séances, Consultations",
      contact: "Contact Edwina Decherf - Prise de rendez-vous Ergothérapeute",
    };
    document.title = titles[section] || titles.accueil;
    const descriptions = {
      accueil:
        "Edwina Decherf, ergothérapeute diplômée depuis 2011, spécialisée pédiatrie et gériatrie. Consultations libérales, bilans, rééducation troubles apprentissages.",
      profession:
        "Découvrez l'ergothérapie : accompagnement vers l'autonomie, évaluation capacités, adaptation environnement, rééducation personnalisée.",
      cabinet:
        "Cabinet ergothérapie accessible. Consultations enfants et personnes âgées, visites domicile et établissements, matériel spécialisé.",
      formations:
        "Formation continue ergothérapie : TSA, troubles apprentissages, habiletés visuelles, motricité fine pédiatrie, neurodéveloppement.",
      tarifs:
        "Tarifs ergothérapeute : bilans 155€, séances 42€, consultations domicile, évaluations aides techniques. Prescription médicale obligatoire.",
      contact:
        "Prenez rendez-vous avec Edwina Decherf, ergothérapeute. Email: edwinadecherf@gmail.com, Tel: 06 32 62 95 11. Formulaire en ligne.",
    };
    let metaDesc = $('meta[name="description"]');
    if (metaDesc)
      metaDesc.setAttribute(
        "content",
        descriptions[section] || descriptions.accueil
      );
  }
  addStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Edwina Decherf - Ergothérapeute D.E.",
      description:
        "Ergothérapeute diplômée d'État spécialisée en pédiatrie et gériatrie, consultations libérales et interventions à domicile",
      url: "https://votre-domaine.com",
      email: "edwinadecherf@gmail.com",
      telephone: "+33632629511",
      medicalSpecialty: "Occupational Therapy",
      serviceType: "Ergothérapie",
      areaServed: "France",
      availableLanguage: "French",
      paymentAccepted: ["Cash", "Check"],
      currenciesAccepted: "EUR",
      priceRange: "42€-155€",
      foundingDate: "2011",
      knowsAbout: [
        "Troubles du Spectre Autistique",
        "Troubles des apprentissages",
        "Motricité fine pédiatrie",
        "Habiletés visuelles",
        "Gériatrie",
        "Adaptation domicile",
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Diplôme d'État",
        educationalLevel: "Bachelor",
        recognizedBy: {
          "@type": "Organization",
          name: "École d'ergothérapie de Berck-sur-Mer",
        },
      },
      memberOf: [
        {
          "@type": "Organization",
          name: "ANFE - Association Nationale Française des Ergothérapeutes",
        },
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bilan ergothérapique complet",
            description: "Évaluation complète des capacités et difficultés",
          },
          price: "155",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Séance d'ergothérapie",
            description: "Séance individuelle 45 minutes",
          },
          price: "42",
          priceCurrency: "EUR",
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}

class App {
  constructor() {
    this.navigation = new Navigation();
    this.mobileMenu = new MobileMenu();
    this.contactForm = new ContactForm("contact-form");
    this.seo = new SEO();
    this.init();
  }
  init() {
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", () => this.onReady())
      : this.onReady();
  }
  onReady() {
    setTimeout(() => {
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
      state.isLoading = false;
    }, 100);

    // ============================================
    // 📸 INITIALISATION GALERIES
    // ============================================

    // Galerie Cabinet (5 photos)
    const cabinetGallery = new GalleryManager("cabinetGallery", [
      {
        src: "images/photos/entree_7_11zon.webp",
        alt: "Entrée de la Maison médicale",
        caption: "Entrée de la Maison médicale",
      },
      {
        src: "images/photos/materiel2_9_11zon.webp",
        alt: "Matériel spécialisé ergothérapie",
        caption: "Jouets et matériel spécialisé",
      },
      {
        src: "images/photos/cabinet2_2_11zon.webp",
        alt: "Bureau de consultation ergothérapie",
        caption: "Bureau de consultation",
      },
      {
        src: "images/photos/materiel3_10_11zon.webp",
        alt: "Matériel spécialisé ergothérapie",
        caption: "Jouets et matériel spécialisé",
      },
      {
        src: "images/photos/cabinet3_3_11zon.webp",
        alt: "Coin activités pour enfants",
        caption: "Coin activités pour enfants",
      },
      {
        src: "images/photos/materiel1_8_11zon.webp",
        alt: "Matériel spécialisé ergothérapie",
        caption: "Jouets et matériel spécialisé",
      },
    ]);

    // Galerie Profession (2 photos action)
    const professionGallery = new GalleryManager("professionGallery", [
      {
        src: "images/photos/action-enfant.webp",
        alt: "Ergothérapie pédiatrique - Accompagnement enfant",
        caption: "Accompagnement en ergothérapie pédiatrique",
      },
      {
        src: "images/photos/action-senior.webp",
        alt: "Ergothérapie gériatrique - Accompagnement personne âgée",
        caption: "Accompagnement en ergothérapie gériatrique",
      },
    ]);

    if ("serviceWorker" in navigator)
      navigator.serviceWorker
        .register("/sw.js")
        .catch(() => console.log("Service Worker non disponible"));
  }
}

new App();
