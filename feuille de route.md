# 🗺️ Feuille de Route - Site Ergothérapeute

## 📋 État Actuel du Projet
**Version :** 1.0 en cours de finalisation  
**Statut :** 25 tâches identifiées suite à réunion du 26/09/2025  
**Priorité :** Corrections textuelles et visuelles + refonte formulaire contact  

---

## 🎯 ÉTAPE 1 - Page Accueil (Priorité Haute)
**Durée estimée :** 2h  
**Complexité :** ⭐⭐

### Tâches
- [ ] Remplacer image hero par plaque d'immatriculation
- [ ] Repositionner logo en haut à gauche  
- [ ] Modifier bouton CTA pour redirection vers Contact

### Livrables
- Image optimisée intégrée
- CSS mis à jour pour positionnement logo
- JavaScript navigation modifié

**Commandes Git :**
```bash
git add index.html style.css images/
git commit -m "feat: mise à jour page accueil - image plaque + repositionnement logo"
```

---

## 🎯 ÉTAPE 2 - Page Cabinet (Priorité Haute) 
**Durée estimée :** 3h  
**Complexité :** ⭐⭐⭐

### Tâches
- [ ] Changer "Localisation" → "Accès"
- [ ] Ajouter adresse complète Maison de Santé
- [ ] Intégrer infos accessibilité PMR + parking
- [ ] Embed Google Maps
- [ ] Modifier consultations → "mardi et mercredi uniquement"
- [ ] Modifier domicile → "Personnes âgées - Évaluation, aide technique"
- [ ] Supprimer "Habiletés visuelles" des spécialités
- [ ] Ajouter photos cabinet (3 images)

### Livrables
- Section Cabinet complètement mise à jour
- Google Maps intégré
- Photos cabinet intégrées avec lazy loading

**Commandes Git :**
```bash
git add index.html style.css images/cabinet/
git commit -m "feat: refonte page cabinet - accès, horaires, photos"
```

---

## 🎯 ÉTAPE 3 - Formulaire Contact (Priorité Critique)
**Durée estimée :** 4h  
**Complexité :** ⭐⭐⭐⭐⭐

### Nouvelle Structure Formulaire
**3 Parties distinctes :**
1. **Parents :** Nom/Prénom, Email, Téléphone
2. **Enfant :** Nom/Prénom enfant, Date naissance, Classe/École
3. **Demande :** Champ libre + exemples

### Tâches Techniques  
- [ ] Refactoring complet HTML formulaire
- [ ] Mise à jour CSS pour nouvelle structure
- [ ] Modification JavaScript validation
- [ ] Update template EmailJS avec nouveaux champs
- [ ] Tests validation multi-étapes

### Livrables
- Formulaire 3 parties fonctionnel
- Validation JavaScript adaptée
- Template EmailJS configuré
- Tests envoi email validés

**Commandes Git :**
```bash
git add index.html style.css script.js
git commit -m "feat: refonte formulaire contact - structure 3 parties + validation"
```

---

## 🎯 ÉTAPE 4 - Pages Mineures (Priorité Moyenne)
**Durée estimée :** 2h  
**Complexité :** ⭐⭐

### Page Profession
- [ ] Créer carrousel 2-3 images interventions
- [ ] Intégrer images enfants + personnes âgées + stimulation cognitive

### Page Formation  
- [ ] Inverser ordre chronologique des dates
- [ ] Ajouter formation 2025-2026 (en cours)

### Page Tarifs
- [ ] Ajouter "(sous condition)" séances domicile/école
- [ ] Supprimer "Intervention en milieu naturel"
- [ ] Restructurer services principaux/complémentaires
- [ ] Modifier textes remboursement et paiement échelonné

**Commandes Git :**
```bash
git add index.html style.css script.js
git commit -m "feat: mise à jour pages profession, formation, tarifs"
```

---

## 📊 Récapitulatif Planning

| Étape | Durée | Complexité | Priorité |
|-------|-------|------------|----------|
| Accueil | 2h | ⭐⭐ | Haute |
| Cabinet | 3h | ⭐⭐⭐ | Haute |
| Contact | 4h | ⭐⭐⭐⭐⭐ | Critique |
| Pages mineures | 2h | ⭐⭐ | Moyenne |

**Total estimé :** 11h de développement

---

## 🚀 Prochaine Action
**DÉMARRER ÉTAPE 1** - Page Accueil  
Attente validation avant passage étape suivante

---
*Développé avec ❤️ par CND - Web Is Yours*