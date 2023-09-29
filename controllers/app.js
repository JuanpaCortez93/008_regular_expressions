const form = document.querySelector('#form');
const inputs = document.querySelectorAll('#form input');

const regex = {
    user: /[\w\-]{4,16}/,
    name: /^[A-ZÁÉÍÓÚÑ]{1,1}[a-záéíóúñ]{1,}\s[A-ZÁÉÍÓÚÑ]{1,1}[a-záéíóúñ]{1,}\s?([A-ZÁÉÍÓÚÑ]{1,1}[a-záéíóúñ]{1,})?\s?([A-ZÁÉÍÓÚÑ]{1,1}[a-záéíóúñ]{1,})?$/,
    password: /^[\w(@%$?¡\-_)?\.?]{4,16}$/,
    email: /^[a-z_\.]{5,30}\+?[\w]{0,30}@\w+\.\w{2,3}(\.\w{2,3})?$/,
    telephone: /^09\d{8,8}$/
};

const campos = {
    user__group: false,
    user__name: false,
    user__password: false,
    user__email: false,
    user__telephone: false
}

const form_validator = (e) => {
    switch(e.target.name){
        case 'user':
            validation_styles(regex.user, e.target, 'user__group');
        break;

        case 'name':
            validation_styles(regex.name, e.target, 'user__name');
        break;

        case 'password':
            validation_styles(regex.password, e.target, 'user__password');
        break;
        
        case 'password2':
            password_validator();
        break;

        case 'email':
            validation_styles(regex.email, e.target, 'user__email');
        break;

        case 'telephone':
            validation_styles(regex.telephone, e.target, 'user__telephone');
        break;
    }
}

const validation_styles = (expression, input, id_name) => {
    if(expression.test(input.value)){
        document.querySelector("#" + id_name).classList.add('form__group-correct');
        document.querySelector("#" + id_name).classList.remove('form__group-incorrect');

        document.querySelector("#" + id_name + ' i').classList.remove('fa-times-circle-o');
        document.querySelector("#" + id_name + ' i').classList.add('fa-check-circle');

        document.querySelector("#" + id_name + " .form__input-error").classList.remove('form__input-error-active');

        campos[id_name] = true
    }else{
        document.querySelector("#" + id_name).classList.add('form__group-incorrect');
        document.querySelector("#" + id_name).classList.remove('form__group-correct');

        document.querySelector('#' + id_name + ' i').classList.remove('inactive');

        document.querySelector('#' + id_name + ' i').classList.add('fa-times-circle-o');
        document.querySelector('#' + id_name + ' i').classList.remove('fa-check-circle');

        document.querySelector('#' + id_name + ' .form__input-error').classList.add('form__input-error-active');

        campos[id_name] = false
    }
}

const password_validator = () => {
    const inputPassword1 = document.querySelector('#password');
    const inputPassword2 = document.querySelector('#password2');

    id_name = 'user__password2';

    if(inputPassword1.value === inputPassword2.value) {
        document.querySelector("#user__password2").classList.add('form__group-correct');
        document.querySelector("#user__password2").classList.remove('form__group-incorrect');

        document.querySelector("#user__password2 i").classList.remove('fa-times-circle-o');
        document.querySelector("#user__password2 i").classList.add('fa-check-circle');

        document.querySelector("#user__password2 .form__input-error").classList.remove('form__input-error-active');

        campos['password'] = true
    }else{
        document.querySelector("#user__password2").classList.add('form__group-incorrect');
        document.querySelector("#user__password2").classList.remove('form__group-correct');

        document.querySelector('#user__password2 i').classList.remove('inactive');

        document.querySelector('#user__password2 i').classList.add('fa-times-circle-o');
        document.querySelector('#user__password2 i').classList.remove('fa-check-circle');

        document.querySelector('#user__password2 .form__input-error').classList.add('form__input-error-active');

        campos['password'] = false
    }
} 

inputs.forEach((input) => {
    input.addEventListener('keyup', form_validator);
    input.addEventListener('blur', form_validator);
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const terms = document.querySelector('#terms');
    
    if(campos.user__group && campos.user__name && campos.user__password && campos.user__email && campos.user__telephone && terms.checked){
        form.reset();

        document.querySelector('.form__message-success').classList.add('form__message-success-active');

        setTimeout(() => {
            document.querySelector('.form__message-success').classList.remove('form__message-success-active');
        }, 5000);
        
        document.querySelectorAll('.form__group-correct').forEach((icon) => {
            icon.classList.remove('form__group-correct');
        });

        document.querySelectorAll('i').forEach((icon)=>{
            icon.classList.add('inactive');
        });

    }else{

        document.querySelector('#form__message').classList.add('form__message-active');

        setTimeout(() => {
            document.querySelector('#form__message').classList.remove('form__message-active');
        }, 5000);

    }



});