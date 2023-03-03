import React, { useState } from "react";
import "./UserManual.css";
import Change_language from "./img/Change_language.png"
import HomePage from "./img/HomePage.png"
import user from "./img/user.png"
import userinfo from "./img/userinfo.png"
import grupy from "./img/grupy.png"
import users123 from "./img/users123.png"
import grupy1 from "./img/grupy1.png"
import child from "./img/child.png"
import msgsend from "./img/msgsend.png"
import knowledge from "./img/knowledge.png"
import galeria from "./img/galeria.jpeg"
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function Section10() {
    return (
        <div id="general">
            <h2>Informacje ogólne, i cel powstania witryny</h2>

            <p>Wszelkie dane wykorzystane w trakcie tworzenia instrukcji są fikcyjne. Wszelka zbieżność jest przypadkowa. </p>
            <p>Aplikacja zapewnia wszystko w jednym miejscu, dzięki czemu nauczyciele i rodzice w przedszkolu mogą łatwo uzyskać dostęp do ważnych informacji, udostępniać pliki i komunikować się ze sobą w jednej zintegrowanej platformie.</p>

            <p>Aplikacja ma na celu uproszczenie i poprawienie tego procesu, łącząc wszystko w jednym miejscu i umożliwiając łatwe pozostanie informowanym i połączenie się ze sobą wszystkich zaangażowanych stron w Przedszkolu nr 25.</p>

            <p>Mamy nadzieję, że nasza aplikacja ułatwi pracę i życie nauczycielom oraz rodzicom w Przedszkolu nr 25.</p>

            <p>Portał obsługuje współczesne przeglądarki oraz urządzenia mobilne.</p>

            <p>Istnieje możliwość wyboru języka dla wyświetlanych treści Polski, Angielski, Ukraiński.</p>

            <ol>
                <li>Sesja użytkownika trwa jedną godzine, w przypadku braku aktywności użytkownik nastąpi wylogowanie z serwisu.</li>

                <li>
                    W celu zmiany języka należy kliknąć w przycisk znajdujący się w prawym górnym rogu na którym znajduje się aktualnie wybrany język strony. (Zmiana języka zmienia tylko język elementów na stronie, nie danych które zostały wprowadzone przez użytkownika).<br />

                </li> </ol>
            <div >
                <img
                    className="image-container"
                    src={Change_language}
                    alt="Change_language"
                />
            </div>


        </div>
    );
}

function Section1() {

    return (
        <div id="part1"> <hr />
            <h2>Profil użytkownika</h2>

            <p>Profil użytkownika umożliwia przeglądanie aktualnych danych</p>

            <ol>
                <li>
                    W celu ustawienia zdjęcia profilowego należy kliknąć na zastępcze zdjęcie profilowe,&nbsp;następnie wybrać zdjęcie w formacie jpg lub png&nbsp;.
                </li>
                <li>
                    W celu usunięcia zdjęcia należy kliknąć w przycisk usuń znajdujący się poniżej zdjęcia.
                </li>
                <li>
                    Możliwa jest edycja adresu zamieszkania, numeru telefonu oraz opcjonalne dodanie opisu. W celu zmiany innych danych osobowych proszę skontaktować się z Administratorem
                </li>
                <li>Aby zedytować dane należy wcisnąć przycisk &quot;Edytuj Dane&quot; oraz wprowadzic dane kt&oacute;re chcemy zmienić, następnie wcisnąć przycisk &quot;Zapisz&quot;. Jeżeli dane zostały poprawnie wprowadzone do systemu pojawi się powiadomienie w lewym g&oacute;rnym rogu ekranu informujace o poprawnej edycji danych, oraz zostaniemy przekierowani na strone profilową.
                    &nbsp;
                    W celu zmiany hasła należy wcisnąć przycisk &quot;Zmień hasło&quot; następnie zostaniemy przekierowani na podstronę w kt&oacute;rej musimy podać email na kt&oacute;rym mamy załozone konto. W ciągu paru minut powinien pojawić się email z linkiem kt&oacute;ry przekieruje na strone umozliwiajaca wprowadzenie nowego hasła użytkownika.(W przypadku braku wiadomości na poczcie proszę przejrzeć spam oraz inne foldery.)
                </li></ol>
            <div>
                <img className="image-container"
                     src={HomePage}
                     alt="HomePage"

                />
            </div>
        </div>
    );
}

