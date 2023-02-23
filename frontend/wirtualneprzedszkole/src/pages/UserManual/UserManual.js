import React, { useState } from "react";
import "./UserManual.css";

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function Section1() {
    return (
        <div id="part1">
            <h2>Profil użytkownika</h2>
            <p>Profil użytkownika umożliwia przeglądanie aktualnych danych</p>
            <h4>Ustawienie zdjęcia profilowego</h4>
            <p>W celu ustawienia zdjęcia profilowego należy kliknąć *obrazek* następnie wybrać zdjęcie w formacie x. W celu usunięcia zdjęcia należy kliknąć w przycisk usuń znajdujący się poniżej zdjęcia.</p>
            <h4>Edycja danych osobowych</h4>
            <p>Możliwa jest edycja adresu zamieszkania, numeru telefonu oraz opcjonalne dodanie opisu. W celu zmiany innych danych osobowych proszę skontaktować się z Administratorem</p>
            <p>Aby zedytować dane należy wcisnąć przycisk "Edytuj Dane" oraz wprowadzic dane które chcemy zmienić, następnie wcisnąć przycisk "Zapisz". Jeżeli dane zostały poprawnie wprowadzone do systemu pojawi się powiadomienie w lewym górnym rogu ekranu informujace o poprawnej edycji danych, oraz zostaniemy przekierowani na strone profilową. </p>
            <h4>Zmiana Hasła</h4>
            <p>W celu zmiany hasła należy wcisnąć przycisk "Zmień hasło" nastęnie zostaniemy przekierowani na podstronę w której musimy podać email na którym mamy załozone konto. W ciągu paru minut powinien pojawić się email z linkiem który przekieruje na strone umozliwiajaca wprowadzenie  nowego  hasła użytkownika.(W przypadku braku wiadomości na poczcie proszę przejrzeć spam oraz inne foldery.) </p>
        </div>
    );
}

function Section2() {
    return (
        <div id="part2">
            <h2>Użytkownicy</h2>
            <p>Strona użytkownicy umożliwia przegląd wszystkich utworzonych użytkowników w serwisie</p>
            <p>W celu przejrzenia szczegółowych danych użytkownika należy kliknąć w przycisk "Zobacz", zostaniemy wtedy przekierowani na strone ze szczegolowymi danymi uzytkownika oraz mozliwoscia edycji</p>
            <h4>Usuwanie użytkowników</h4>
            <p>W celu usuniecia uzytkownika nalezy kliknac w przycisk "Usuń", następnie potwierdzić wykonaną akcje w okienku. Po poprawnym usunięciu użytkownika zostanie wyświetlony komunikat informujacy ze zmiany zostały wykonane pomyślnie</p>
            <h4>Dodanie nowych użytkowników</h4>
            <p>W celu dodania nowego użytkownika należy wybrać przycisk "Dodaj użytkownika"</p>
        </div>
    );
}

function Section3() {
    return (
        <div id="part3">
            <h2>Grupy</h2>
            <p>Xyz</p>
        </div>
    );
}

