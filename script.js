// Configuration
const config = {
    emailService: 'mailto:ergotherapeute@exemple.com', // Remplacer par l'email réel
    lang: 'fr'
};

// État de l'application
const state = {
    currentSection: 'accueil',
    isMenuOpen: false,
    isLoading: true
};

// Utilitaires
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Gestion de la navigation SPA
class Navigation {
    constructor() {
        this.sections = $$('.section');
        this.navLinks = $$('.nav-link');
        this.init();
    }
    
    init() {
        // Navigation par clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.navigateTo(section);
            });
        });
        
        // Navigation par boutons CTA
        $$('[data-section]').forEach(btn => {
            if (!btn.classList.contains('nav-link')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = btn.dataset.section;
                    this.navigateTo(section);
                });
            }
        });
        
        // Gestion du hash URL
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash) this.navigateTo(hash);
        });
        
        // Navigation au chargement
        const initialHash = window.location.hash.slice(1);
        if (initialHash) this.navigateTo(initialHash);
    }
    
    navigateTo(section) {
        if (state.currentSection === section) return;
        
        // Animation de sortie
        const currentSection = $(`#${state.currentSection}`);
        currentSection?.classList.remove('active');
        
        // Animation d'entrée
        setTimeout(() => {
            const newSection = $(`#${section}`);
            if (newSection) {
                newSection.classList.add('active');
                state.currentSection = section;
                this.updateActiveNav(section);
                history.replaceState(null, null, `#${section}`);
            }
        }, 150);
        
        // Fermer le menu mobile
        this.closeMobileMenu();
    }
    
    updateActiveNav(section) {
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === section);
        });
    }
    
    closeMobileMenu() {
        const menu = $('.nav-menu');
        menu?.classList.remove('active');
        state.isMenuOpen = false;
    }
}

// Gestion du menu mobile
class MobileMenu {
    constructor() {
        this.toggle = $('.nav-toggle');
        this.menu = $('.nav-menu');
        this.init();
    }
    
    init() {
        this.toggle?.addEventListener('click', () => {
            state.isMenuOpen = !state.isMenuOpen;
            this.menu?.classList.toggle('active', state.isMenuOpen);
        });
        
        // Fermer en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && state.isMenuOpen) {
                this.menu?.classList.remove('active');
                state.isMenuOpen = false;
            }
        });
    }
}

// Gestion du formulaire
class ContactForm {
    constructor() {
        this.form = $('#contactForm');
        this.init();
    }
    
    init() {
        this.form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
        
        // Validation en temps réel
        this.form?.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
        });
    }
    
    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Validation
        if (!this.validateForm(data)) return;
        
        // Génération de l'email
        const emailBody = this.generateEmailBody(data);
        const subject = `Demande de rendez-vous - ${data.motif}`;
        
        // Ouverture du client mail
        const mailtoUrl = `${config.emailService}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        
        try {
            window.location.href = mailtoUrl;
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            this.showError('Erreur lors de l\'ouverture du client mail');
        }
    }
    
    generateEmailBody(data) {
        return `
Nouvelle demande de rendez-vous

Informations du patient :
- Nom: ${data.nom}
- Email: ${data.email}
- Téléphone: ${data.telephone || 'Non renseigné'}
- Tranche d'âge: ${data.age || 'Non précisé'}

Demande :
- Motif: ${data.motif}
- Urgence: ${data.urgence || 'Normal'}

Message :
${data.message || 'Aucun message complémentaire'}

