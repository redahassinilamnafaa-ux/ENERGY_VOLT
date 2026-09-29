/* ============================================================
   VOLT. — Source de données unique : saveurs
   Ingrédients et valeurs nutritionnelles traduits depuis les
   fiches officielles du fournisseur (allemand) — à faire valider
   par VOLT. avant publication (mentions réglementées CH/UE).
   Ne jamais exposer de nom/référence fournisseur dans ce fichier
   (il est chargé côté client, donc public).
   Une saveur sans "complete: true" n'apparaît pas en production.
   ============================================================ */
window.VOLT_SAVEURS = [
  {
    id: "iced-tea-lemon",
    slug: "iced-tea-lemon",
    nom: "Iced Tea Lemon",
    arome: "Thé glacé citron",
    couleurPrincipale: "#D9A331",
    couleurSecondaire: "#8C6A1F",
    image: null,
    accroche: "Le classique thé glacé au citron, sans sucre.",
    ingredients: "Eau, acidifiant (acide citrique), édulcorants (cyclamate, acésulfame K, saccharine), colorant (caramel au sulfite d'ammonium : contient des sulfites), arôme naturel, 1,4 % extrait de thé, 1 % jus de citron à base de concentré de jus de citron, sel, fructose, épaississant (gomme xanthane), niacine, conservateur (sorbate de potassium), vitamine B6, mononitrate de thiamine.",
    allergenes: ["Sulfites"],
    valeursNutritionnelles: {
      unite: "pour 100 ml de concentré",
      energie: "146 kJ / 34 kcal",
      matieresGrasses: "< 0,5 g",
      dontSaturees: "< 0,1 g",
      glucides: "1,1 g",
      dontSucres: "0,9 g",
      proteines: "< 0,1 g",
      sel: "1,1 g",
      vitamines: [
        { nom: "Thiamine (B1)", valeur: "6,6 mg", vnr: "600%" },
        { nom: "Niacine", valeur: "96,0 mg", vnr: "600%" },
        { nom: "Vitamine B6", valeur: "8,4 mg", vnr: "600%" }
      ],
      portion: {
        base: "1 portion = 3,75 ml de concentré pour 300 ml d'eau (1:80)",
        energie: "5 kJ / 1 kcal",
        glucides: "< 0,5 g",
        dontSucres: "< 0,5 g",
        sel: "< 0,04 g"
      }
    },
    badges: { vegan: true, vegetarien: true, sansLactose: true, sansGluten: true, bio: false },
    complete: true
  },
  {
    id: "multifruit",
    slug: "multifruit",
    nom: "Multi Fruit",
    arome: "Mangue, orange, pêche, pomme",
    couleurPrincipale: "#E8722A",
    couleurSecondaire: "#96450F",
    image: null,
    accroche: "Un mélange multifruits gourmand, zéro sucre.",
    ingredients: "Eau, acidifiant (acide citrique), arôme, 2 % jus multifruits à base de concentré de jus de fruits (mangue, orange, pêche, pomme), édulcorants (cyclamate de sodium, acésulfame K, saccharine), colorants (anthocyanes, riboflavine), sel, fructose, épaississant (gomme xanthane), nicotinamide, conservateur (sorbate de potassium), chlorhydrate de pyridoxine, mononitrate de thiamine.",
    allergenes: [],
    valeursNutritionnelles: {
      unite: "pour 100 ml de concentré",
      energie: "195 kJ / 45 kcal",
      matieresGrasses: "< 0,5 g",
      dontSaturees: "< 0,1 g",
      glucides: "4,7 g",
      dontSucres: "0,8 g",
      proteines: "< 0,5 g",
      sel: "0,99 g",
      vitamines: [
        { nom: "Thiamine (B1)", valeur: "6,60 mg", vnr: "600%" },
        { nom: "Niacine", valeur: "96,00 mg", vnr: "600%" },
        { nom: "Vitamine B6", valeur: "8,40 mg", vnr: "600%" }
      ],
      portion: {
        base: "1 portion = 3,75 ml de concentré pour 300 ml d'eau (1:80)",
        energie: "7 kJ / 2 kcal",
        glucides: "< 0,5 g",
        dontSucres: "< 0,5 g",
        sel: "< 0,04 g"
      }
    },
    badges: { vegan: true, vegetarien: true, sansLactose: true, sansGluten: true, bio: false },
    complete: true
  },
  {
    id: "peche-passion",
    slug: "peche-passion",
    nom: "Peach Passion Fruit",
    arome: "Pêche et fruit de la passion",
    couleurPrincipale: "#E06B45",
    couleurSecondaire: "#96402A",
    image: null,
    accroche: "Pêche et fruit de la passion, duo solaire.",
    ingredients: "Eau, acidifiant (acide citrique), édulcorants (cyclamate, acésulfame K, saccharine), arôme, 1 % jus de fruit de la passion à base de concentré, 1 % jus de pêche à base de concentré, sel, fructose, épaississant (gomme xanthane), colorant (bêta-carotène), niacine, stabilisant (ester glycérique de résine de bois, gomme arabique), conservateur (sorbate de potassium), vitamine B6, mononitrate de thiamine.",
    allergenes: [],
    valeursNutritionnelles: {
      unite: "pour 100 ml de concentré",
      energie: "206 kJ / 48 kcal",
      matieresGrasses: "< 0,5 g",
      dontSaturees: "< 0,1 g",
      glucides: "2,2 g",
      dontSucres: "0,7 g",
      proteines: "< 0,5 g",
      sel: "1,0 g",
      vitamines: [
        { nom: "Thiamine (B1)", valeur: "6,6 mg", vnr: "600%" },
        { nom: "Niacine", valeur: "96,0 mg", vnr: "600%" },
        { nom: "Vitamine B6", valeur: "8,4 mg", vnr: "600%" }
      ],
      portion: {
        base: "1 portion = 3,75 ml de concentré pour 300 ml d'eau (1:80)",
        energie: "8 kJ / 2 kcal",
        glucides: "< 0,5 g",
        dontSucres: "< 0,5 g",
        sel: "< 0,04 g"
      }
    },
    badges: { vegan: true, vegetarien: true, sansLactose: true, sansGluten: true, bio: false },
    complete: true
  },
  {
    id: "cassis",
    slug: "cassis",
    nom: "Blackcurrant",
    arome: "Cassis",
    couleurPrincipale: "#4B2059",
    couleurSecondaire: "#26102E",
    image: null,
    accroche: "Cassis intense, pour les envies corsées.",
    ingredients: "Eau, acidifiant (acide citrique), aliment colorant (concentré de carotte noire, concentré de myrtille, concentré de carotte), édulcorants (cyclamate, acésulfame K, saccharine), colorants (caramel au sulfite d'ammonium : contient des sulfites, bleu brillant FCF), 1 % jus de cassis à base de concentré de jus de cassis, arôme, sel, fructose, épaississant (gomme xanthane), niacine, conservateur (sorbate de potassium), vitamine B6, mononitrate de thiamine.",
    allergenes: ["Sulfites"],
    valeursNutritionnelles: {
      unite: "pour 100 ml de concentré",
      energie: "167 kJ / 39 kcal",
      matieresGrasses: "< 0,5 g",
      dontSaturees: "< 0,1 g",
      glucides: "1,9 g",
      dontSucres: "1,6 g",
      proteines: "< 0,5 g",
      sel: "1,1 g",
      vitamines: [
        { nom: "Thiamine (B1)", valeur: "6,6 mg", vnr: "600%" },
        { nom: "Niacine", valeur: "96,0 mg", vnr: "600%" },
        { nom: "Vitamine B6", valeur: "8,4 mg", vnr: "600%" }
      ],
      portion: {
        base: "1 portion = 3,75 ml de concentré pour 300 ml d'eau (1:80)",
        energie: "6 kJ / 1 kcal",
        glucides: "< 0,5 g",
        dontSucres: "< 0,5 g",
        sel: "< 0,04 g"
      }
    },
    badges: { vegan: true, vegetarien: true, sansLactose: true, sansGluten: true, bio: false },
    complete: true
  },
  {
    id: "fruits-des-bois",
    slug: "fruits-des-bois",
    nom: "Forest Fruit",
    arome: "Framboise et sureau",
    couleurPrincipale: "#7A1F3D",
    couleurSecondaire: "#3F0F1F",
    image: null,
    accroche: "Fruits des bois, framboise et sureau.",
    ingredients: "Eau, acidifiant (acide citrique), édulcorants (acésulfame K, cyclamate, saccharine), arôme, aliment colorant (concentré de carotte noire), sel, fructose, 0,5 % jus de framboise à base de concentré, 0,5 % jus de sureau à base de concentré, épaississant (gomme xanthane), niacine, conservateur (sorbate de potassium), vitamine B6, mononitrate de thiamine.",
    allergenes: [],
    valeursNutritionnelles: {
      unite: "pour 100 ml de concentré",
      energie: "166 kJ / 39 kcal",
      matieresGrasses: "< 0,5 g",
      dontSaturees: "< 0,1 g",
      glucides: "2,7 g",
      dontSucres: "1,0 g",
      proteines: "< 0,5 g",
      sel: "1,0 g",
      vitamines: [
        { nom: "Thiamine (B1)", valeur: "6,6 mg", vnr: "600%" },
        { nom: "Niacine", valeur: "96,0 mg", vnr: "600%" },
        { nom: "Vitamine B6", valeur: "8,4 mg", vnr: "600%" }
      ],
      portion: {
        base: "1 portion = 3,75 ml de concentré pour 300 ml d'eau (1:80)",
        energie: "6 kJ / 1 kcal",
        glucides: "< 0,5 g",
        dontSucres: "< 0,5 g",
        sel: "0,04 g"
      }
    },
    badges: { vegan: true, vegetarien: true, sansLactose: true, sansGluten: true, bio: false },
    complete: true
  },
  {
    id: "pasteque",
    slug: "pasteque",
    nom: "Watermelon",
    arome: "Pastèque",
    couleurPrincipale: "#D62B4C",
    couleurSecondaire: "#7A0F26",
    image: null,
    accroche: "Pastèque fraîche, désaltérante.",
    ingredients: "Eau, acidifiant (acide citrique), arôme, édulcorants (cyclamate, acésulfame K, saccharine), 1 % jus de pastèque à base de concentré, colorants (anthocyanes, riboflavine), sel, fructose, épaississant (gomme xanthane), antimoussant (mono- et diglycérides d'acides gras alimentaires), niacine, conservateur (sorbate de potassium), vitamine B6, mononitrate de thiamine.",
    allergenes: [],
    valeursNutritionnelles: {
      unite: "pour 100 ml de concentré",
      energie: "305 kJ / 72 kcal",
      matieresGrasses: "< 0,5 g",
      dontSaturees: "0,1 g",
      glucides: "2,9 g",
      dontSucres: "0,7 g",
      proteines: "< 0,5 g",
      sel: "0,99 g",
      vitamines: [
        { nom: "Thiamine (B1)", valeur: "6,6 mg", vnr: "600%" },
        { nom: "Niacine", valeur: "96,0 mg", vnr: "600%" },
        { nom: "Vitamine B6", valeur: "8,4 mg", vnr: "600%" }
      ],
      portion: {
        base: "1 portion = 3,6 ml de concentré pour 300 ml d'eau (1:80)",
        energie: "11 kJ / 3 kcal",
        glucides: "< 0,5 g",
        dontSucres: "< 0,5 g",
        sel: "< 0,04 g"
      }
    },
    badges: { vegan: true, vegetarien: true, sansLactose: true, sansGluten: true, bio: false },
    complete: true
  }
];
