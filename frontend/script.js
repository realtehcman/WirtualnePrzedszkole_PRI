const form = document.getElementById('form');
const role = document.getElementById('role');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const name = document.getElementById('name');
const last_name = document.getElementById('last_name');
const address = document.getElementById('address');
const phone_number = document.getElementById('phone_number');
const birth_date = document.getElementById('birth_date');
const picture = document.getElementById('picture');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
  var phonenr = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
  var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
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
  const name1Value = name1.value.trim();
  const last_name1Value = last_name1.value.trim();
  const group_idValue = group_id.value.trim();
  
    if(birth_date.value === '') {
		setErrorFor(birth_date, 'Proszę wprowadzić datę');
	} else {
		setSuccessFor(birth_date);
	}
  
  
    if(role.value == "empty") {
		setErrorFor(role, 'Proszę wybrać role');
	} else {
		setSuccessFor(role);
	}

      if(group_id.value == "empty") {
		setErrorFor(group_id, 'Proszę wybrać grupe');
	} else {
		setSuccessFor(group_id);
	}

  
  	if(nameValue === '') {
		setErrorFor(name, 'Proszę uzupełnić dane');
	} else {
		setSuccessFor(name);
	}

  	if(name1Value === '') {
		setErrorFor(name1, 'Proszę uzupełnić dane');
	} else {
		setSuccessFor(name1);
	}

  
    	if(last_nameValue === '') {
		setErrorFor(last_name, 'Proszę uzupełnić dane');
	} else {
		setSuccessFor(last_name);
	}
  
    	if(last_name1Value === '') {
		setErrorFor(last_name1, 'Proszę uzupełnić dane');
	} else {
		setSuccessFor(last_name1);
	}

     	if(addressValue === '') {
		setErrorFor(address, 'Proszę uzupełnić dane');
	} else {
		setSuccessFor(address);
	}
  
   if(phone_numberValue.match(phonenr)){
    setSuccessFor(phone_number);
  }
  else {
    setErrorFor(phone_number, 'Niepoprawny numer telefonu')
  }
  
  	if(emailValue === '') {
		setErrorFor(email, 'Prosze uzupełnić dane');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Niepoprawny adres email');
	} else {
		setSuccessFor(email);
	}
  
  if(passwordValue.match(passw)){
    setSuccessFor(password);
  }
  else {
    setErrorFor(password, 'Hasło powinno być długości 8-15 znaków, jedna duza/mala/znakspecjalny')
  }
  
  	if(password2Value === '') {
		setErrorFor(password2, 'Pole nie może być puste');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Hasła się nie zgadzają');
	} else{
		setSuccessFor(password2);
	}
  
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}