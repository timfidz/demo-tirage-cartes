// Tirages de cartes : démonstration statique.
// Les interprétations de trois combinaisons par tirage ont été générées par l'IA (Claude, modèle Sonnet) à partir des seules fiches et consignes ci-dessous, puis enregistrées ;
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
            "La Lanterne ouvre votre tirage. Elle éclaire ce que vous n'osiez pas regarder. Une vérité simple, déjà là, attend d'être vue sans jugement. Vous pouvez la regarder à votre rythme, comme on approche une lumière d'un coin de pièce que l'on évitait depuis longtemps.",
            "La Racine vous montre sur quoi vous pouvez vous appuyer pour faire ce pas. Vos origines, vos appuis, les personnes qui vous ont fait tenir sont là, avec vous. Ce qui vous ancre vous porte aussi. Vous n'avez pas à regarder cette vérité sans soutien : vos appuis lui donnent un sol stable.",
            "Le Pont relie les deux. Il est un geste, une parole ou une décision qui rapproche deux rives : ce que vous voyez à présent et la manière dont vous choisissez de raconter votre histoire. Il se construit des deux côtés : votre regard neuf d'un côté, ce qui vous soutient depuis toujours de l'autre.",
            "Réécrire votre histoire ne consiste donc pas à effacer des pages. Il s'agit d'y ajouter un éclairage, de reconnaître vos appuis et de choisir un premier geste, aussi petit soit-il : une parole, une décision, un simple mot dit à voix haute.",
          ],
          affirmation: "Je regarde ma vérité avec douceur, je m'appuie sur mes racines et je construis mon pont, un pas après l'autre.",
          message: "Ce qui est vu avec bienveillance devient un chemin.",
        },
        {
          cartes: ["miroir", "flamme", "messager"],
          texte: [
            "Le Miroir ouvre ce tirage. Il vous invite à regarder ce que vous reprochez aux autres, et à vous demander avec douceur si cela ne parle pas aussi de vous. Il vous propose de reconnaître une part de vous laissée de côté, sans la juger.",
            "La Flamme apparaît comme votre ressource. C'est le désir qui ne s'éteint pas, qu'il soit petit ou grand. Il indique la direction. Peut-être la part que le Miroir vous montre est-elle proche de ce désir, comme si elle attendait d'être retrouvée pour que la flamme éclaire votre chemin.",
            "Le Messager tient le rôle de médiateur. Une information, une rencontre, un signe peut arriver au bon moment, à condition de prendre le temps de l'écouter. Il relie ce que vous reconnaissez et ce que vous désirez : il suffit de rester à l'écoute.",
            "Ensemble, ces trois cartes racontent une histoire que vous pouvez réécrire : reconnaître une part de vous laissée de côté, retrouver le désir qui vous oriente, puis écouter ce qui se présente. Vous pouvez avancer à votre rythme, en commençant par accueillir ce que le miroir vous montre.",
          ],
          affirmation: "J'accueille toutes les parts de moi, je m'appuie sur mon désir pour avancer et j'écoute avec confiance ce qui se présente au bon moment.",
          message: "Ce que vous reconnaissez en vous devient une direction.",
        },
        {
          cartes: ["cle", "puits", "main"],
          texte: [
            "Il y a dans votre histoire une porte que vous teniez pour fermée. La Clé vous rappelle qu'elle ne l'est peut-être pas : il ne vous manquait pas de force, seulement une question. Celle que vous n'aviez jamais osé poser, ou que personne ne vous avait offerte. Réécrire son histoire commence souvent là, par une question nouvelle posée à un passage ancien.",
            "Pour aller vers cette porte, vous n'arrivez pas les mains vides. Le Puits parle de tout ce que vous avez traversé : les épreuves, les patiences, les détours. Rien de cela n'a été perdu. Cela s'est déposé en vous comme une réserve profonde, et vous y puisez déjà plus que vous ne le croyez. Ce que vous avez vécu devient une matière à laquelle vous pouvez faire appel, plutôt qu'un poids à porter.",
            "La Main tendue relie les deux. Elle vous invite à accepter l'aide quand elle se présente, ou à l'offrir à votre tour. Une porte s'ouvre plus facilement lorsque quelqu'un la tient avec vous, et personne ne traverse seul. Dans le récit que vous êtes en train d'écrire, une autre personne peut devenir un chapitre à part entière.",
          ],
          affirmation: "Je me donne le droit de poser la question qui ouvre la porte, et j'accepte que l'on marche à mes côtés.",
          message: "La porte s'ouvre avec une question, et la traversée se fait à plusieurs.",
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
            "Votre situation est portée par L'Étoile : après une épreuve, la confiance revient et quelque chose se remet à couler en vous. Cette carte parle d'espoir et de générosité. Elle décrit un moment où vous pouvez de nouveau vous ouvrir, donner et recevoir, sans que cela soit forcé.",
            "Le Pendu se place en défi, et il répond à l'Étoile d'une manière inattendue. L'espoir retrouvé ne se traduit pas encore par de l'action : quelque chose paraît suspendu, bloqué. La carte ne vous demande pas de forcer le passage. Elle vous invite à lâcher prise et à regarder cette situation depuis un autre angle. Le défi consiste peut-être à accepter cette pause sans la vivre comme un échec, et à laisser votre regard changer avant de chercher à agir.",
            "Le Chariot, en conseil, vient prolonger ce travail. Une fois le regard déplacé, la volonté peut se remettre en mouvement. Cette carte parle de maîtrise et de la capacité à tenir ensemble des forces contraires. Elle fait écho au Pendu : vous n'avez pas à choisir entre l'élan et la patience, entre l'espoir et la prudence. Vous pouvez avancer en conservant les deux.",
            "Ainsi, les trois cartes dessinent un enchaînement : une confiance qui revient, un temps de recul pour voir autrement, puis un mouvement que vous dirigez vous-même. Cette lecture n'annonce rien. Elle propose une manière d'habiter ce moment, que vous restez libre d'accueillir ou non.",
          ],
        },
        {
          cartes: ["lune", "force", "soleil"],
          texte: [
            "Dans la position Situation, La Lune décrit un moment où les émotions sont vives et où l'intuition parle plus fort que la raison. Tout n'est pas clair pour vous en ce moment, et cette incertitude n'est pas un danger : elle signale simplement que certaines choses ne sont pas encore lisibles. Vous n'avez pas à tout comprendre tout de suite.",
            "La Force, en position Défi, ne vous demande pas de lutter contre ce brouillard. Le défi consiste plutôt à y répondre par la douceur et par un courage tranquille. La vraie force ne force pas : ici, elle se manifeste dans la patience envers vous-même et envers vos émotions, plutôt que dans la volonté de trancher ou de contrôler. Vous pouvez, sans vous brusquer, apprivoiser ce qui vous trouble.",
            "On voit ainsi comment ces deux cartes se répondent. La Lune apporte ce qui est flou et sensible ; La Force propose une manière de l'accueillir, sans crispation. La douceur est l'attitude qui permet de rester présent dans l'incertitude sans la fuir ni la combattre.",
            "Le Soleil, en position Conseil, vous invite alors à vous tourner vers la clarté, la joie et les relations simples et chaleureuses. Il rappelle que ce qui était confus peut devenir évident. Ce n'est pas une promesse, mais une orientation : appuyez-vous sur ce qui est simple, chaleureux et lumineux autour de vous, et laissez cette clarté éclairer peu à peu ce que La Lune laissait dans l'ombre.",
          ],
        },
        {
          cartes: ["ermite", "roue", "imperatrice"],
          texte: [
            "Votre situation actuelle est portée par L'Ermite : vous êtes dans un temps de recul, de recherche intérieure. Vous prenez de la distance pour mieux entendre ce qui compte. Sa lanterne n'éclaire que le pas suivant, et non toute la route. Il n'est donc pas nécessaire de tout voir clairement pour avancer.",
            "La Roue de Fortune apparaît comme défi : la vie continue de tourner pendant votre retrait. Des cycles se ferment, d'autres s'ouvrent, et ce mouvement peut déstabiliser quand on aspire au calme. Il s'agit d'accueillir le changement sans vous crisper, car ce qui tourne apporte aussi du nouveau. Des opportunités peuvent surgir, et votre lanterne suffit pour les reconnaître une à une.",
            "L'Impératrice vous conseille de donner forme à ce qui mûrit en vous. Le recul de l'Ermite a pu laisser germer quelque chose : une idée, un désir, une intuition. La créativité et l'expression en sont l'issue naturelle. Plutôt que d'attendre que la Roue se stabilise, vous pouvez vous appuyer sur son mouvement : ce qui a mûri dans le silence peut prendre corps dans un geste, un projet, une parole.",
            "Les trois cartes dessinent ainsi un enchaînement : écouter, accueillir le mouvement, puis créer. Ce sont des pistes de réflexion, pas des verdicts : c'est à vous de décider ce que vous en faites.",
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
        ${combi ? `<h2>Votre interprétation</h2>${combi.texte.map((p) => `<p>${p}</p>`).join("")}${combi.affirmation ? `<p class="affirmation"><span>Affirmation</span>${combi.affirmation}</p><p class="message"><span>Message</span>${combi.message}</p>` : ""}<p class="note">Générée par l'IA (Claude, modèle Sonnet) à partir des seules fiches et consignes ci-dessous, puis enregistrée pour la démonstration. Dans votre outil, elle est générée à chaque tirage.</p>` : ""}
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
      <h3>3. Vos exemples</h3><p>Deux ou trois interprétations que vous avez jugées réussies, pour donner le ton. Vous les fournissez au démarrage. Cette démonstration n'en contenait pas : avec les vôtres, le ton se rapproche du vôtre.</p>`
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
