# 🗺️ Feuille de Route - Site Ergothérapeute

## 📋 État Actuel du Projet
**Version :** 1.0 en cours de finalisation  
**Statut :** ✅ 3/25 tâches complétées - ÉTAPE 1 validée  
**Dernière mise à jour :** 26/09/2025  
**Priorité actuelle :** Page Cabinet + Formulaire Contact  

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

## 🎯 ÉTAPE 2 - Page Cabinet (EN COURS)
**Durée estimée :** 3h  
**Complexité :** ⭐⭐⭐  
**Statut :** 🔄 **À DÉMARRER**

### Tâches Prioritaires
- [ ] **Accès & Localisation**
  - [ ] Changer titre "Localisation" → "Accès"
  - [ ] Ajouter adresse complète Maison de Santé
  - [ ] Intégrer infos accessibilité PMR + parking gratuit
  - [ ] Embed Google Maps interactif

- [ ] **Horaires & Services**
  - [ ] Modifier consultations → "mardi et mercredi uniquement"
  - [ ] Modifier domicile → "Personnes âgées - Évaluation, aide technique"
  - [ ] Supprimer "Habiletés visuelles" des spécialités

- [ ] **Visuels**
  - [ ] Ajouter 3 photos cabinet (accueil, bureau, salle)
  - [ ] Optimiser images avec lazy loading

### Livrables Attendus
- Section Cabinet restructurée
- Google Maps iframe intégré
- Galerie photos avec navigation fluide
- Textes mis à jour selon nouvelles spécifications

**Commandes Git à effectuer :**
```bash
git add index.html style.css images/cabinet/
git commit -m "feat: refonte page cabinet - accès, horaires, photos, Google Maps"
git push origin main
```

**⏸️ ATTENTE VALIDATION AVANT PASSAGE ÉTAPE 3**

---

## 🎯 ÉTAPE 3 - Formulaire Contact (Priorité Critique)
**Durée estimée :** 4h  
**Complexité :** ⭐⭐⭐⭐⭐  
**Statut :** ⏳ **EN ATTENTE**

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

### Livrables Critiques
- Formulaire 3 parties responsive
- Validation JavaScript robuste
- Template EmailJS opérationnel
- Documentation tests utilisateur

**Commandes Git à effectuer :**
```bash
git add index.html style.css script.js
git commit -m "feat: refonte formulaire contact - architecture 3 parties + validation avancée + EmailJS"
git push origin main
```

---

## 🎯 ÉTAPE 4 - Pages Secondaires (Priorité Moyenne)
**Durée estimée :** 2h  
**Complexité :** ⭐⭐  
**Statut :** ⏳ **EN ATTENTE**

### 🏥 Page Profession
- [ ] Développer carrousel 2-3 images interventions
- [ ] Intégrer images : enfants + personnes âgées + stimulation cognitive
- [ ] Optimiser transitions et lazy loading

### 🎓 Page Formation  
- [ ] Inverser ordre chronologique (du plus récent au plus ancien)
- [ ] Ajouter formation 2025-2026 avec badge "En cours"

### 💰 Page Tarifs
**Modifications Services :**
- [ ] Ajouter "(sous condition)" pour séances domicile/école
- [ ] Supprimer "Intervention en milieu naturel"
- [ ] Retirer "Consultation" des services principaux
- [ ] Déplacer "Consultation" vers services complémentaires
- [ ] Ajouter "Déplacement inclus 20 km" pour évaluation technique

**Modifications Paiement :**
- [ ] Modifier "Remboursement" → "Aide financière possible"
- [ ] Modifier paiement échelonné → "Possible pour bilan (2 fois maximum)"

**Commandes Git à effectuer :**
```bash
git add index.html style.css script.js images/
git commit -m "feat: mise à jour pages profession (carrousel), formation (chronologie), tarifs (restructuration)"
git push origin main
```

---

## 📊 Récapitulatif Planning Actualisé

| Étape | Statut | Durée | Complexité | Priorité | Progression |
|-------|--------|-------|------------|----------|-------------|
| ✅ Accueil | Terminée | 2h | ⭐⭐ | Haute | 100% |
| 🔄 Cabinet | En attente | 3h | ⭐⭐⭐ | Haute | 0% |
| ⏳ Contact | En attente | 4h | ⭐⭐⭐⭐⭐ | Critique | 0% |
| ⏳ Pages mineures | En attente | 2h | ⭐⭐ | Moyenne | 0% |

**Temps écoulé :** 2h  
**Temps restant estimé :** 9h  
**Progression globale :** 12% (3/25 tâches)

---

## 🎯 Action Immédiate
**🔄 DÉMARRER ÉTAPE 2** - Page Cabinet  

### Prochaines Actions (ordre)
1. ✅ Valider ÉTAPE 1 complète ✅
2. 🚀 Lancer ÉTAPE 2 - Cabinet
3. ⏳ Attendre validation avant ÉTAPE 3

---

## 📝 Notes de Développement

### Bonnes Pratiques Appliquées
- ✅ Validation étape par étape
- ✅ Commits Git descriptifs avec préfixe `feat:`
- ✅ Approche mobile-first maintenue
- ✅ Code vanilla optimisé
- ✅ Documentation à jour

### Points d'Attention pour ÉTAPE 2
- Google Maps : Utiliser API key environnement
- Photos cabinet : Format WebP recommandé
- Lazy loading : Implémenter Intersection Observer

---

## 📞 Contact Projet
**Développeur :** CND - Web Is Yours  
**Dernière validation :** 26/09/2025 - ÉTAPE 1 ✅  
**Prochaine révision :** Après ÉTAPE 2

---

<div align="center">
  <strong>🚀 Développé avec ❤️ par CND - Web Is Yours</strong>
  <br>
  <em>Version 1.0 • Octobre 2025</em>
</div>