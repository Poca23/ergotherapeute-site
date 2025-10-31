// =============================================
// ÉTAT GLOBAL
// =============================================
const state = {
  currentSection: "accueil",
  isMenuOpen: false,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// =============================================
// CLASSE NAVIGATION
// =============================================
class Navigation {
  constructor() {
    this.navLinks = $$(".nav-link");
    this.sections = $$(".section");
    this.init();
  }

  init() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        this.navigateTo(section);
      });
    });

    const hash = window.location.hash.slice(1);
    if (hash && $(`#${hash}`)) {
      this.navigateTo(hash);
    }
  }

  navigateTo(section) {
    $(`#${state.currentSection}`)?.classList.remove("active");

    setTimeout(() => {
      const newSection = $(`#${section}`);
      if (newSection) {
        newSection.classList.add("active");
        state.currentSection = section;
        this.updateActiveNav(section);
        history.replaceState(null, null, `#${section}`);

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50);
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

// =============================================
// CLASSE MOBILE MENU
// =============================================
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

// =============================================
// CLASSE CONTACT FORM
// =============================================
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
      ville: this.form.querySelector("#ville"),
      message: this.form.querySelector("#message"),
      rgpd: this.form.querySelector("#rgpd"),
    };

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    Object.values(this.fields).forEach((field) => {
      if (field) {
        field.addEventListener("blur", () => this.validateField(field));
        field.addEventListener("input", () => this.clearError(field));
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    this.showLoader();

    try {
      const templateParams = {
        parent_nom: this.fields.parentNom.value.trim(),
        parent_prenom: this.fields.parentPrenom.value.trim(),
        email: this.fields.email.value.trim(),
        telephone: this.fields.telephone.value.trim(),
        personne_nom: this.fields.personneNom.value.trim(),
        personne_prenom: this.fields.personnePrenom.value.trim(),
        date_naissance: this.fields.dateNaissance.value.trim(),
        classe:
          this.form.querySelector("#classe")?.value.trim() || "Non renseigné",
        ecole:
          this.form.querySelector("#ecole")?.value.trim() || "Non renseigné",
        ville: this.fields.ville.value.trim(),
        type_demande:
          this.form.querySelector("#type-demande")?.value || "Non renseigné",
        message: this.fields.message.value.trim(),
        source: this.form.querySelector("#source")?.value || "Non renseigné",
        source_autre:
          this.form.querySelector("#source-autre")?.value.trim() || "",
        date_demande: new Date().toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      await emailjs.send("service_do1z2ic", "template_sjc6l0i", templateParams);

      this.showSuccess();
      this.form.reset();
    } catch (error) {
      console.error("Erreur EmailJS:", error);
      this.showError(
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou me contacter directement."
      );
    } finally {
      this.hideLoader();
    }
  }

  validateForm() {
    let isValid = true;

    Object.entries(this.fields).forEach(([key, field]) => {
      if (field && field.hasAttribute("required")) {
        if (!this.validateField(field)) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let errorMessage = "";

    if (field.hasAttribute("required") && !value) {
      errorMessage = "Ce champ est obligatoire";
    }

    if (field.type === "email" && value && !this.isValidEmail(value)) {
      errorMessage = "Email invalide";
    }

    if (field.type === "tel" && value && !this.isValidPhone(value)) {
      errorMessage = "Numéro invalide (ex: 06 12 34 56 78)";
    }

    if (field.type === "checkbox" && field.id === "rgpd" && !field.checked) {
      errorMessage = "Vous devez accepter la politique de confidentialité";
    }

    this.showFieldError(field, errorMessage);
    return !errorMessage;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone) {
    const cleaned = phone.replace(/[\s\.\-\(\)]/g, "");
    return /^0[1-9]\d{8}$/.test(cleaned);
  }

  showFieldError(field, message) {
    const errorSpan = document.getElementById(`${field.id}-error`);

    if (message) {
      field.classList.add("error");
      if (errorSpan) errorSpan.textContent = message;
    } else {
      field.classList.remove("error");
      if (errorSpan) errorSpan.textContent = "";
    }
  }

  clearError(field) {
    this.showFieldError(field, "");
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
    const existing = this.form.querySelector(".form-message");
    if (existing) existing.remove();

    const messageDiv = document.createElement("div");
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;

    this.form.insertBefore(messageDiv, this.form.firstChild);
  }
}

// =============================================
// CLASSE CITY AUTOCOMPLETE
// =============================================
class CityAutocomplete {
  constructor(inputId) {
    this.input = document.getElementById(inputId);
    if (!this.input) return;

    this.suggestionsBox = document.getElementById(`${inputId}-suggestions`);
    this.selectedIndex = -1;
    this.cities = [];

    this.init();
  }

  init() {
    this.input.addEventListener("input", (e) => this.handleInput(e));
    this.input.addEventListener("keydown", (e) => this.handleKeyboard(e));

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".form-group")) {
        this.hideSuggestions();
      }
    });
  }

  async handleInput(e) {
    const query = e.target.value.trim();

    if (query.length < 2) {
      this.hideSuggestions();
      return;
    }

    const cities = await this.searchCities(query);
    this.displaySuggestions(cities);
  }

  async searchCities(query) {
    try {
      const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
        query
      )}&fields=nom,code,codesPostaux,departement&limit=5`;
      const response = await fetch(url);
      const data = await response.json();

      return data.map((city) => ({
        name: city.nom,
        postalCode: city.codesPostaux[0],
        dept: city.departement.code,
      }));
    } catch (error) {
      console.error("Erreur API Geo:", error);
      return [];
    }
  }

  displaySuggestions(cities) {
    this.cities = cities;

    if (cities.length === 0) {
      this.hideSuggestions();
      return;
    }

    this.suggestionsBox.innerHTML = cities
      .map(
        (city, index) => `
      <div class="autocomplete-item" data-index="${index}">
        <strong>${city.name}</strong> (${city.postalCode}) - ${city.dept}
      </div>
    `
      )
      .join("");

    this.suggestionsBox.classList.add("active");

    this.suggestionsBox
      .querySelectorAll(".autocomplete-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          const index = parseInt(item.dataset.index);
          this.selectCity(index);
        });
      });
  }

  hideSuggestions() {
    this.suggestionsBox.classList.remove("active");
    this.selectedIndex = -1;
  }

  handleKeyboard(e) {
    if (!this.suggestionsBox.classList.contains("active")) return;

    const items = this.suggestionsBox.querySelectorAll(".autocomplete-item");

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
        this.updateSelection(items);
        break;

      case "ArrowUp":
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.updateSelection(items);
        break;

      case "Enter":
        e.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectCity(this.selectedIndex);
        }
        break;

      case "Escape":
        this.hideSuggestions();
        break;
    }
  }

  updateSelection(items) {
    items.forEach((item, index) => {
      item.classList.toggle("selected", index === this.selectedIndex);
    });
  }

  selectCity(index) {
    const city = this.cities[index];
    if (city) {
      this.input.value = `${city.name} (${city.postalCode})`;
      this.hideSuggestions();
    }
  }
}

// =============================================
// CLASSE SEO
// =============================================
class SEO {
  constructor() {
    this.updateMetaTags("accueil");
    this.addStructuredData();
  }

  updateMetaTags(section) {
    const titles = {
      accueil: "Edwina Decherf - Ergothérapeute D.E. | Pédiatrie & Gériatrie",
      profession: "Qu'est-ce que l'ergothérapie ? | Edwina Decherf",
      cabinet: "Le Cabinet | Consultations & Localisation",
      formations: "Formations & Expertise | Formation Continue",
      tarifs: "Tarifs & Modalités | Consultations Ergothérapie",
      contact: "Contact & Rendez-vous | Edwina Decherf",
    };

    const descriptions = {
      accueil:
        "Ergothérapeute diplômée depuis 2011, spécialisée pédiatrie et gériatrie. Consultations libérales, bilans, rééducation TSA et troubles apprentissages.",
      profession:
        "L'ergothérapie améliore l'autonomie quotidienne enfants et personnes âgées. Interventions école, domicile, établissements spécialisés.",
      cabinet:
        "Cabinet ergothérapie Saint-Gervais-les-Trois-Clochers (86). Consultations mardi/mercredi, évaluations domicile personnes âgées.",
      formations:
        "Formation continue ergothérapie : TSA, troubles apprentissages, habiletés visuelles, motricité fine pédiatrie, neurodéveloppement.",
      tarifs:
        "Tarifs ergothérapeute : bilans 155€, séances 42€, consultations domicile, évaluations aides techniques. Prescription médicale obligatoire.",
      contact:
        "Prenez rendez-vous avec Edwina Decherf, ergothérapeute. Email: edwinadecherf@gmail.com, Tel: 06 32 62 95 11. Formulaire en ligne.",
    };

    document.title = titles[section] || titles.accueil;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        descriptions[section] || descriptions.accueil
      );
    }
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
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}

// =============================================
// CLASSE GALLERY AVEC AUTOPLAY
// =============================================
class Gallery {
  constructor(id, images) {
    this.container = document.getElementById(id);
    if (!this.container) return;

    this.images = images;
    this.current = 0;
    this.img = this.container.querySelector(".gallery-main-image");
    this.caption = this.container.querySelector(".caption-text");
    this.autoplayInterval = null;

    this.init();
  }

  init() {
    // Navigation boutons
    const prevBtn = this.container.querySelector(".gallery-prev");
    const nextBtn = this.container.querySelector(".gallery-next");

    if (prevBtn) prevBtn.onclick = () => this.manualNav(() => this.prev());
    if (nextBtn) nextBtn.onclick = () => this.manualNav(() => this.next());

    // Indicateurs
    this.container.querySelectorAll(".indicator").forEach((btn, i) => {
      btn.onclick = () => this.manualNav(() => this.goto(i));
    });

    // Clavier
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.manualNav(() => this.prev());
      if (e.key === "ArrowRight") this.manualNav(() => this.next());
    });

    // Swipe mobile
    let startX = 0;
    this.img.addEventListener(
      "touchstart",
      (e) => (startX = e.touches[0].clientX)
    );
    this.img.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        this.manualNav(() => (diff > 0 ? this.next() : this.prev()));
      }
    });

    // Lazy load
    if (this.img.dataset.src) {
      this.img.src = this.img.dataset.src;
      this.img.onload = () => this.img.classList.add("loaded");
    }

    // Démarrer autoplay
    this.startAutoplay();

    // Pause sur hover (desktop uniquement)
    if (window.innerWidth > 768) {
      this.container.addEventListener("mouseenter", () => this.stopAutoplay());
      this.container.addEventListener("mouseleave", () => this.startAutoplay());
    }
  }

  manualNav(action) {
    this.stopAutoplay();
    action();
    setTimeout(() => this.startAutoplay(), 5000); // Reprend après 5s
  }

  startAutoplay() {
    this.stopAutoplay(); // Clear existing
    this.autoplayInterval = setInterval(() => this.next(), 4000); // 4s entre chaque
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  prev() {
    this.current = (this.current - 1 + this.images.length) % this.images.length;
    this.update();
  }

  next() {
    this.current = (this.current + 1) % this.images.length;
    this.update();
  }

  goto(i) {
    this.current = i;
    this.update();
  }

  update() {
    // Fade out
    this.img.style.opacity = "0";

    setTimeout(() => {
      this.img.src = this.images[this.current].src;
      this.img.alt = this.images[this.current].alt;

      // Mise à jour caption si elle existe
      if (this.caption) {
        this.caption.textContent = this.images[this.current].caption;
      }

      // Mise à jour indicateurs
      this.container.querySelectorAll(".indicator").forEach((btn, i) => {
        btn.classList.toggle("active", i === this.current);
      });

      // Fade in
      this.img.style.opacity = "1";
    }, 300);
  }
}

// =============================================
// INITIALISATION AU CHARGEMENT
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialisation modules principaux
  new Navigation();
  new MobileMenu();
  new ContactForm("contact-form");
  new CityAutocomplete("ville");
  new SEO();

  // Initialisation EmailJS
  emailjs.init("atEnZgePdH88zB9jU");

  // Galerie Cabinet
  new Gallery("cabinetGallery", [
    {
      src: "images/photos/entree_7_11zon.webp",
      alt: "Entrée de la Maison médicale",
      caption: "Entrée de la Maison médicale",
    },
    {
      src: "images/photos/materiel2_9_11zon.webp",
      alt: "Matériel spécialisé",
      caption: "Jouets et matériel spécialisé",
    },
    {
      src: "images/photos/cabinet2_2_11zon.webp",
      alt: "Bureau de consultation",
      caption: "Bureau de consultation",
    },
    {
      src: "images/photos/materiel3_10_11zon.webp",
      alt: "Matériel spécialisé",
      caption: "Jouets et matériel spécialisé",
    },
    {
      src: "images/photos/cabinet3_3_11zon.webp",
      alt: "Coin activités",
      caption: "Coin activités pour enfants",
    },
    {
      src: "images/photos/materiel1_8_11zon.webp",
      alt: "Matériel spécialisé",
      caption: "Jouets et matériel spécialisé",
    },
  ]);

  // Galerie Profession
  new Gallery("professionGallery", [
    {
      src: "images/photos/action-enfant.webp",
      alt: "Ergothérapie pédiatrique",
      caption: "Accompagnement en ergothérapie pédiatrique",
    },
    {
      src: "images/photos/action-senior.webp",
      alt: "Ergothérapie gériatrique",
      caption: "Accompagnement en ergothérapie gériatrique",
    },
  ]);

  // Gestion champ "Autre" dans source
  const selectSource = document.getElementById("source");
  const autreGroup = document.getElementById("source-autre-group");
  const autreInput = document.getElementById("source-autre");

  if (selectSource && autreGroup) {
    selectSource.addEventListener("change", (e) => {
      if (e.target.value === "autre") {
        autreGroup.style.display = "block";
        autreInput.focus();
      } else {
        autreGroup.style.display = "none";
        autreInput.value = "";
      }
    });
  }

  // Retirer classe loading
  document.body.classList.remove("loading");
});
