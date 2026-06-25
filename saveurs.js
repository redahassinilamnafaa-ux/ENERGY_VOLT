/* ============================================================
   VOLT. — Données produits "Saveurs" + rendu
   4 eaux vitaminées : PERFORMANCE · ANTIOXIDANT · IMMUNE · RELOAD
   ============================================================ */
window.VOLT_PRODUITS = [
  {
    id:"performance",
    nom:"PERFORMANCE",
    arome:"Ananas",
    accent:"#0057FF",
    img:"images/tropical-twist.webp",
    pos:"50% 22%",
    tagline:"Revigorez votre corps à chaque gorgée — riche en vitamines et minéraux essentiels, boostée au guarana.",
    tags:["Guarana naturel","0 sucre ajouté","Calcium + Magnésium"],
    bienfaits:[
      "Le <b>magnésium</b> et la <b>vitamine C</b> contribuent à réduire la fatigue et l'épuisement",
      "Contribue au fonctionnement normal du système immunitaire",
      "Contribue à la libération d'énergie dans le métabolisme",
      "Le <b>calcium</b> contribue au fonctionnement normal des muscles",
      "Aide à protéger les cellules contre le stress oxydatif",
      "Sans sucre ajouté — contient des sucres naturellement présents",
      "Arôme 100% naturel d'ananas"
    ],
    ingredients:"Inuline, vitamine C (acide ascorbique), calcium (citrate de calcium, lactate de calcium), citrate de magnésium, stabilisant : cellulose, arôme d'ananas (2 %), extrait de guarana (Paullinia cupana Kunth), édulcorant : glycosides de stéviol de stévia, mélange de vitamines B (thiamine, riboflavine, B6, B12, acide folique, D-pantothénate de calcium, nicotinamide).",
    nutrition:[
      ["Énergie","17 kcal / 72 kJ"],
      ["Matières grasses","0,004 g"],
      ["dont saturés","0,0025 g"],
      ["Glucides","3,7 g"],
      ["dont sucres","0,65 g"],
      ["Protéines","0,015 g"],
      ["Sel","0,001 g"]
    ],
    micros:[
      ["Vitamine C","500 mg","625%"],
      ["Vitamine B1","0,08 mg","7,5%"],
      ["Vitamine B2","0,1 mg","7,5%"],
      ["Vitamine B3","1,2 mg","7,5%"],
      ["Vitamine B5","0,45 mg","7,5%"],
      ["Vitamine B6","0,1 mg","7,5%"],
      ["Vitamine B9","15 µg","7,5%"],
      ["Vitamine B12","0,19 µg","7,5%"],
      ["Magnésium","28 mg","7,5%"],
      ["Calcium","72 mg","9%"]
    ],
    cafeine:true
  },
  {
    id:"antioxidant",
    nom:"ANTIOXIDANT",
    arome:"Citron & Orange",
    accent:"#F0922B",
    img:"images/citrus-burst.webp",
    pos:"50% 45%",
    tagline:"Profitez de la fraîcheur à chaque gorgée — pleine d'antioxydants, vitamine E, zinc et sélénium.",
    tags:["Antioxydants","Vitamine E + Zinc","0 sucre ajouté"],
    bienfaits:[
      "La <b>vitamine C</b> contribue à réduire la fatigue et l'épuisement",
      "Contribue au fonctionnement normal du système immunitaire",
      "Contribue à protéger les cellules contre le stress oxydatif",
      "Sans sucre ajouté — contient des sucres naturellement présents",
      "Uniquement des arômes naturels de citron et d'orange"
    ],
    ingredients:"Inuline, vitamine C (acide ascorbique), stabilisant : cellulose, arôme de citron (2 %), arôme d'orange (1 %), édulcorant : glycosides de stéviol issus de la stévia, gluconate de zinc, sélénite de sodium.",
    nutrition:[
      ["Énergie","13 kcal / 50 kJ"],
      ["Matières grasses","0,005 g"],
      ["dont saturés","0,003 g"],
      ["Glucides","0,3 g"],
      ["dont sucres","0,3 g"],
      ["Protéines","0,015 g"],
      ["Sel","0,001 g"],
      ["Fibres","4 g"]
    ],
    micros:[
      ["Vitamine C","250 mg","312%"],
      ["Vitamine E","0,9 mg","7%"],
      ["Zinc","0,7 mg","7%"],
      ["Sélénium","7,5 µg","14%"]
    ],
    cafeine:false
  },
  {
    id:"immune",
    nom:"IMMUNE SUPPORT",
    arome:"Fraise",
    accent:"#E5484D",
    img:"images/berry-boost.webp",
    pos:"50% 38%",
    tagline:"Soutenez votre système immunitaire à chaque gorgée — fraise, sureau, complexe B, zinc et sélénium.",
    tags:["Extrait de sureau","Complexe B + Zinc","0 sucre ajouté"],
    bienfaits:[
      "Contribue au fonctionnement normal du système immunitaire",
      "La <b>vitamine C</b> contribue à réduire la fatigue et l'épuisement",
      "Aide à protéger les cellules contre le stress oxydatif",
      "Sans sucre ajouté — contient des sucres naturellement présents",
      "Uniquement l'arôme naturel de fraise"
    ],
    ingredients:"Inuline, vitamine C (acide ascorbique), stabilisant : cellulose, arôme fraise (3 %), extrait de sureau (Sambucus nigra L.), édulcorant : glycosides de stéviol de stévia, complexe de vitamines B (B1, B2, B3, B5, B6, B9, B12), gluconate de zinc, sélénite de sodium.",
    nutrition:[
      ["Énergie","13 kcal / 51 kJ"],
      ["Matières grasses","0 g"],
      ["dont saturés","0 g"],
      ["Glucides","0,3 g"],
      ["dont sucres","0,3 g"],
      ["Protéines","0 g"],
      ["Sel","0,002 g"],
      ["Fibres","4 g"]
    ],
    micros:[
      ["Vitamine C","250 mg","312%"],
      ["Vitamine B1","0,1 mg","7,5%"],
      ["Vitamine B2","0,1 mg","7,5%"],
      ["Vitamine B3","1,2 mg","7,5%"],
      ["Vitamine B5","0,5 mg","7,5%"],
      ["Vitamine B6","0,1 mg","7,5%"],
      ["Vitamine B9","15 µg","7,5%"],
      ["Vitamine B12","0,19 µg","7,5%"],
      ["Zinc","0,7 mg","7%"],
      ["Sélénium","7,5 µg","14%"]
    ],
    cafeine:false
  },
  {
    id:"reload",
    nom:"RELOAD",
    arome:"Mangue",
    accent:"#F2B705",
    img:"images/tropical-twist.webp",
    pos:"30% 80%",
    tagline:"Découvrez la fraîcheur et savourez chaque gorgée — mangue, magnésium et zinc pour la récupération.",
    tags:["Magnésium + Zinc","Récupération","0 sucre ajouté"],
    bienfaits:[
      "Le <b>magnésium</b> et la <b>vitamine C</b> participent au fonctionnement du système immunitaire",
      "La <b>vitamine C</b> contribue au métabolisme énergétique normal",
      "Contribue à protéger les cellules contre le stress oxydatif",
      "Le <b>zinc</b> et la <b>vitamine C</b> contribuent au système immunitaire",
      "Sans sucre ajouté — contient des sucres naturellement présents",
      "Avec un arôme naturel de mangue"
    ],
    ingredients:"Inuline, vitamine C (acide ascorbique), citrate de magnésium, stabilisant : cellulose, arôme mangue (3 %), édulcorant : glycosides de stéviol de stévia, gluconate de zinc, complexe B (thiamine, riboflavine, B6, B12, acide folique, D-pantothénate de calcium, nicotinamide).",
    nutrition:[
      ["Énergie","18 kcal / 75 kJ"],
      ["Matières grasses","0,003 g"],
      ["dont saturés","0,003 g"],
      ["Glucides","4 g"],
      ["dont sucres","0,7 g"],
      ["Protéines","0,015 g"],
      ["Sel","0,001 g"]
    ],
    micros:[
      ["Vitamine C","500 mg","625%"],
      ["Vitamine B1","0,08 mg","7,5%"],
      ["Vitamine B2","0,1 mg","7,5%"],
      ["Vitamine B3","1,2 mg","7,5%"],
      ["Vitamine B5","0,45 mg","7,5%"],
      ["Vitamine B6","0,1 mg","7,5%"],
      ["Vitamine B9","15 µg","7,5%"],
      ["Vitamine B12","0,19 µg","7,5%"],
      ["Magnésium","28 mg","7,5%"],
      ["Zinc","0,7 mg","7%"]
    ],
    cafeine:false
  }
];

