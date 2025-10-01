# 🗺️ Feuille de Route - Site Ergothérapeute

## 📋 État Actuel du Projet
**Version :** 1.0 en cours de finalisation  
**Statut :** ✅ 9/25 tâches complétées - ÉTAPE 2 en cours  
**Dernière mise à jour :** 26/09/2025  
**Priorité actuelle :** Page Cabinet (Google Maps + Photos)  

---

## ✅ ÉTAPE 1 - Page Accueil (TERMINÉE)
**Durée réelle :** 2h  
**Complexité :** ⭐⭐  
**Statut :** ✅ **VALIDÉE**

### Tâches Complétées
- ✅ Image plaque d'immatriculation intégrée dans hero section
- ✅ Logo repositionné en haut à gauche (90x70px → responsive)
- ✅ Bouton CTA configuré pour redirection vers #contact
- ✅ Responsive design testé sur tous supports

### Livrables Validés
- ✅ Image optimisée avec object-fit: cover
- ✅ CSS responsive (desktop/tablette/mobile)
- ✅ JavaScript navigation fonctionnel

**Commandes Git effectuées :**
```bash
git add index.html style.css images/
git commit -m "feat: mise à jour page accueil - image plaque + repositionnement logo + CTA contact"
git push origin main
```

---

## 🎯 ÉTAPE 2 - Page Cabinet (EN COURS - 75% COMPLÉTÉ)
**Durée estimée :** 3h  
**Durée écoulée :** 2h  
**Complexité :** ⭐⭐⭐  
**Statut :** 🔄 **EN COURS** - Sous-étapes 2.1 et 2.2 terminées

### ✅ Sous-Étape 2.1 - Textes et Accès (TERMINÉE)
**Statut :** ✅ **VALIDÉE**
- ✅ Titre "Localisation" changé en "Accès"
- ✅ Adresse complète Maison de Santé ajoutée
- ✅ Informations accessibilité PMR + parking gratuit intégrées

### ✅ Sous-Étape 2.2 - Horaires et Services (TERMINÉE)
**Statut :** ✅ **VALIDÉE**
- ✅ Consultations modifiées → "mardi et mercredi uniquement"
- ✅ Domicile modifié → "Personnes âgées - Évaluation à domicile, aide technique"
- ✅ "Habiletés visuelles" supprimé des spécialités

### 🔄 Sous-Étape 2.3 - Google Maps (EN COURS)
**Statut :** ⏳ **À DÉMARRER**
**Complexité :** ⭐⭐
**Durée estimée :** 30 minutes

#### Tâche à Réaliser
- [ ] Intégrer Google Maps iframe interactif

#### Plan Technique
```html
<!-- Approche proposée : Embed iframe simple -->
<div class="map-container">
  <iframe 
    src="https://www.google.com/maps/embed?pb=..."
    width="100%" 
    height="400"
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy">
  </iframe>
</div>
```

#### CSS Responsive Prévu
```css
.map-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  margin: 2rem 0;
}

.map-container iframe {
  width: 100%;
  min-height: 400px;
}

@media (max-width: 768px) {
  .map-container iframe {
    min-height: 300px;
  }
}
```

### ⏳ Sous-Étape 2.4 - Galerie Photos Cabinet (EN ATTENTE)
**Statut :** ⏳ **EN ATTENTE**
**Complexité :** ⭐⭐⭐
**Durée estimée :** 30 minutes

#### Tâches à Réaliser
- [ ] Ajouter 3 photos cabinet (accueil, bureau, salle)
- [ ] Implémenter lazy loading avec Intersection Observer
- [ ] Créer système de navigation entre photos

#### Architecture Technique Prévue
```html
<div class="cabinet-gallery">
  <div class="gallery-item">
    <img data-src="images/cabinet/accueil.jpg" 
         alt="Salle d'accueil du cabinet"
         class="lazy-load">
    <p class="gallery-caption">Espace d'accueil</p>
  </div>
  <!-- 2 autres photos -->
</div>
```

#### JavaScript Lazy Loading
```javascript
// Intersection Observer pour lazy loading
const lazyImages = document.querySelectorAll('.lazy-load');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});
```

### Progression ÉTAPE 2
**Complété :** 6/8 tâches (75%)
- ✅ Textes et accès : 3/3
- ✅ Horaires et services : 3/3
- ⏳ Google Maps : 0/1
- ⏳ Galerie photos : 0/1

**Commandes Git à effectuer après ÉTAPE 2 complète :**
```bash
git add index.html style.css script.js images/cabinet/
git commit -m "feat: refonte page cabinet - accès, horaires, Google Maps, galerie photos"
git push origin main
```

---

## 🎯 ÉTAPE 3 - Formulaire Contact (Priorité Critique)
**Durée estimée :** 4h  
**Complexité :** ⭐⭐⭐⭐⭐  
**Statut :** ⏳ **EN ATTENTE VALIDATION ÉTAPE 2**

### Architecture Nouvelle Structure
```
┌─────────────────────────────────────┐
│  PARTIE 1 : INFORMATIONS PARENTS    │
│  - Nom/Prénom                       │
│  - Email                            │
│  - Téléphone                        │
├─────────────────────────────────────┤
│  PARTIE 2 : INFORMATIONS ENFANT     │
│  - Nom/Prénom enfant                │
│  - Date de naissance                │
│  - Classe/École                     │
├─────────────────────────────────────┤
│  PARTIE 3 : VOTRE DEMANDE           │
│  - Champ libre (textarea)           │
│  - Exemples suggestions             │
└─────────────────────────────────────┘
```

