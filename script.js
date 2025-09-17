const config = { emailService: 'mailto:edwinadecherf@gmail.com', lang: 'fr' };
const state = { currentSection: 'accueil', isMenuOpen: false, isLoading: true };
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

class Navigation {
    constructor() {
        this.sections = $$('.section'); this.navLinks = $$('.nav-link'); this.init();
    }
    init() {
        this.navLinks.forEach(link => link.addEventListener('click', e => { e.preventDefault(); this.navigateTo(link.dataset.section); }));
        $$('[data-section]').forEach(btn => { if (!btn.classList.contains('nav-link')) btn.addEventListener('click', e => { e.preventDefault(); this.navigateTo(btn.dataset.section); }); });
        window.addEventListener('hashchange', () => { const hash = window.location.hash.slice(1); if (hash) this.navigateTo(hash); });
        const initialHash = window.location.hash.slice(1); if (initialHash) this.navigateTo(initialHash);
    }
    navigateTo(section) {
        if (state.currentSection === section) return;
        $(`#${state.currentSection}`)?.classList.remove('active');
        setTimeout(() => {
            const newSection = $(`#${section}`);
            if (newSection) {
                newSection.classList.add('active'); state.currentSection = section; this.updateActiveNav(section);
                history.replaceState(null, null, `#${section}`);
            }
        }, 150);
        this.closeMobileMenu();
    }
    updateActiveNav(section) { this.navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === section)); }
    closeMobileMenu() { $('.nav-menu')?.classList.remove('active'); state.isMenuOpen = false; }
}

class MobileMenu {
    constructor() { this.toggle = $('.nav-toggle'); this.menu = $('.nav-menu'); this.init(); }
    init() {
        this.toggle?.addEventListener('click', () => { state.isMenuOpen = !state.isMenuOpen; this.menu?.classList.toggle('active', state.isMenuOpen); });
        document.addEventListener('click', e => { if (!e.target.closest('.nav') && state.isMenuOpen) { this.menu?.classList.remove('active'); state.isMenuOpen = false; } });
    }
}