function Section2() {
    return (
        <div id="part2"> <hr />
            <h2>Użytkownicy</h2>
            <p>Strona użytkownicy umożliwia przegląd wszystkich utworzonych użytkownik&oacute;w w serwisie</p>
            <ol>
                <li>W celu przejrzenia szczeg&oacute;łowych danych użytkownika należy kliknąć w przycisk "Zobacz", zostaniemy wtedy przekierowani na strone ze szczegolowymi danymi uzytkownika oraz mozliwoscia edycji.</li>
                <li>W celu usuniecia uzytkownika nalezy kliknac w przycisk "Usuń", następnie potwierdzić wykonaną akcje w okienku. Po poprawnym usunięciu użytkownika zostanie wyświetlony komunikat informujacy ze zmiany zostały wykonane pomyślnie.</li>
                <li>W celu dodania nowego użytkownika należy wybrać przycisk "Dodaj użytkownika". Zostaniemy wtedy przekierowani na stronę w kt&oacute;rej należy wypełnić dane w celu dodaniu nowego użytkownika.&nbsp;</li>
            </ol>   <div>
                <img className="image-container"
                     src={user}
                     alt="user"
                />
                <br />
                <img className="image-container"
                     src={userinfo}
                     alt="userinfo"
                />
            </div>
        </div>
    );
}

function Section3() {
    return (
        <div id="part3"> <hr />
            <h2>Grupy</h2>
            <p>Strona Grup umożliwia przegląd wszystkich utworzonych grup w serwisie</p>
            <ol>
                <li>W celu przejrzenia szczeg&oacute;łowych danych grupy należy kliknąć w przycisk "Zobacz", zostaniemy wtedy przekierowani na strone ze szczegolowymi danymi grupy oraz mozliwoscia:</li>
                <img className="image-container"
                     src={grupy}
                     alt="grupy"
                />
                <ol>1.1 utworzenia/przejrzenia Galerii oraz Innych plik&oacute;w kt&oacute;re są dostępne dla administracji oraz os&oacute;b przypisanych do danej grupy.</ol>
                <ol>1.2 Przypisania nauczyciela do danej grupy</ol>
                <ol>1.3 Usunięcia przypisanych rodzic&oacute;w/nauczycieli</ol>
                <img className="image-container"
                     src={grupy1}
                     alt="11"
                />
                <li>W celu usuniecia grupy nalezy kliknac w przycisk "Usuń", następnie potwierdzić wykonaną akcje w okienku. Po poprawnym usunięciu grupy zostanie wyświetlony komunikat informujacy ze zmiany zostały wykonane pomyślnie.</li>
                <li>W celu dodania nowej grupy należy wybrać przycisk "Dodaj Grupę". Zostaniemy wtedy przekierowani na stronę w kt&oacute;rej należy wypełnić dane w celu dodaniu nowej grupy.&nbsp;</li>
            </ol>
            <br />


            <img className="image-container"
                 src={users123}
                 alt="users"
            />
        </div>
    );
}

function Section4() {
    return (
        <div id="part4"> <hr />
            <h2>Dzieci</h2>
            <p>Strona Dzieci umożliwia przegląd wszystkich dodanych dzieci w serwisie</p>
            <ol>
                <li>W celu przejrzenia szczeg&oacute;łowych danych dzieci należy kliknąć w przycisk "Zobacz", zostaniemy wtedy przekierowani na strone z informacja na temat osob powiazanych z tym dzieckiem.</li>
                <li>Aby edytować dziecko należy kliknąć w przycisk edytuj, następnie zostaniemy przekierowani na strone kt&oacute;ra umożliwi nam edycje danych użytkownika</li>
                <li>W celu usuniecia dziecka nalezy kliknac w przycisk "Usuń", następnie potwierdzić wykonaną akcje w okienku. Po poprawnym usunięciu dziecka zostanie wyświetlony komunikat informujacy ze zmiany zostały wykonane pomyślnie.</li>
                <li>W celu dodania nowego dziecka należy wybrać przycisk "Dodaj Dziecko". Zostaniemy wtedy przekierowani na stronę w kt&oacute;rej należy wypełnić dane w celu dodaniu nowego dziecka.&nbsp;</li>
            </ol>
            <img className="image-container"
                 src={child}
                 alt="child"
            />
        </div>
    );
}
function Section5() {
    return (
        <div id="part5"> <hr />
            <h2>Kadra</h2>
            <p>Kadra umożliwia wyświetlenie przez rodzic&oacute;w informacji na tematch pracownik&oacute;w plac&oacute;wki, jest r&oacute;wnież miejscem w kt&oacute;rym nauczyciele mogą się podzielić informacjami na sw&oacute;j temat.&nbsp;</p>
            <p>Strona ta umożliwia jedynie przejrzenie użytkownik&oacute;w z uprawnieniami nauczyciela, lub administratora.&nbsp;</p>

        </div>
    );
}

