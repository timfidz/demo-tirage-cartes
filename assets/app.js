// Tirages de cartes : démonstration statique.
// Les interprétations sont rédigées à l'avance pour trois combinaisons par tirage ;
// dans l'outil livré, elles sont rédigées par l'IA à chaque tirage, à partir des fiches et des consignes.
(() => {
  const $ = (s) => document.querySelector(s)
  const CLE = "demo-tirage-cartes-v1"
  const lire = () => {
    try {
      return JSON.parse(localStorage.getItem(CLE)) || {}
    } catch {
      return {}
    }
  }
  const ecrire = (v) => {
    try {
      localStorage.setItem(CLE, JSON.stringify(v))
    } catch {}
  }

  // ---- Les cartes (inventées) : famille ou arcane, emblème, texte de référence
  const CARTES = {
    lanterne: { nom: "La Lanterne", famille: "Révélateurs", embleme: "flamme", texte: "Elle éclaire ce que vous n'osiez pas regarder. Une vérité simple, déjà là, attend d'être vue sans jugement." },
    miroir: { nom: "Le Miroir", famille: "Révélateurs", embleme: "cercle", texte: "Ce que vous reprochez aux autres parle aussi de vous. Le miroir invite à reconnaître une part de soi laissée de côté." },
    cle: { nom: "La Clé", famille: "Révélateurs", embleme: "cle", texte: "Une porte que vous croyiez fermée ne l'est pas. Il manquait une question, pas une force." },
    racine: { nom: "La Racine", famille: "Ressources", embleme: "racine", texte: "Vos origines, vos appuis, les personnes qui vous ont fait tenir. Ce qui vous ancre vous porte aussi." },
    flamme: { nom: "La Flamme", famille: "Ressources", embleme: "flamme", texte: "Le désir qui ne s'éteint pas. Petit ou grand, il indique la direction." },
    puits: { nom: "Le Puits", famille: "Ressources", embleme: "goutte", texte: "Une réserve profonde, faite de ce que vous avez traversé. Vous y puisez plus que vous ne le croyez." },
    pont: { nom: "Le Pont", famille: "Médiateurs", embleme: "arche", texte: "Ce qui relie deux rives : un geste, une parole, une décision. Il se construit des deux côtés." },
    messager: { nom: "Le Messager", famille: "Médiateurs", embleme: "etoile", texte: "Une information, une rencontre, un signe qui arrive au bon moment, à condition de l'écouter." },
    main: { nom: "La Main tendue", famille: "Médiateurs", embleme: "coeur", texte: "Accepter l'aide, ou aider à son tour. Personne ne traverse seul." },
    etoile: { nom: "L'Étoile", famille: "Arcane XVII", embleme: "etoile", texte: "Espoir, confiance retrouvée, générosité. Après l'épreuve, la source coule de nouveau." },
    pendu: { nom: "Le Pendu", famille: "Arcane XII", embleme: "sablier", texte: "Suspension, lâcher-prise, changement de regard. Ce qui semble bloqué invite à voir autrement." },
    chariot: { nom: "Le Chariot", famille: "Arcane VII", embleme: "roue", texte: "Mouvement, volonté, maîtrise. Avancer en tenant ensemble des forces contraires." },
    lune: { nom: "La Lune", famille: "Arcane XVIII", embleme: "lune", texte: "Émotions, intuition, incertitude. Tout n'est pas clair, et ce n'est pas un danger." },
    force: { nom: "La Force", famille: "Arcane XI", embleme: "coeur", texte: "La douceur qui apaise, le courage tranquille. La vraie force ne force pas." },
    soleil: { nom: "Le Soleil", famille: "Arcane XIX", embleme: "soleil", texte: "Clarté, joie, relations simples et chaleureuses. Ce qui était confus devient évident." },
    ermite: { nom: "L'Ermite", famille: "Arcane IX", embleme: "flamme", texte: "Recul, sagesse, recherche intérieure. La lanterne éclaire le pas suivant, pas toute la route." },
    roue: { nom: "La Roue de Fortune", famille: "Arcane X", embleme: "roue", texte: "Cycles, changements, opportunités. Ce qui tourne apporte aussi du nouveau." },
    imperatrice: { nom: "L'Impératrice", famille: "Arcane III", embleme: "fleur", texte: "Créativité, expression, fécondité. Donner forme à ce qui mûrit en vous." },
  }

  // ---- Les tirages : positions, consignes par défaut, combinaisons préparées
  const TIRAGES = {
    heros: {
      titre: "Les Héros cachés",
      presentation: "Une carte dans chacune des trois familles : Révélateurs, Ressources, Médiateurs. L'IA relie les trois cartes en une seule histoire.",
      positions: ["Révélateur", "Ressource", "Médiateur"],
      consignes:
        "Tu interprètes un tirage « Les Héros cachés » : une carte Révélateur, une carte Ressource, une carte Médiateur. Appuie-toi uniquement sur les fiches des cartes fournies. Relie les trois cartes en une histoire cohérente, dans l'esprit « réécrire son histoire ». Vouvoie la personne, avec douceur, sans prédiction. Termine par une affirmation positive à la première personne, puis une phrase message. Entre 180 et 250 mots.",
      combinaisons: [
        {
          cartes: ["lanterne", "racine", "pont"],
          texte: [
            "Votre histoire commence par un éclairage. La Lanterne met en lumière quelque chose que vous saviez déjà sans vous l'avouer. Ce n'est pas un reproche : c'est une invitation à regarder calmement ce qui est là.",
            "Pour avancer avec cette vérité, vous n'êtes pas sans appui. La Racine vous rappelle d'où vous venez : les personnes, les lieux et les épreuves qui vous ont fait tenir. Ce socle ne vous retient pas en arrière, il vous permet de rester debout face à ce que la Lanterne révèle.",
            "Reste le passage. Le Pont dit qu'entre ce que vous voyez maintenant et ce que vous voulez vivre, il y a un geste à poser : une parole, un appel, une décision. Il se construit des deux côtés : vous n'avez pas à tout porter.",
            "Réécrire votre histoire, ici, c'est oser regarder, s'appuyer sur ses racines, puis faire le premier pas sur le pont.",
          ],
          affirmation: "Je regarde ce qui est là, et je m'appuie sur ce qui me porte.",
          message: "Le premier pas suffit : le pont se construit en marchant.",
        },
        {
          cartes: ["miroir", "flamme", "messager"],
          texte: [
            "Le Miroir ouvre votre tirage avec une question délicate : ce qui vous agace chez les autres en ce moment dit peut-être quelque chose de vous. Pas un défaut à corriger, plutôt une part de vous mise de côté, qui demande à revenir.",
            "La Flamme montre ce que cette part contient : un désir resté vivant. Même discret, il n'a jamais cessé de brûler. C'est lui qui donne la direction, plus que la raison ou la peur.",
            "Le Messager relie les deux. Une rencontre, une conversation ou un signe va vous tendre ce miroir de nouveau, sous une forme plus douce. Si vous l'écoutez sans vous défendre, il vous montrera comment rendre à ce désir la place qu'il mérite.",
            "Votre histoire se réécrit en accueillant ce que le miroir montre, pour laisser la flamme éclairer le chemin.",
          ],
          affirmation: "J'accueille ce que je vois en moi, et je laisse mon désir me guider.",
          message: "Écoutez ce qui revient : c'est souvent ce qui compte.",
        },
        {
          cartes: ["cle", "puits", "main"],
          texte: [
            "La Clé apporte une bonne nouvelle : la porte que vous pensiez fermée ne l'est pas. Ce qui vous a manqué jusqu'ici n'est pas le courage, c'est une question juste. Laquelle vous poseriez-vous si vous saviez que la réponse peut être oui ?",
            "Le Puits vous montre où chercher : en vous, dans ce que vous avez déjà traversé. Vos expériences, même difficiles, ont rempli une réserve profonde. Vous savez déjà faire plus que vous ne le pensez.",
            "La Main tendue complète le tableau : cette porte ne s'ouvre pas forcément seule. Accepter une aide, demander un conseil ou proposer le vôtre à quelqu'un fait partie du chemin. Ce n'est pas un aveu de faiblesse.",
            "Votre histoire change de chapitre quand vous posez la bonne question, puisez dans vos ressources et acceptez qu'on vous accompagne.",
          ],
          affirmation: "J'ai en moi ce qu'il faut pour ouvrir cette porte, et j'accepte qu'on m'accompagne.",
          message: "Une bonne question ouvre plus de portes que la force.",
        },
      ],
    },
    tarot: {
      titre: "Le tarot",
      presentation: "Trois cartes, trois positions : la situation, le défi, le conseil. L'IA lit chaque carte à sa place, puis la façon dont elles se répondent.",
      positions: ["Situation", "Défi", "Conseil"],
      consignes:
        "Tu interprètes un tirage de trois cartes du tarot : Situation, Défi, Conseil. Appuie-toi uniquement sur les fiches des cartes fournies et sur le sens de chaque position. Explique comment les cartes se répondent. Vouvoie la personne, sans prédiction ni fatalité. Entre 180 et 250 mots.",
      combinaisons: [
        {
          cartes: ["etoile", "pendu", "chariot"],
          texte: [
            "En situation, L'Étoile indique que vous sortez d'une période difficile : la confiance revient, doucement, et vous êtes de nouveau capable de donner. C'est une base solide pour la suite.",
            "Le défi, c'est Le Pendu. Quelque chose semble à l'arrêt, une situation qui n'avance pas comme vous le voudriez. La carte ne dit pas d'attendre sans rien faire : elle invite à changer d'angle et à regarder la question autrement.",
            "Le conseil, Le Chariot, répond au Pendu : une fois le regard changé, remettez-vous en mouvement, avec décision. L'Étoile vous en donne l'élan, le Chariot vous demande de tenir les rênes.",
            "Ensemble, ces trois cartes racontent un passage : de l'espoir retrouvé à l'action, par un changement de regard nécessaire.",
          ],
        },
        {
          cartes: ["lune", "force", "soleil"],
          texte: [
            "La Lune, en situation, décrit une période où tout n'est pas clair. Vos émotions sont vives, votre intuition travaille, et vous avancez sans voir toute la route. Ce flou n'est pas un danger en soi.",
            "Le défi, La Force, vous demande de traverser cette période avec douceur plutôt qu'avec contrôle. Vouloir tout comprendre tout de suite nourrirait l'inquiétude ; la Force propose le courage tranquille de rester là, calmement, sans forcer.",
            "Le conseil, Le Soleil, montre où mène ce chemin : vers la clarté, et vers des relations simples et chaleureuses. Cherchez la lumière dans ce qui est simple, une conversation franche, un moment partagé.",
            "Le tirage va de la nuit au jour : la douceur de la Force fait le lien entre les doutes de la Lune et l'évidence du Soleil.",
          ],
        },
        {
          cartes: ["ermite", "roue", "imperatrice"],
          texte: [
            "L'Ermite, en situation, vous montre en retrait, en recherche. Vous avez besoin de temps pour comprendre ce que vous voulez vraiment. Sa lanterne n'éclaire que le pas suivant, et c'est suffisant.",
            "Le défi, La Roue de Fortune, annonce que les choses bougent autour de vous, peut-être plus vite que votre réflexion. La difficulté sera de ne pas rester à l'écart trop longtemps quand une occasion se présente.",
            "Le conseil, L'Impératrice, vous invite à passer de la réflexion à l'expression : donnez forme à ce qui a mûri pendant ce temps de retrait, un projet, une parole, une création.",
            "Ensemble, les trois cartes disent que ce temps de recul a été fécond. La roue tourne : c'est le moment de faire naître ce que vous avez porté.",
          ],
        },
      ],
    },
  }

  // ---- Emblèmes des cartes, dessinés en traits simples (les vraies cartes portent vos visuels)
  const EMBLEMES = {
    flamme: '<path d="M50 18c10 14 18 22 18 36a18 18 0 0 1-36 0c0-8 4-14 8-18 0 8 4 12 8 12-2-10 0-20 2-30z"/>',
    cercle: '<circle cx="50" cy="50" r="24"/><circle cx="50" cy="50" r="14"/>',
    cle: '<circle cx="38" cy="38" r="13"/><path d="M47 47l26 26M62 62l8-8M68 68l6-6"/>',
    racine: '<path d="M50 20v34M50 54c-6 8-16 12-22 22M50 54c6 8 16 12 22 22M50 54v26M36 36c6 4 10 6 14 6s8-2 14-6"/>',
    goutte: '<path d="M50 20c12 18 20 28 20 40a20 20 0 0 1-40 0c0-12 8-22 20-40z"/><path d="M42 62a8 8 0 0 0 8 8"/>',
    arche: '<path d="M18 70h64M24 70c0-18 12-30 26-30s26 12 26 30M36 70V52M64 70V52M50 70V40"/>',
    etoile: '<path d="M50 18l8 20 22 2-17 14 5 21-18-11-18 11 5-21-17-14 22-2z"/>',
    coeur: '<path d="M50 76S22 58 22 40a14 14 0 0 1 28-4 14 14 0 0 1 28 4c0 18-28 36-28 36z"/>',
    sablier: '<path d="M32 20h36M32 80h36M36 20c0 16 28 20 28 30S36 64 36 80M64 20c0 16-28 20-28 30s28 14 28 30"/>',
    roue: '<circle cx="50" cy="50" r="26"/><circle cx="50" cy="50" r="6"/><path d="M50 24v52M24 50h52M32 32l36 36M68 32L32 68"/>',
    lune: '<path d="M58 22a28 28 0 1 0 0 56 22 22 0 1 1 0-56z"/>',
    soleil: '<circle cx="50" cy="50" r="14"/><path d="M50 18v10M50 72v10M18 50h10M72 50h10M28 28l7 7M65 65l7 7M28 72l7-7M65 35l7-7"/>',
    fleur: '<circle cx="50" cy="44" r="7"/><path d="M50 37c-4-12 4-18 0-18s4 6 0 18M57 44c12-4 18 4 18 0s-6 4-18 0M43 44c-12-4-18 4-18 0s6 4 18 0M50 51c-4 12 4 18 0 18"/><path d="M50 58v22M50 72c-6-4-12-4-16 0M50 72c6-4 12-4 16 0"/>',
  }

  // ---- Ce que la personne a pu modifier dans « Ce que vous modifiez vous-même »
  let sauvegarde = lire()
  const texteCarte = (id) => (sauvegarde.cartes && sauvegarde.cartes[id]) || CARTES[id].texte
  const consignes = (t) => (sauvegarde.consignes && sauvegarde.consignes[t]) || TIRAGES[t].consignes

  let tirage = "heros"
  const rang = { heros: -1, tarot: -1 }
  const calme = matchMedia("(prefers-reduced-motion: reduce)").matches

  const carteHtml = (id, position, i) => {
    const c = CARTES[id]
    return `<li class="carte" style="--i:${i}">
      <div class="carte-interieur">
        <div class="face dos" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="M50 22l6 16 17 1-13 11 4 17-14-9-14 9 4-17-13-11 17-1z"/></svg></div>
        <div class="face recto">
          <span class="famille">${c.famille}</span>
          <svg viewBox="0 0 100 100" aria-hidden="true">${EMBLEMES[c.embleme]}</svg>
          <strong>${c.nom}</strong>
        </div>
      </div>
      <p class="position">${position}</p>
    </li>`
  }

  const afficher = (etat) => {
    const t = TIRAGES[tirage]
    const combi = rang[tirage] >= 0 ? t.combinaisons[rang[tirage]] : null
    const cartes = combi ? combi.cartes : [null, null, null]
    $("#tirage").innerHTML = `
      <p class="presentation">${t.presentation}</p>
      <ol class="cartes${etat === "retournees" ? " retournees" : ""}">
        ${cartes.map((id, i) => (id ? carteHtml(id, t.positions[i], i) : `<li class="carte"><div class="carte-interieur"><div class="face dos" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="M50 22l6 16 17 1-13 11 4 17-14-9-14 9 4-17-13-11 17-1z"/></svg></div></div><p class="position">${t.positions[i]}</p></li>`)).join("")}
      </ol>
      <div class="actions"><button type="button" class="bouton" id="tirer">${combi ? "Tirer à nouveau" : "Tirer les cartes"}</button></div>
      <article class="interpretation" id="interpretation" ${combi && etat === "retournees" ? "" : "hidden"}>
        ${combi ? `<h2>Votre interprétation</h2>${combi.texte.map((p) => `<p>${p}</p>`).join("")}${combi.affirmation ? `<p class="affirmation"><span>Affirmation</span>${combi.affirmation}</p><p class="message"><span>Message</span>${combi.message}</p>` : ""}<p class="note">Rédigée à l'avance par l'IA pour cette combinaison, à partir des fiches et des consignes ci-dessous.</p>` : ""}
      </article>`
    $("#tirer").addEventListener("click", tirer)
    afficherRecu()
  }

  const tirer = () => {
    rang[tirage] = (rang[tirage] + 1) % TIRAGES[tirage].combinaisons.length
    afficher("cachees")
    requestAnimationFrame(() =>
      setTimeout(
        () => {
          document.querySelector(".cartes").classList.add("retournees")
          setTimeout(
            () => {
              const art = $("#interpretation")
              art.hidden = false
              art.classList.add("apparait")
              if (!calme) art.scrollIntoView({ behavior: "smooth", block: "nearest" })
            },
            calme ? 0 : 1300,
          )
        },
        calme ? 0 : 150,
      ),
    )
  }

  const afficherRecu = () => {
    const t = TIRAGES[tirage]
    const combi = rang[tirage] >= 0 ? t.combinaisons[rang[tirage]] : null
    const fiches = combi
      ? combi.cartes.map((id, i) => `<li><strong>${t.positions[i]} : ${CARTES[id].nom}</strong><span>${texteCarte(id)}</span></li>`).join("")
      : "<li>Tirez les cartes pour voir les fiches envoyées.</li>"
    $("#recu-contenu").innerHTML = `
      <h3>1. Les fiches des cartes tirées</h3><ul class="fiches">${fiches}</ul>
      <h3>2. Vos consignes pour ce tirage</h3><p class="consignes">${consignes(tirage)}</p>
      <h3>3. Vos exemples</h3><p>Deux ou trois interprétations que vous avez jugées réussies, pour donner le ton. Vous les fournissez au démarrage ; elles se remplacent comme le reste.</p>`
  }

  // ---- Onglets
  const onglets = { heros: $("#onglet-heros"), tarot: $("#onglet-tarot") }
  Object.entries(onglets).forEach(([t, b]) =>
    b.addEventListener("click", () => {
      tirage = t
      Object.entries(onglets).forEach(([u, o]) => o.setAttribute("aria-selected", String(u === t)))
      afficher(rang[t] >= 0 ? "retournees" : "cachees")
    }),
  )

  // ---- Gestion : une fiche de carte, les consignes
  const toast = (m) => {
    const el = $(".toast")
    el.textContent = m
    clearTimeout(toast.t)
    toast.t = setTimeout(() => (el.textContent = ""), 3500)
  }
  const choix = $("#choix-carte")
  choix.innerHTML = Object.entries(CARTES)
    .map(([id, c]) => `<option value="${id}">${c.nom} · ${c.famille}</option>`)
    .join("")
  const chargerCarte = () => ($("#texte-carte").value = texteCarte(choix.value))
  choix.addEventListener("change", chargerCarte)
  $("#form-carte").addEventListener("submit", (e) => {
    e.preventDefault()
    sauvegarde = { ...sauvegarde, cartes: { ...(sauvegarde.cartes || {}), [choix.value]: $("#texte-carte").value.trim() || CARTES[choix.value].texte } }
    ecrire(sauvegarde)
    afficherRecu()
    toast(`Fiche « ${CARTES[choix.value].nom} » enregistrée : elle sera envoyée à l'IA au prochain tirage.`)
  })
  const choixC = $("#choix-consignes")
  const chargerConsignes = () => ($("#texte-consignes").value = consignes(choixC.value))
  choixC.addEventListener("change", chargerConsignes)
  $("#form-consignes").addEventListener("submit", (e) => {
    e.preventDefault()
    sauvegarde = { ...sauvegarde, consignes: { ...(sauvegarde.consignes || {}), [choixC.value]: $("#texte-consignes").value.trim() || TIRAGES[choixC.value].consignes } }
    ecrire(sauvegarde)
    afficherRecu()
    toast("Consignes enregistrées : elles s'appliquent dès le prochain tirage.")
  })

  chargerCarte()
  chargerConsignes()
  afficher("cachees")
})()