### Tâches Techniques Détaillées
- [ ] **HTML** - Refactoring complet structure formulaire
- [ ] **CSS** - Mise à jour styles 3 sections distinctes
- [ ] **JavaScript** 
  - [ ] Validation multi-étapes
  - [ ] Gestion erreurs par section
  - [ ] Feedback utilisateur temps réel
- [ ] **EmailJS**
  - [ ] Création nouveau template email
  - [ ] Mapping des nouveaux champs
  - [ ] Tests d'envoi complets

---

## 🎯 ÉTAPE 4 - Pages Secondaires (Priorité Moyenne)
**Durée estimée :** 2h  
**Complexité :** ⭐⭐  
**Statut :** ⏳ **EN ATTENTE**

### 🏥 Page Profession
- [ ] Développer carrousel 2-3 images interventions
- [ ] Intégrer images : enfants + personnes âgées + stimulation cognitive
- [ ] Optimiser transitions et responsive

### 🎓 Page Formation
- [ ] Inverser ordre chronologique des formations
- [ ] Ajouter formation 2025-2026 en cours
- [ ] Mise à jour style timeline

---

## 🎯 ÉTAPE 5 - Page Tarifs (Priorité Basse)
**Durée estimée :** 1h30  
**Complexité :** ⭐⭐  
**Statut :** ⏳ **EN ATTENTE**

### Modifications Textes
- [ ] Ajouter "(sous condition)" séances domicile/école
- [ ] Supprimer "Intervention en milieu naturel"
- [ ] Supprimer "Consultation" services principaux
- [ ] Ajouter "Déplacement inclus 20 km" évaluation technique
- [ ] Déplacer "Consultation" vers services complémentaires
- [ ] Modifier "Remboursement" → "Aide financière possible"
- [ ] Modifier paiement échelonné → "Possible pour bilan (2 fois max)"

---

## 📊 Progression Globale

### Vue d'ensemble
- **Total tâches :** 25
- **Complétées :** 9 (36%)
- **En cours :** 2 (8%)
- **En attente :** 14 (56%)

### Par Page
| Page | Statut | Progression |
|------|--------|-------------|
| 🏠 Accueil | ✅ Terminée | 3/3 (100%) |
| 🏢 Cabinet | 🔄 En cours | 6/8 (75%) |
| 👩‍⚕️ Profession | ⏳ En attente | 0/2 (0%) |
| 🎓 Formation | ⏳ En attente | 0/2 (0%) |
| 💰 Tarifs | ⏳ En attente | 0/7 (0%) |
| 📞 Contact | ⏳ En attente | 0/3 (0%) |

### Temps
- **Écoulé :** 4h
- **Restant estimé :** 7h
- **Total prévu :** 11h

---

## 🎯 Action Immédiate - SOUS-ÉTAPE 2.3

### 🚀 Prochaine Action : Intégration Google Maps

#### ❓ Information Requise
**Avez-vous l'adresse exacte de la Maison de Santé ?**
- Numéro et rue
- Code postal
- Ville

#### 🗺️ Options Techniques

**Option A : Embed Iframe Simple** ⭐ (Recommandé)
- ✅ Pas d'API key nécessaire
- ✅ Intégration rapide (10 minutes)
- ✅ Interactivité native Google Maps
- ✅ Responsive automatique

**Option B : Google Maps API Custom**
- ⚠️ Nécessite API key
- ⚠️ Configuration complexe
- ✅ Personnalisation avancée (markers custom)

#### 📝 Démarche Proposée
1. Vous me donnez l'adresse complète
2. Je génère l'URL embed Google Maps
3. J'intègre l'iframe dans la section Cabinet
4. J'applique le CSS responsive
5. Tests multi-devices
6. → **Validation avant Sous-Étape 2.4**

**Temps estimé : 30 minutes**

---

## 📝 Notes de Développement

### Bonnes Pratiques Maintenues
✅ Validation étape par étape  
✅ Commits Git descriptifs avec préfixe `feat:`  
✅ Approche mobile-first  
✅ Code vanilla optimisé  
✅ Documentation à jour en temps réel  

### Points d'Attention ÉTAPE 2
⚠️ Google Maps : Vérifier iframe responsive sur mobile  
⚠️ Photos cabinet : Format WebP recommandé (optimisation)  
⚠️ Lazy loading : Tester sur connexions lentes  

---

## 📞 Contact Projet
**Développeur :** CND - Web Is Yours  
**Dernière validation :** 26/09/2025 - Sous-étapes 2.1 et 2.2 ✅  
**Prochaine révision :** Après Sous-étape 2.3 (Google Maps)  

---

<div align="center">
  <strong>🚀 Développé avec ❤️ par CND - Web Is Yours</strong>
  <br>
  <em>Version 1.0 • Octobre 2025</em>
</div>

---

## 🎬 DÉMARRAGE SOUS-ÉTAPE 2.3

👉 **Donnez-moi l'adresse de la Maison de Santé pour intégrer Google Maps !**