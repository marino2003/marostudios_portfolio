---
title: "Nestly"
slug: "elearning-platform"
featured: true
date: "2023-05-15"
tech: ["Next.js", "Tailwind CSS", "MongoDB", "WebRTC"]
featuredImage: "/img/projects/sample_project/Mockup.png"
subtitle: "Smart Shared Household Billsplitter"
description: "Web-based educational platform that connects students and teachers with interactive tools and real-time communication"
gallery:
  - "/img/projects/sample_project/Mockup.png"
  - "/img/projects/sample_project/1.png"
  - "/img/projects/sample_project/2.png"
  - "/img/projects/sample_project/3.png"
---

# Introductie

Het was een warme avond op het terras met mijn huisgenoten. Toen de rekening kwam bleek het verdelen van gezamenlijke uitgaven rommelig en foutgevoelig, ondanks bestaande oplossingen zoals WieBetaaltWat en Tikkie. Handmatig invoeren, persoonlijke aankopen die door gedeelde boodschappen liepen en afwezige huisgenoten maakten het proces lastig. Dat zette mij aan het werk: ik voerde interviews uit met huisgenoten en studenten, deed een korte survey en ontwikkelde wireframes en prototypes die ik met gebruikers testte en verfijnde.

# Probleem & doelstellingen

**Probleem**  
Het eerlijk verdelen van gezamenlijke uitgaven in gedeelde huishoudens is vaak onduidelijk en omslachtig, waardoor misverstanden en frustraties ontstaan.

**Doelstellingen**

- Verminderen van tijd en frictie rondom registratie en verrekening van gezamenlijke uitgaven.
- Gebruikers in staat stellen binnen één minuut een bon te scannen, artikelen toe te wijzen en direct het effect op hun saldo te zien.
- Bieden van een eenvoudige, snelle interface zonder ingewikkelde instellingen.

# Inzichten

- Interviews en survey bevestigden dat studenten problemen ervaren bij itemized splits, bij afwezige roommates en bij terugkerende kosten.
- Secundaire marktanalyse en empathie-kaarten toonden dat bestaande tools te veel handwerk vragen en onvoldoende rekening houden met gedeelde boodschappensituaties.
- Twee persona's en HMW-statements hielpen bij prioritering: snel scannen en automatische artikeltoewijzing staan hoog, notificaties en overzicht zijn essentieel voor acceptatie.
- Usability-worsten: veelgebruikte acties moeten prominent en eenduidig zijn; edit-controls moesten groter en reminders duidelijker gesignaleerd worden.

# Concept

De app richt zich op eerlijk en eenvoudig delen van uitgaven binnen een huishouden. Kernfeatures:

- Kassabon-scanner die prijzen en producten automatisch herkent en toewijst per artikel.
- Per artikel opties om deelnemers te selecteren, met snelle selecteer en deselecteer opties.
- Ondersteuning voor vaste lasten: terugkerende kosten worden automatisch toegevoegd en op een vaste dag verdeeld.
- Balansoverzicht met persoonlijke plus- of minpositie en reminders voor verrekeningen.
- Eenvoudige navigatie met een beperkt aantal hoofdtabs zodat gebruikers snel bij uitgaven, instellingen en huishoudinformatie kunnen.
- Ontwerpkeuzes gericht op snelle adoptie: prominente scan-FAB, directe inviteflows en slimme defaults voor veelvoorkomende splits.

# User testing

- Usability tests met vijf doelgroepgebruikers waarin zowel low-fidelity flows als high-fidelity screens werden getest.
- Belangrijkste bevindingen en aanpassingen:
  - De add-knop werd snel gevonden; bevestiging voor prominente plaatsing.
  - Edit-icoontjes moesten groter en herkenbaarder worden; icoon-grootte en touch-targets aangepast.
  - Reminder- en betaalflows vroegen om duidelijkere signalering; notificatie-teksten en visuele states verduidelijkt.
  - Gebruikers waardeerden itemized splits en slimme defaults omdat dit rekenwerk reduceerde.
- Op basis van de tests voerde ik gerichte iteraties door en updateerde microcopy en component-states.

# Resultaat

- Deliverables: empathie-kaarten, persona's, HMW-statements, low- en high-fidelity wireframes, component-specs, microcopy en een dev-ready Figma-prototype.
- Gebruikservaring: snellere registratie van uitgaven, minder handmatig rekenwerk door itemized splits en slimme defaults, en minder discussies door realtime inzicht en transparante afrondingsvoorstellen.
- Adoptie: eenvoudige onboarding, hoge zichtbaarheid van de scan-functie en directe inviteflows zorgden voor snelle acceptatie binnen de doelgroep.
- Handoff naar development: pixel-precieze specificaties, component-metrics en accessibility-notes om implementatie en testen te versnellen.

Kort samengevat maakt het ontwerp het delen van kosten sneller, inzichtelijker en eerlijker. Het sluit aan op het mentale model van studenten en gedeelde huishoudens en is klaar om getest en verder te itereren in volgende ontwikkelstappen.