function Section6() {
    const currentUser = useContext(UserContext);
    return (
        <div id="part6"> <hr />
            <h2>System wiadomości</h2>
            <p>System wiadomości powstał w celu ułatwienia komunikacji między pracownikami plac&oacute;wki a ich użytkownikami. Istnieje możliwość wysłania wiadomości do :</p>
            <ol>
                <li>Indywidualnych użytkownik&oacute;w plac&oacute;wki poprzez wpisanie danych osobowych odbiorcy. W celu wysłania do paru użytkownik&oacute;w nalezy oddzielić ich przecinkiem.&nbsp;</li>
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&<li>Wysłania wiadomości do wszystkich użytkownik&oacute;w ktorzy są przypisani do danej grupy po wybraniu grupy z listy rozwijanej.</li>}
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&<li>Wysłanie wiadomości do wszystkich użytkownik&oacute;w portalu.</li>}
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  && <img className="image-container"
                     src={msgsend}
                     alt="msgsend"/> } </ol>
            <h4>Odbieranie wiadomości</h4>
            <p>W celu odbioru wiadomości należy wejść w zakładkę Wiadomości znajdującą się w lewym menu.&nbsp;</p>
            <p>Na stronie tej znajdują się wszystkie wiadomości kt&oacute;re otrzymaliśmy wraz z datą oraz danymi adresata.&nbsp;</p>
            <p>W celu przeczytania treści wiadomości należy wcisnąć przycisk Zobacz, zostniemy wtedy przekierowani na stronę w kt&oacute;rej będzie się znajdowała treść wiadomości. Przechodząc na tą strone r&oacute;wnież odznaczymy daną wiadomość jako przeczytaną w statusie wiadomości u nadawcy.</p>
            <p>W celu usunięcia wiadomości należy wcisnąć przycisk usuń oraz potwierdzić decyzję.&nbsp;&nbsp;</p>
            <p>&nbsp;</p>
            <h4>Wiadomości wysłane</h4>
            <p>W celu sprawdzenia wiadomości wysłanych musimy wejść w zakładkę wysłane znajdujaca sie w lewym menu.</p>
            <p>Na stronie tej znajdują się wszystkie wiadomości kt&oacute;re wysłaliśmy wraz z datą oraz danymi odbiorcy/&oacute;w.&nbsp;</p>
            <p>W celu przeczytania treści wiadomości należy wcisnąć przycisk Zobacz, zostniemy wtedy przekierowani na stronę w kt&oacute;rej będzie się znajdowała treść wiadomości.&nbsp;</p>
            <p>W celu sprwadzenia statusu wiadomości należy kliknąć w przycisk STATUS zostaniemy wtedy przekierowani na stronę na kt&oacute;rej znajdują się wszyscy adresaci oraz informacja czy wiadomość została przeczytana czy też nie.</p>
            <p>W celu usunięcia wiadomości należy wcisnąć przycisk usuń oraz potwierdzić decyzję.&nbsp;&nbsp;</p>
            <p>&nbsp;</p>
        </div>
    );
}

function Section7() {
    const currentUser = useContext(UserContext);
    return (
        <div id="part7"> <hr />
            <h2>Baza wiedzy</h2>
            <p>Baza wiedzy umożliwia wymiane plik&oacute;w między nauczycielami oraz rodzicami.&nbsp;</p>
            <ol>
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&<li>W celu dodania plik&oacute;w nalezy wybrać plik/lub wiele plik&oacute;w poprzez nacisniecie przycisku wybierz pliki a następnie po wybraniu plik&oacute;w wcisnac guzik wyślij. Należy pamiętać że wszystkie pliki kt&oacute;re zostają tutaj umieszczone są dostępne dla wszystkich użytkownik&oacute;w serwisu.</li>}
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  && <li>Jest możliwość dodania opisu dla danego plik&oacute;w, w tym celu należy wcisnac przycisk Edytuj nastepnie wprowadzic informacje kt&oacute;rymi chcemy się podzielić.&nbsp;</li>}
                <li>W celu pobrania dokument&oacute;w należy wcisnac przycisk pobierz.&nbsp;</li>
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&<li>W celu usunięcia plik&oacute;w należy wcisnac przycisk usuń</li>}
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&<li>W przypadku gdyby była potrzeba usunięcia wszystkich dokument&oacute;w znajdujacych się na serwisie nalezy wcisnac przycisk usuń wszystkie pliki kt&oacute;ry umożliwia usunięcie wszystkich danych.&nbsp;</li>}
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&<img className="image-container"
                     src={knowledge}
                     alt="knowledge"/>  } </ol>

        </div>
    );
}

