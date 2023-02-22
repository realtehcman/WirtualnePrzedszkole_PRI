import {checkInputs} from "../pages/Form/script.js";

describe("checkInputs", () => {
    let form, role, email, password, password2, name, last_name, address, phone_number, birth_date, picture;


    beforeEach(() => {
        form = document.createElement("form");
        form.id = "form";
        role = document.createElement("input");
        role.id = "role";
        email = document.createElement("input");
        email.id = "email";
        password = document.createElement("input");
        password.id = "password";
        password2 = document.createElement("input");
        password2.id = "password2";
        name = document.createElement("input");
        name.id = "name";
        last_name = document.createElement("input");
        last_name.id = "last_name";
        address = document.createElement("input");
        address.id = "address";
        phone_number = document.createElement("input");
        phone_number.id = "phone_number";
        birth_date = document.createElement("input");
        birth_date.id = "birth_date";
        picture = document.createElement("input");
        picture.id = "picture";


        role.value = "role";
        email.value = "email";
        password.value = "password";
        password2.value = "password2";
        name.value = "name";
        last_name.value = "last_name";
        address.value = "address";
        phone_number.value = "phone_number";
        birth_date.value = "birth_date";
        picture.value = "picture";

        document.body.append(form, role, email, password, password2, name, last_name, address, phone_number, birth_date, picture);

    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("sets error for empty birth_date", () => {
        birth_date.value = "";
        checkInputs();
        expect(birth_date.classList).toBeTruthy();
    });

    it("sets success for non-empty birth_date", () => {
        birth_date.value = "2000-01-01";
        checkInputs();
        expect(birth_date.classList).toBeTruthy();
    });

    it("sets error for role equal to 'empty'", () => {
        role.value = "empty";
        checkInputs();
        expect(role.classList).toBeTruthy();
    });

    it("sets success for role not equal to 'empty'", () => {
        role.value = "admin";
        checkInputs();
        expect(role.classList).toBeTruthy();
    });

    it("sets error for empty name", () => {
        name.value = "";
        checkInputs();
        expect(name.classList).toBeTruthy();
    });

    it("sets success for non-empty name", () => {
        name.value = "John";
        checkInputs();
        expect(name.classList).toBeTruthy();
    });

    it("sets error for empty last_name", () => {
        last_name.value = "";
        checkInputs();
        expect(last_name.classList).toBeTruthy();
    });

});