class ContactForm {
    constructor() { this.form = $('#contactForm'); this.init(); }
    init() {
        this.form?.addEventListener('submit', async e => { e.preventDefault(); await this.handleSubmit(); });
        this.form?.querySelectorAll('input, select, textarea').forEach(field => field.addEventListener('blur', () => this.validateField(field)));
    }
    async handleSubmit() {
        const formData = new FormData(this.form), data = Object.fromEntries(formData.entries());
        if (!this.validateForm(data)) return;
        const emailBody = this.generateEmailBody(data), subject = `Demande de rendez-vous - ${data.motif}`;
        const mailtoUrl = `${config.emailService}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        try { window.location.href = mailtoUrl; this.showSuccess(); this.form.reset(); } catch { this.showError('Erreur lors de l\'ouverture du client mail'); }
    }
    generateEmailBody(data) {
        return `Nouvelle demande de rendez-vous

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
Formulaire envoyé via le site web`;
    }
    validateForm(data) {
        const errors = [];
        if (!data.nom?.trim()) errors.push('Le nom est requis');
        if (!data.email?.trim()) errors.push('L\'email est requis');
        if (!data.motif) errors.push('Le motif est requis');
        if (data.email && !this.isValidEmail(data.email)) errors.push('L\'email n\'est pas valide');
        if (errors.length > 0) { this.showError(errors.join('\n')); return false; }
        return true;
    }
    validateField(field) {
        field.style.borderColor = '';
        if (field.required && !field.value.trim()) { field.style.borderColor = 'var(--error)'; return false; }
        if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) { field.style.borderColor = 'var(--error)'; return false; }
        field.style.borderColor = 'var(--success)'; return true;
    }
    isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
    showSuccess() { alert('Votre demande va être envoyée par email. Merci !'); }
    showError(message) { alert('Erreur: ' + message); }
}

class SEO {
    constructor() { this.init(); }
    init() {
        $$('.nav-link').forEach(link => link.addEventListener('click', () => this.updatePageTitle(link.dataset.section)));
        this.addStructuredData();
    }
    updatePageTitle(section) {
        const titles = {
            accueil: 'Edwina Decherf - Ergothérapeute spécialisée enfants et personnes âgées',
            profession: 'L\'ergothérapie - Accompagnement autonomie quotidienne',
            cabinet: 'Cabinet Ergothérapie - Consultations et Visites domicile',
            formations: 'Formations spécialisées - TSA, Troubles apprentissages',
            tarifs: 'Tarifs Ergothérapeute - Bilans, Séances, Consultations',
            contact: 'Contact Edwina Decherf - Prise de rendez-vous Ergothérapeute'
        };
        document.title = titles[section] || titles.accueil;
        const descriptions = {
            accueil: 'Edwina Decherf, ergothérapeute diplômée depuis 2011, spécialisée pédiatrie et gériatrie. Consultations libérales, bilans, rééducation troubles apprentissages.',
            profession: 'Découvrez l\'ergothérapie : accompagnement vers l\'autonomie, évaluation capacités, adaptation environnement, rééducation personnalisée.',
            cabinet: 'Cabinet ergothérapie accessible. Consultations enfants et personnes âgées, visites domicile et établissements, matériel spécialisé.',
            formations: 'Formation continue ergothérapie : TSA, troubles apprentissages, habiletés visuelles, motricité fine pédiatrie, neurodéveloppement.',
            tarifs: 'Tarifs ergothérapeute : bilans 155€, séances 42€, consultations domicile, évaluations aides techniques. Prescription médicale obligatoire.',
            contact: 'Prenez rendez-vous avec Edwina Decherf, ergothérapeute. Email: edwinadecherf@gmail.com, Tel: 06 32 62 95 11. Formulaire en ligne.'
        };
        let metaDesc = $('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', descriptions[section] || descriptions.accueil);
    }
    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org", "@type": "MedicalBusiness",
            "name": "Edwina Decherf - Ergothérapeute D.E.",
            "description": "Ergothérapeute diplômée d'État spécialisée en pédiatrie et gériatrie, consultations libérales et interventions à domicile",
            "url": "https://votre-domaine.com", "email": "edwinadecherf@gmail.com", "telephone": "+33632629511",
            "medicalSpecialty": "Occupational Therapy", "serviceType": "Ergothérapie", "areaServed": "France",
            "availableLanguage": "French", "paymentAccepted": ["Cash", "Check"], "currenciesAccepted": "EUR",
            "priceRange": "42€-155€", "foundingDate": "2011",
            "knowsAbout": ["Troubles du Spectre Autistique", "Troubles des apprentissages", "Motricité fine pédiatrie", "Habiletés visuelles", "Gériatrie", "Adaptation domicile"],
            "hasCredential": { "@type": "EducationalOccupationalCredential", "credentialCategory": "Diplôme d'État", "educationalLevel": "Bachelor", "recognizedBy": { "@type": "Organization", "name": "École d'ergothérapie de Berck-sur-Mer" } },
            "memberOf": [{ "@type": "Organization", "name": "ANFE - Association Nationale Française des Ergothérapeutes" }],
            "makesOffer": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bilan ergothérapique complet", "description": "Évaluation complète des capacités et difficultés" }, "price": "155", "priceCurrency": "EUR" },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Séance d'ergothérapie", "description": "Séance individuelle 45 minutes" }, "price": "42", "priceCurrency": "EUR" }
            ]
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json'; script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
}

class App {
    constructor() {
        this.navigation = new Navigation(); this.mobileMenu = new MobileMenu(); 
        this.contactForm = new ContactForm(); this.seo = new SEO(); this.init();
    }
    init() { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => this.onReady()) : this.onReady(); }
    onReady() {
        setTimeout(() => { document.body.classList.remove('loading'); document.body.classList.add('loaded'); state.isLoading = false; }, 100);
        if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => console.log('Service Worker non disponible'));
    }
}

new App();