function Section8() {
    const currentUser = useContext(UserContext);

    return (
        <div id="part8"> <hr />
            <h2>Galeria</h2>
            <p>Galeria umożliwa udostępnienie zdjęć dla użytkownik&oacute;w kt&oacute;rzy należą do danej grupy.&nbsp;</p>
            {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&<p>Aby utworzyć nową galerie należy wejść na grupę w kt&oacute;rej chcemy utworzyć daną galerię, wcisnąć w guzik galeria, następnie wcisnąć dodaj folder i podać nazwę nowej galerii oraz mamy możliwość wrzucenia zdjęć kt&oacute;re chcemy aby się znajdowały w tej galerii, możemy to zrobić od razu lub p&oacute;źniej. W celu dodania zdjęć do galerii możemy się do niej dodstać poprzez wejśćie w daną grupę i jej listę galerii, lub poprzez zakładkę Galerii z lewego menu.&nbsp;</p>}
            <p>Galeria umozliwia pobieranie całej galerii w formacie zip oraz pobieranie indywidualnych zdjęć.&nbsp;</p>
            {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  && <p>W celu dodania nowych zdjęć należy wcisnąć przycisk Dodaj zdjęcia znajdujacy sie w prawym górnym rogu</p>}
            {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&  <img className="image-container"
                 src={galeria}
                 alt="galeria"/>}
            <p> Galeria umożliwia wyświetlenie 12 zdjęć na strone. </p>  {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  && <p> Proszę pamiętać że w przypadku wrzucenia wielu zdjęć w jednej galerii istnieje mozliwosc ze beda sie one długo  ładować.</p>}
             <br />
        </div>

    );
}


function NavigationMenu() {
    const [activeSection, setActiveSection] = useState(null);
    const currentUser = useContext(UserContext);

    return (

        <nav>
            <ul>
                <li>
                    <a
                        href="#general"
                        className={activeSection === "general" ? "active" : ""}
                        onClick={() => setActiveSection("general")}
                    >
                        Informacje ogólne
                    </a>
                </li>
                <li>
                    <a
                        href="#part1"
                        className={activeSection === "part1" ? "active" : ""}
                        onClick={() => setActiveSection("part1")}
                    >
                        Profil użytkownika
                    </a>
                </li>
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  && <li>
                    <a
                        href="#part2"
                        className={activeSection === "part2" ? "active" : ""}
                        onClick={() => setActiveSection("part2")}
                    >
                        Użytkownicy
                    </a>
                </li>}
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&  <li>
                    <a
                        href="#part3"
                        className={activeSection === "part3" ? "active" : ""}
                        onClick={() => setActiveSection("part3")}
                    >
                        Grupy
                    </a>
                </li>}
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  &&   <li>
                    <a
                        href="#part4"
                        className={activeSection === "part4" ? "active" : ""}
                        onClick={() => setActiveSection("part4")}
                    >
                        Dzieci
                    </a>
                </li>}
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

function UserSections({ currentUser }) {
    const { role } = useContext(UserContext);

    return (
        <>
            {(role === "ADMIN" || role === "TEACHER") && <Section2 />}
            {(role === "ADMIN" || role === "TEACHER") && <Section3 />}
            {(role === "ADMIN" || role === "TEACHER") && <Section4 />}
        </>
    );
}

function UserManual() {
    const currentUser = useContext(UserContext);
    return (
        <div>
            <NavigationMenu /> <div className="marginleft5px">
            <Section10 />
            <Section1 />
            {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  && <Section2 />}
            {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  && <Section3 />}
            {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER")  && <Section4 />}
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 /></div>
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