---
Formulaire envoyé via le site web
        `.trim();
    }
    
    validateForm(data) {
        const errors = [];
        
        if (!data.nom?.trim()) errors.push('Le nom est requis');
        if (!data.email?.trim()) errors.push('L\'email est requis');
        if (!data.motif) errors.push('Le motif est requis');
        
        if (data.email && !this.isValidEmail(data.email)) {
            errors.push('L\'email n\'est pas valide');
        }
        
        if (errors.length > 0) {
            this.showError(errors.join('\n'));
            return false;
        }
        
        return true;
    }
    
    validateField(field) {
        field.style.borderColor = '';
        
        if (field.required && !field.value.trim()) {
            field.style.borderColor = 'var(--error)';
            return false;
        }
        
        if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
            field.style.borderColor = 'var(--error)';
            return false;
        }
        
        field.style.borderColor = 'var(--success)';
        return true;
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    showSuccess() {
        alert('Votre demande va être envoyée par email. Merci !');
    }
    
    showError(message) {
        alert('Erreur: ' + message);
    }
}

// Optimisations de performance
class Performance {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy loading des images
        this.setupLazyLoading();
        
        // Préchargement des sections
        this.preloadSections();
        
        // Debounce pour le resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 250);
        });
    }
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            $$('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    preloadSections() {
        // Précharger les sections importantes après le chargement initial
        setTimeout(() => {
            const importantSections = ['profession', 'contact'];
            importantSections.forEach(section => {
                const element = $(`#${section}`);
                if (element) element.style.visibility = 'visible';
            });
        }, 1000);
    }
    
    handleResize() {
        // Gestion responsive dynamique si nécessaire
    }
}

// SEO et Accessibilité
class SEO {
    constructor() {
        this.init();
    }
    
    init() {
        // Mise à jour du title dynamique
        const navLinks = $$('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const section = link.dataset.section;
                this.updatePageTitle(section);
            });
        });
        
        // Gestion du schéma JSON-LD
        this.addStructuredData();
    }
    
    updatePageTitle(section) {
        const titles = {
            accueil: 'Ergothérapeute - Accompagnement personnalisé',
            profession: 'L\'ergothérapie - Qu\'est-ce que c\'est ?',
            cabinet: 'Le Cabinet - Localisation et Accès',
            contact: 'Contact - Prise de rendez-vous'
        };
        
        document.title = titles[section] || titles.accueil;
        
        // Mise à jour de la meta description
        const descriptions = {
            accueil: 'Ergothérapeute diplômée, accompagnement personnalisé pour améliorer votre autonomie au quotidien.',
            profession: 'Découvrez l\'ergothérapie : évaluation, traitement et accompagnement vers l\'autonomie.',
            cabinet: 'Cabinet d\'ergothérapie accessible, situé au cœur de la ville avec parking PMR.',
            contact: 'Prenez rendez-vous avec votre ergothérapeute. Formulaire de contact simple et rapide.'
        };
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', descriptions[section] || descriptions.accueil);
        }
    }
    
    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "HealthAndBeautyBusiness",
            "name": "Cabinet d'Ergothérapie",
            "description": "Ergothérapeute diplômée d'État spécialisée dans l'accompagnement vers l'autonomie",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Rue de la Santé",
                "addressLocality": "Ville",
                "postalCode": "75000",
                "addressCountry": "FR"
            },
            "openingHours": [
                "Mo-Fr 09:00-18:00",
                "Sa 09:00-12:00"
            ],
            "priceRange": "Sur devis",
            "hasMap": "https://maps.google.com",
            "isAccessibleForFree": false,
            "paymentAccepted": ["Cash", "Credit Card"],
            "currenciesAccepted": "EUR"
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
}

// Gestion de la localisation
class Localization {
    constructor() {
        this.currentLang = 'fr';
        this.translations = {
            fr: {
                nav: {
                    accueil: 'Accueil',
                    profession: 'La profession',
                    cabinet: 'Le cabinet',
                    contact: 'Contact'
                }
            }
        };
    }
    
    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || key;
    }
}

// Initialisation de l'application
class App {
    constructor() {
        this.navigation = new Navigation();
        this.mobileMenu = new MobileMenu();
        this.contactForm = new ContactForm();
        this.performance = new Performance();
        this.seo = new SEO();
        this.localization = new Localization();
        
        this.init();
    }
    
    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onReady());
        } else {
            this.onReady();
        }
    }
    
    onReady() {
        // Animation de chargement
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            state.isLoading = false;
        }, 100);
        
        // Service Worker pour la mise en cache
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Pas de service worker, pas grave
            });
        }
    }
}

// Lancement de l'application
new App();