(function(){
  var wrap = document.getElementById('produits');
  if(!wrap) return;

  function vmix(hex,t,amt){hex=hex.replace('#','');var r=parseInt(hex.substr(0,2),16),g=parseInt(hex.substr(2,2),16),b=parseInt(hex.substr(4,2),16);var tr=(t>>16)&255,tg=(t>>8)&255,tb=t&255;r=Math.round(r+(tr-r)*amt);g=Math.round(g+(tg-g)*amt);b=Math.round(b+(tb-b)*amt);return '#'+[r,g,b].map(function(x){return ('0'+x.toString(16)).slice(-2)}).join('');}

  function voltCan(p,h){
    var a=p.accent, id=p.id||(p.nom||'').toLowerCase().replace(/[^a-z]/g,''), nom=p.nom;
    var bt=vmix(a,0xffffff,0.20), bb=vmix(a,0x000000,0.06);
    var FR={performance:'pineapple',antioxidant:'citrus',immune:'strawberry',reload:'mango'};
    var fr=FR[id]||'citrus';
    function fruit(t,x,y,s,r){
      var g='<g transform="translate('+x+' '+y+') scale('+s+') rotate('+(r||0)+')'+'">';
      if(t==='pineapple'){g+='<path d="M0 -30 L-6 -13 L-13 -23 L-9 -9 L-19 -15 L-10 -3 Z" fill="#36A85B"/><path d="M0 -30 L6 -13 L13 -23 L9 -9 L19 -15 L10 -3 Z" fill="#36A85B"/><path d="M0 -33 L-4 -7 L4 -7 Z" fill="#43C977"/><ellipse cx="0" cy="7" rx="16" ry="22" fill="#F4C234"/><path d="M-13 -3 L1 7 M-14 7 L2 19 M-3 -11 L13 1 M-5 3 L11 15" stroke="#D79A1F" stroke-width="1.3" fill="none" opacity=".55"/><ellipse cx="0" cy="7" rx="16" ry="22" fill="none" stroke="#D79A1F" stroke-width="1.4" opacity=".5"/>';}
      else if(t==='citrus'){g+='<circle r="20" fill="#EE8E2E"/><circle r="15.5" fill="#FFD79A"/><path d="M0 0 L0 -14 M0 0 L9.9 -9.9 M0 0 L14 0 M0 0 L9.9 9.9 M0 0 L0 14 M0 0 L-9.9 9.9 M0 0 L-14 0 M0 0 L-9.9 -9.9" stroke="#F2A94D" stroke-width="1.5"/><circle r="3" fill="#FFEAC6"/>';}
      else if(t==='strawberry'){g+='<path d="M0 17 C-14 8 -18 -5 -10 -12 C-4 -18 4 -18 10 -12 C18 -5 14 8 0 17 Z" fill="#E5484D"/><g fill="#FBD46B"><ellipse cx="-6" cy="-4" rx="1.5" ry="2.2"/><ellipse cx="2" cy="-6" rx="1.5" ry="2.2"/><ellipse cx="7" cy="-1" rx="1.5" ry="2.2"/><ellipse cx="-2" cy="2" rx="1.5" ry="2.2"/><ellipse cx="-8" cy="4" rx="1.5" ry="2.2"/><ellipse cx="4" cy="5" rx="1.5" ry="2.2"/><ellipse cx="0" cy="9" rx="1.5" ry="2.2"/></g><path d="M0 -10 L-9 -17 L-3 -11 L-10 -8 L-2 -8 L0 -16 L2 -8 L10 -8 L3 -11 L9 -17 Z" fill="#36A85B"/>';}
      else{g+='<path d="M-5 -16 C12 -19 21 -3 16 11 C12 22 -5 23 -13 12 C-21 1 -18 -13 -5 -16 Z" fill="#F4A93C"/><ellipse cx="-4" cy="-5" rx="11" ry="12" fill="#E8612C" opacity=".45"/><path d="M-5 -16 C-11 -23 -1 -26 4 -21 C0 -19 -3 -17 -5 -16 Z" fill="#36A85B"/>';}
      return g+'</g>';
    }
    return '<div class="vcan" style="height:'+h+'px;--acc:'+a+'">'+
      '<span class="b b1"></span><span class="b b2"></span><span class="b b3"></span>'+
      '<svg class="vcan-svg" viewBox="0 0 300 470" xmlns="http://www.w3.org/2000/svg">'+
        '<defs>'+
          '<linearGradient id="bd-'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+bt+'"/><stop offset="1" stop-color="'+bb+'"/></linearGradient>'+
          '<clipPath id="bc-'+id+'"><rect x="96" y="104" width="108" height="296" rx="34"/></clipPath>'+
        '</defs>'+
        '<ellipse cx="150" cy="432" rx="66" ry="12" fill="rgba(10,15,30,.10)"/>'+
        fruit(fr,66,254,1.4,-12)+
        '<rect x="132" y="84" width="36" height="26" rx="4" fill="#1B2236"/>'+
        '<rect x="126" y="62" width="48" height="26" rx="9" fill="#26314C"/>'+
        '<rect x="145" y="48" width="10" height="16" rx="3" fill="#26314C"/>'+
        '<rect x="96" y="104" width="108" height="296" rx="34" fill="url(#bd-'+id+')" stroke="rgba(10,15,30,.08)"/>'+
        '<g clip-path="url(#bc-'+id+')"><rect x="110" y="126" width="14" height="250" rx="7" fill="rgba(255,255,255,.30)"/><rect x="128" y="126" width="6" height="250" rx="3" fill="rgba(255,255,255,.18)"/></g>'+
        '<rect x="100" y="202" width="100" height="86" rx="9" fill="#ffffff" opacity="0.96"/>'+
        fruit(fr,150,221,0.44,0)+
        '<text x="150" y="251" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="900" font-size="23" letter-spacing="-0.5" fill="#0A0F1E">VOLT<tspan fill="'+a+'">.</tspan></text>'+
        '<rect x="126" y="259" width="48" height="3.5" rx="1.75" fill="'+a+'"/>'+
        '<text x="150" y="278" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="800" font-size="13" letter-spacing="0.4" fill="'+a+'" textLength="80" lengthAdjust="spacingAndGlyphs">'+nom+'</text>'+
        fruit(fr,232,150,1.15,10)+
        fruit(fr,226,356,1.0,16)+
      '</svg>'+
    '</div>';
  }

  var html = window.VOLT_PRODUITS.map(function(p,i){
    var rev = i % 2 === 1;
    var bullets = p.bienfaits.map(function(b){
      return '<li><span class="pc-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span><span>'+b+'</span></li>';
    }).join('');
    var tags = p.tags.map(function(t){ return '<span class="pc-tag">'+t+'</span>'; }).join('');
    var note = p.note ? '<div class="pc-rate"><span class="stars">★★★★★</span><b>'+p.note+'</b><i>'+p.avis+'</i></div>' : '';
    var nutri = p.nutrition.map(function(r){
      var sub = r[0].indexOf('dont')===0;
      return '<tr'+(sub?' class="sub"':'')+'>  <td>'+r[0]+'</td><td>'+r[1]+'</td></tr>';
    }).join('');
    var micros = p.micros.map(function(r){
      var pct = parseFloat(String(r[2]).replace(',','.'));
      var w = Math.min(100, pct);
      return '<tr><td>'+r[0]+'</td><td class="amt">'+r[1]+'</td><td class="nrv"><div class="bar"><i style="width:'+w+'%"></i></div><span>'+r[2]+'</span></td></tr>';
    }).join('');
    var cafeine = p.cafeine ? '<div class="pc-caf">⚡ Contient de la caféine (guarana) — déconseillé aux enfants et aux femmes enceintes ou allaitantes. À consommer avec modération ; ne pas dépasser la dose journalière recommandée. Une consommation excessive peut avoir un effet laxatif (inuline). À tenir hors de portée des jeunes enfants.</div>' : '';
    return ''+
    '<article class="pcard reveal" id="'+p.id+'" style="--acc:'+p.accent+'">'+
      '<div class="pcard-in'+(rev?' rev':'')+'">'+
        '<div class="pcard-media">'+
          '<div class="pc-strip"></div>'+
          voltCan(p,520)+
          '<div class="pc-arome">'+p.arome+'</div>'+
        '</div>'+
        '<div class="pcard-body">'+
          '<div class="pc-eyebrow">Eau vitaminée</div>'+
          '<h2 class="pc-name">VOLT. <em>'+p.nom+'</em></h2>'+
          note+
          '<p class="pc-tag-line">'+p.tagline+'</p>'+
          '<div class="pc-tags">'+tags+'</div>'+
          '<ul class="pc-bullets">'+bullets+'</ul>'+
          cafeine+
          '<div class="pc-acc">'+
            '<details class="pc-det"><summary><span>Ingrédients</span><span class="chev">+</span></summary><p class="pc-ing">'+p.ingredients+'</p></details>'+
            '<details class="pc-det"><summary><span>Valeurs nutritionnelles</span><span class="chev">+</span></summary>'+
              '<div class="pc-tables">'+
                '<table class="pc-tbl"><thead><tr><th>Pour une portion</th><th>5 g / 350 mL</th></tr></thead><tbody>'+nutri+'</tbody></table>'+
                '<table class="pc-tbl micro"><thead><tr><th>Vitamines & minéraux</th><th>Quantité</th><th>% VNR*</th></tr></thead><tbody>'+micros+'</tbody></table>'+
                '<p class="pc-foot">*VNR = Valeur Nutritionnelle de Référence. Édulcoré aux glycosides de stéviol (stévia).</p>'+
              '</div>'+
            '</details>'+
          '</div>'+
          '<a href="le-test.html" class="pc-link">Cette saveur est-elle faite pour toi ? Fais le test →</a>'+
        '</div>'+
      '</div>'+
    '</article>';
  }).join('');
  wrap.innerHTML = html;
})();