function Section4() {
    return (
        <div id="part4">
            <h2>Dzieci</h2>
            <p>Xyz</p>
        </div>
    );
}
function Section5() {
    return (
        <div id="part5">
            <h2>kadra</h2>
            <p>Profil użytkownika umożliwia przeglądanie aktualnych danych</p>
            <h4>Ustawienie zdjęcia profilowego</h4>
            <p>W celu ustawienia zdjęcia profilowego należy kliknąć *obrazek* następnie wybrać zdjęcie w formacie x. W celu usunięcia zdjęcia należy kliknąć w przycisk usuń znajdujący się poniżej zdjęcia.</p>
            <h4>Edycja danych osobowych</h4>
            <p>Możliwa jest edycja adresu zamieszkania, numeru telefonu oraz opcjonalne dodanie opisu. W celu zmiany innych danych osobowych proszę skontaktować się z Administratorem</p>
            <p>Aby zedytować dane należy wcisnąć przycisk "Edytuj Dane" oraz wprowadzic dane które chcemy zmienić, następnie wcisnąć przycisk "Zapisz". Jeżeli dane zostały poprawnie wprowadzone do systemu pojawi się powiadomienie w lewym górnym rogu ekranu informujace o poprawnej edycji danych, oraz zostaniemy przekierowani na strone profilową. </p>
            <h4>Zmiana Hasła</h4>

            <p>Profil użytkownika umożliwia przeglądanie aktualnych danych</p>
            <h4>Ustawienie zdjęcia profilowego</h4>
            <p>W celu ustawienia zdjęcia profilowego należy kliknąć *obrazek* następnie wybrać zdjęcie w formacie x. W celu usunięcia zdjęcia należy kliknąć w przycisk usuń znajdujący się poniżej zdjęcia.</p>
            <h4>Edycja danych osobowych</h4>
            <p>Możliwa jest edycja adresu zamieszkania, numeru telefonu oraz opcjonalne dodanie opisu. W celu zmiany innych danych osobowych proszę skontaktować się z Administratorem</p>
            <p>Aby zedytować dane należy wcisnąć przycisk "Edytuj Dane" oraz wprowadzic dane które chcemy zmienić, następnie wcisnąć przycisk "Zapisz". Jeżeli dane zostały poprawnie wprowadzone do systemu pojawi się powiadomienie w lewym górnym rogu ekranu informujace o poprawnej edycji danych, oraz zostaniemy przekierowani na strone profilową. </p>
            <h4>Zmiana Hasła</h4>
            <p>W celu zmiany hasła należy wcisnąć przycisk "Zmień hasło" nastęnie zostaniemy przekierowani na podstronę w której musimy podać email na którym mamy załozone konto. W ciągu paru minut powinien pojawić się email z linkiem który przekieruje na strone umozliwiajaca wprowadzenie  nowego  hasła użytkownika.(W przypadku braku wiadomości na poczcie proszę przejrzeć spam oraz inne foldery.) </p>
            <p>W celu zmiany hasła należy wcisnąć przycisk "Zmień hasło" nastęnie zostaniemy przekierowani na podstronę w której musimy podać email na którym mamy załozone konto. W ciągu paru minut powinien pojawić się email z linkiem który przekieruje na strone umozliwiajaca wprowadzenie  nowego  hasła użytkownika.(W przypadku braku wiadomości na poczcie proszę przejrzeć spam oraz inne foldery.) </p>
        </div>
    );
}

function Section6() {
    return (
        <div id="part6">
            <h2>Wiadomości</h2>
            <p>Xyz</p>
        </div>
    );
}

function Section7() {
    return (
        <div id="part7">
            <h2>Baza wiedzy</h2>
            <p>Xyz</p>
        </div>
    );
}

function Section8() {
    return (
        <div id="part8">
            <h2>Galeria</h2>
            <p>Xyz</p>
        </div>
    );
}

function Section9() {
    return (
        <div id="part9">
            <h2>Kadra</h2>
            <p>This is the fourth section.</p>
        </div>
    );
}


function NavigationMenu() {
    const [activeSection, setActiveSection] = useState(null);

    return (
        <nav>
            <ul>
                <li>
                    <a
                        href="#part1"
                        className={activeSection === "part1" ? "active" : ""}
                        onClick={() => setActiveSection("part1")}
                    >
                      Profil użytkownika
                    </a>
                </li>
                <li>
                    <a
                        href="#part2"
                        className={activeSection === "part2" ? "active" : ""}
                        onClick={() => setActiveSection("part2")}
                    >
                        Użytkownicy
                    </a>
                </li>
                <li>
                    <a
                        href="#part3"
                        className={activeSection === "part3" ? "active" : ""}
                        onClick={() => setActiveSection("part3")}
                    >
                        Grupy
                    </a>
                </li>
                <li>
                    <a
                        href="#part4"
                        className={activeSection === "part4" ? "active" : ""}
                        onClick={() => setActiveSection("part4")}
                    >
                        Dzieci
                    </a>
                </li>
                <li>
                    <a
                        href="#part5"
                        className={activeSection === "part5" ? "active" : ""}
                        onClick={() => setActiveSection("part5")}
                    >
                        Kadra
                    </a>
                </li>
                <li>
                    <a
                        href="#part6"
                        className={activeSection === "part6" ? "active" : ""}
                        onClick={() => setActiveSection("part6")}
                    >
                        Wiadomosci
                    </a>
                </li>
                <li>
                    <a
                        href="#part7"
                        className={activeSection === "part7" ? "active" : ""}
                        onClick={() => setActiveSection("part7")}
                    >
                        Baza wiedzy
                    </a>
                </li>
                <li>
                    <a
                        href="#part8"
                        className={activeSection === "part8" ? "active" : ""}
                        onClick={() => setActiveSection("part8")}
                    >
                        Galeria
                    </a>
                </li>
            </ul>
        </nav>
    );
}

function UserManual() {
    return (
        <div>
            <NavigationMenu />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 />
            <button
                className="scroll-to-top"
                onClick={scrollToTop}
            >
                ^
            </button>
        </div>
    );
}

export default UserManual;
