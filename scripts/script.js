document.addEventListener('DOMContentLoaded', function () {
    // MENU FUNCTIONALITEIT

    // Pak de elementen voor het menu en de overlay
    const menuButton = document.querySelector('.menu-button');  // De knop waarmee het menu opent
    const dropdown = document.querySelector('.dropdown');       // Het menu zelf
    const overlay = document.getElementById('overlay');         // De donkere achtergrond
    const closeButton = document.getElementById('close-button');// De knop om het menu te sluiten

    // Als het menu geopend wordt
    menuButton.addEventListener('click', function () {
        overlay.classList.add('show');    // Laat de overlay zien
        dropdown.classList.add('show');   // Laat het menu zien
    });

    // Als het menu gesloten wordt
    closeButton.addEventListener('click', function () {
        overlay.classList.remove('show'); // Verberg de overlay
        dropdown.classList.remove('show');// Verberg het menu
    });

    // Als je op de overlay klikt, sluit het menu
    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {   // Controleer of je echt op de overlay klikt
            overlay.classList.remove('show'); // Verberg de overlay
            dropdown.classList.remove('show');// Verberg het menu
        }
    });


    // DONATIE POP-UP FUNCTIONALITEIT

    // Pak de elementen voor de donatie pop-up
    const donationPopup = document.getElementById('donationPopup'); // De donatie-pop-up
    const closePopup = document.getElementById('closePopup');       // De knop om de pop-up te sluiten

    // Functie om de pop-up te tonen als je 50% gescrold hebt
    function checkScrollPosition() {
        const scrollTop = window.scrollY;               // Hoeveel de gebruiker gescrold heeft
        const documentHeight = document.documentElement.scrollHeight; // Totale hoogte van de pagina
        const windowHeight = window.innerHeight;        // Hoogte van het venster
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100; // Bereken het percentage dat is gescrold

        // Als de gebruiker meer dan 50% van de pagina heeft gescrold, toon de pop-up
        if (scrollPercentage > 50) {
            donationPopup.style.display = 'flex'; // Toon de pop-up
            window.removeEventListener('scroll', checkScrollPosition); // Stop met luisteren naar scroll-events
        }
    }

    // Controleer de scrollpositie tijdens het scrollen
    window.addEventListener('scroll', checkScrollPosition);

    // Sluit de pop-up als op de sluitknop wordt geklikt
    closePopup.addEventListener('click', function () {
        donationPopup.style.display = 'none'; // Verberg de pop-up
    });



    // Pak het element voor de weergaveteller
    const viewCounter = document.getElementById('view-counter'); // De teller die het aantal keer gelezen laat zien
    const articleId = 'article-123'; // Uniek ID voor het artikel

    // Haal het huidige aantal weergaven uit localStorage
    let views = localStorage.getItem(articleId) || 0;  // Zet het aantal weergaven op 0 als het niet bestaat
    views++; // Verhoog het aantal weergaven met 1

    // Toon het aantal weergaven
    viewCounter.innerText = views + ' keer gelezen';

    // Sla het bijgewerkte aantal weergaven op in localStorage
    localStorage.setItem(articleId, views);

    // VOORTGANGSBALK FUNCTIONALITEIT

    // Pak de voortgangsbalk en het artikel
    const progressBar = document.getElementById('progress-bar'); // De voortgangsbalk
    const article = document.querySelector('.article-content');  // Het artikel zelf

    // Functie om de voortgangsbalk bij te werken
    window.addEventListener('scroll', function () {
        const articleTop = article.offsetTop; // Afstand van het artikel tot de bovenkant van de pagina
        const articleHeight = article.scrollHeight; // Hoogte van het artikel
        const scrollTop = window.scrollY; // Hoe ver de gebruiker heeft gescrold
        const windowHeight = window.innerHeight; // Hoogte van het venster

        // Bereken hoeveel van het artikel is gelezen
        const progress = ((scrollTop - articleTop + windowHeight) / articleHeight) * 100;

        // Stel de breedte van de voortgangsbalk in op basis van het percentage
        progressBar.style.width = Math.min(progress, 100) + '%'; // Zorg ervoor dat het niet meer dan 100% wordt
    });
});
