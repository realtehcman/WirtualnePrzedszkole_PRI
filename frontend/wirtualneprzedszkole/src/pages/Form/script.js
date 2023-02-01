let form = document.getElementById('form');

if (!!form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        checkInputs();
    });
}

export function checkInputs() {
    let role = document.getElementById('role');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let password2 = document.getElementById('password2');
    const name = document.getElementById('name');
    let last_name = document.getElementById('last_name');
    let address = document.getElementById('address');
    let phone_number = document.getElementById('phone_number');
    let birth_date = document.getElementById('birth_date');
    let picture = document.getElementById('picture');
    const phonenr = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const roleValue = role.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const nameValue = name.value.trim();
    const last_nameValue = last_name.value.trim();
    const addressValue = address.value.trim();
    const phone_numberValue = phone_number.value.trim();
    const birth_dateValue = birth_date.value.trim();
    const pcitureValue = picture.value.trim();

    if (birth_date.value === '') {
        setErrorFor(birth_date, 'Proszę wprowadzić datę');
    } else {
        setSuccessFor(birth_date);
    }


    if (role.value === "empty") {
        setErrorFor(role, 'Proszę wybrać role');
    } else {
        setSuccessFor(role);
    }


    if (nameValue === '') {
        setErrorFor(name, 'Proszę uzupełnić dane');
    } else {
        setSuccessFor(name);
    }

    if (last_nameValue === '') {
        setErrorFor(last_name, 'Proszę uzupełnić dane');
    } else {
        setSuccessFor(last_name);
    }

    if (addressValue === '') {
        setErrorFor(address, 'Proszę uzupełnić dane');
    } else {
        setSuccessFor(address);
    }

    if (phone_numberValue.match(phonenr)) {
        setSuccessFor(phone_number);
    } else {
        setErrorFor(phone_number, 'Niepoprawny numer telefonu')
    }

    if (emailValue === '') {
        setErrorFor(email, 'Prosze uzupełnić dane');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Niepoprawny adres email');
    } else {
        setSuccessFor(email);
    }

    if (passwordValue.match(passw)) {
        setSuccessFor(password);
    } else {
        setErrorFor(password, 'Hasło powinno być długości 8-15 znaków, jedna duza/mala/znakspecjalny')
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Pole nie może być puste');
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Hasła się nie zgadzają');
    } else {
        setSuccessFor(password2);
    }

}

export function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    if(small) {
        formControl.className = 'form-control error';
        small.innerText = message;
    }
}

export function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

export function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
