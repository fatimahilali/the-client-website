document.addEventListener('DOMContentLoaded', function() {

    // Haal de knop op waarmee je het menu opent
    const menuButton = document.querySelector('.menu-button'); // Selecteer de knop voor het openen van het menu

    // Haal het uitklapbare menu op
    const dropdown = document.querySelector('.dropdown'); // Selecteer het uitklapbare menu-element

    // Haal de donkere achtergrond (overlay) op die verschijnt als het menu open is
    const overlay = document.getElementById('overlay'); // Selecteer de overlay (donkere achtergrond)

    // Haal de knop op waarmee je het menu sluit
    const closeButton = document.getElementById('close-button'); // Selecteer de sluitknop van het menu

    // Controleer of alle onderdelen die we nodig hebben er zijn
    if (menuButton && dropdown && overlay && closeButton) { // Zorg ervoor dat alle vereiste elementen bestaan

        // Als je op de menu-knop klikt, laat dan het menu en de overlay zien of verberg ze
        menuButton.addEventListener('click', function() {
            overlay.classList.toggle('show'); // Laat de overlay zien of verberg hem
            dropdown.classList.toggle('show'); // Laat het menu zien of verberg het
        });

        // Als je op de sluitknop in het menu klikt, verberg dan het menu en de overlay
        closeButton.addEventListener('click', function() {
            overlay.classList.remove('show'); // Verberg de overlay
            dropdown.classList.remove('show'); // Verberg het menu
        });

        // Als je op de overlay (donkere achtergrond) klikt, sluit het menu
        overlay.addEventListener('click', function(event) {
            // Controleer of je buiten het menu hebt geklikt
            if (!dropdown.contains(event.target) && !menuButton.contains(event.target)) {
                overlay.classList.remove('show'); // Verberg de overlay
                dropdown.classList.remove('show'); // Verberg het menu
            }
        });
    }

    // Deelknop functionaliteit
    const shareBtn = document.querySelector('.share-btn'); // Selecteer de deelknop
    const shareOptions = document.querySelector('.share-options'); // Selecteer de deelopties

    // Toggle de zichtbaarheid van de deelopties
    if (shareBtn && shareOptions) { // Controleer of deelknop en deelopties bestaan
        shareBtn.addEventListener('click', () => {
            shareOptions.classList.toggle('active'); // Zet de deelopties aan of uit
        });
    }

    // Functionaliteit om de link te kopiëren
    const copyBtn = document.querySelector('.copy-btn'); // Selecteer de kopieerknop
    const shareLink = document.querySelector('.share-link'); // Selecteer het tekstveld van de te kopiëren link

    if (copyBtn && shareLink) { // Controleer of kopieerknop en link bestaan
        copyBtn.addEventListener('click', () => {
            // Kopieer de tekst van de link naar het klembord
            navigator.clipboard.writeText(shareLink.textContent)
                .then(() => alert('Link gekopieerd!')) // Toon een melding als het kopiëren gelukt is
                .catch(err => console.error('Fout bij kopiëren: ', err)); // Toon een foutmelding bij mislukken
        });
    }

    // Pop-up donatie functionaliteit
    const donationPopup = document.getElementById('donationPopup'); // Selecteer de donatiepop-up
    const closePopup = document.getElementById('closePopup'); // Selecteer de sluitknop van de pop-up

    // Functie om de scrollpositie te controleren en de pop-up te tonen
    function checkScrollPosition() {
        // De totale hoogte van de pagina (document)
        const scrollHeight = document.documentElement.scrollHeight; // Bereken de totale hoogte van de pagina
        // De hoogte van het zichtbare gedeelte van het venster
        const clientHeight = document.documentElement.clientHeight; // Bereken de hoogte van het zichtbare deel
        // Hoeveel de gebruiker naar beneden heeft gescrold vanaf de bovenkant van de pagina
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Hoe ver de gebruiker gescrold heeft
        
        // Bereken hoeveel procent van de pagina de gebruiker heeft gescrold
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100; // Bereken het scrollpercentage

        // Als de gebruiker meer dan 50% van de pagina heeft gescrold, toon de pop-up
        if (scrollPercentage > 50) {
            donationPopup.style.display = 'flex';  // Toon de pop-up als er genoeg gescrold is
            window.removeEventListener('scroll', checkScrollPosition);  // Stop met luisteren naar scroll-events
        }
    }

    // Luister naar het scroll-event om te controleren hoeveel de gebruiker heeft gescrold
    window.addEventListener('scroll', checkScrollPosition); // Start met luisteren naar de scrollpositie

    // Sluit de pop-up als op de sluitknop wordt geklikt
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            donationPopup.style.display = 'none'; // Verberg de pop-up wanneer op sluiten wordt geklikt
        });
    }

    // Sticky donatieknop functionaliteit
    const stickyDonateBtn = document.querySelector('.donate-btn-sticky'); // Selecteer de sticky donatieknop

    // Controleer of de sticky donatieknop bestaat
    if (stickyDonateBtn) {
        // Voeg een lichte animatie toe bij scrollen om de aandacht te trekken
        window.addEventListener('scroll', function() {
            stickyDonateBtn.style.transform = 'translateY(-50%) scale(1.1)'; // Geef een lichte vergroting bij scrollen
            setTimeout(() => {
                stickyDonateBtn.style.transform = 'translateY(-50%) scale(1)'; // Terug naar normale grootte na animatie
            }, 200);
        });
    }

    // Functie voor het bijhouden van het aantal keer dat een artikel is gelezen
    const articleId = 'article-123'; // Uniek artikel-ID om de weergaven bij te houden
    const viewCounter = document.getElementById('view-counter'); // Selecteer de weergaveteller

    // Ophalen van het huidige aantal weergaven uit localStorage
    let views = localStorage.getItem(articleId); // Haal het aantal weergaven op uit localStorage

    if (views === null) { // Als er nog geen gegevens zijn
        views = 0; // Zet het aantal weergaven op 0
    } else {
        views = parseInt(views, 10); // Zet het aantal weergaven om naar een getal
    }

    // Verhoog het aantal weergaven
    views++; // Verhoog het aantal weergaven met 1

    // Toon het bijgewerkte aantal weergaven in de view-counter
    if (viewCounter) {
        viewCounter.innerText = `${views} keer gelezen`; // Update de view-counter met het aantal weergaven
    }

    // Sla het nieuwe aantal weergaven op in localStorage
    localStorage.setItem(articleId, views); // Sla het nieuwe aantal weergaven op in localStorage

});
