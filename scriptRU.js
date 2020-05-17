//Global variebles

let show = true;
let cookieAccpetShow = true;
let overflow = true;
let select = 0;
let a = 0;

//Elements determination

let starObject = document.querySelector('.star-object');
let loginInput = document.querySelector('#login');
let passwordInput = document.querySelector('#password');

//After loaded

window.onload = function () {
    document.querySelector('.modal-notification-window').style.transition = 'all .25s ease';
    document.querySelector('.modal-notification-window-content').style.transition = 'all .25s ease-in-out';
    document.querySelector('.modal-notification-window-close-button').style.transition = 'all .25s ease';
    document.querySelector('.modal-notification-window-accept-button').style.transition = 'all .25s ease';
    document.querySelector('.auth-button').style.transition = 'all .15s ease';
    document.querySelector('#auth-circle-login').style.transition = 'all .5s ease';
    document.querySelector('#auth-circle-password').style.transition = 'all .5s ease';
    document.querySelector('.star-object').style.transition = 'all .3s ease-in-out';
    document.querySelector('.back-button').style.transition = 'all .25s ease-in-out';
    callNotification();
    closeNotification();
    if (document.cookie == 'cookieAccpetShow=false') { cookieAccpetShow = false }
    setTimeout(() => {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.visibility = 'hidden';
        if (cookieAccpetShow) { callNotification('Уведомление: cookie', 'Этот сайт использует cookie файлы, вы согласны?', 'ДА'); document.cookie = 'cookieAccpetShow=false; secure' }
    }, 500);
    setTimeout(() => { document.querySelector('#gif-loading').style.opacity = '0', document.querySelector('.gif').style.background = 'url(images/gif_background.gif)' }, 2000);
}

//Functions

function authCheck(login, password, authLog) {
    if (loginInput.value == 'asdfG1') {
        document.querySelector('#auth-circle-login').style.background = 'rgb(20, 223, 30)';
        login = true;
    } else {
        if (loginInput.value != '') {
            document.querySelector('#auth-circle-login').style.background = 'rgb(255, 62, 62)';
        } else {
            document.querySelector('#auth-circle-login').style.background = 'rgb(128, 128, 128)';
        }
        login = false;
    }
    if (passwordInput.value == 'qwertY!123z') {
        document.querySelector('#auth-circle-password').style.background = 'rgb(20, 223, 30)';
        password = true;
    } else {
        if (passwordInput.value != '') {
            document.querySelector('#auth-circle-password').style.background = 'rgb(255, 62, 62)';
        } else {
            document.querySelector('#auth-circle-password').style.background = 'rgb(128, 128, 128)';
        }
        password = false;
    }
    if (login) {
        authLog = 'Логин: правильный, ';
    } else {
        authLog = 'Логин: неправильный, ';
    }
    if (password) {
        authLog = authLog + 'пароль: правильный.';
    } else {
        authLog = authLog + 'пароль: неправильный.';
    }
    return authLog;
}

//Auth auto check

setInterval(authCheck, 1);

function authAttention() {
    if (authCheck().includes('Логин: неправильный')) {
        document.querySelector('#auth-circle-login').style.animation = 'auth-attention .25s infinite ease alternate';
        setTimeout(() => document.querySelector('#auth-circle-login').style.animation = '', 2500);
    } else {
        if (authCheck().includes('пароль: неправильный')) {
            passwordInput.focus();
        }
    }
    if (authCheck().includes('пароль: правильный')) {
        document.querySelector('#auth-circle-password').style.animation = 'auth-attention .25s infinite ease alternate';
        setTimeout(() => document.querySelector('#auth-circle-password').style.animation = '', 2500);
    } else {
        if (authCheck().includes('Логин: неправильный')) {
            loginInput.focus();
        }
    }
    callNotification('Уведомление', authCheck(), 'ОК');
}

function callNotification(name, text, button) {
    document.body.style.overflow = 'hidden';
    document.querySelector('.modal-notification-window-content').style.transform = 'scale(1) translateY(0)';
    document.querySelector('.modal-notification-window').style.visibility = 'visible';
    document.querySelector('.modal-notification-window').style.backdropFilter = 'blur(5px)';
    document.querySelector('.modal-notification-window').style.background = 'rgba(0, 0, 0, .5)';
    document.querySelector('.modal-notification-window-header-title').textContent = name;
    document.querySelector('.modal-notification-window-text').textContent = text;
    document.querySelector('.modal-notification-window-accept-button').textContent = button;
}

function closeNotification() {
    document.querySelector('.modal-notification-window-content').style.transform = 'scale(2) translateY(-1000%)';
    document.querySelector('.modal-notification-window').style.backdropFilter = 'blur(0px)';
    document.querySelector('.modal-notification-window').style.background = 'transparent';
    document.querySelector('.modal-notification-window').style.visibility = 'hidden';
    if (overflow) { document.body.style.overflow = 'visible' }
    if (select == 'login') {
        loginInput.focus();
    }
    if (select == 'password') {
        passwordInput.focus();
    }
}

function start() {
    document.querySelector('.auth-button').blur();
    if (authCheck().includes('Логин: правильный') & authCheck().includes('пароль: правильный')) {
        document.body.style.overflow = 'hidden';
        document.querySelector('.star').style.display = 'flex';
        if (show) {
            select = 0;
            callNotification('Уведомление', 'Случайные 10 чисел от 0 до 9 генерируются и используются для определения светимости звезды. Создаётcя эффект горения.', 'ОК');
            show = false;
            overflow = false;
        }
    } else { authAttention() }
}

//Events

document.querySelector('.modal-notification-window-background').onmouseover = () => document.querySelector('.modal-notification-window-close-button').style.background = 'rgb(255, 62, 62)'
document.querySelector('.modal-notification-window-background').onmousedown = () => document.querySelector('.modal-notification-window-close-button').style.background = 'rgb(235, 21, 21)'
document.querySelector('.modal-notification-window-background').onmouseleave = () => document.querySelector('.modal-notification-window-close-button').style.background = ''
document.querySelector('.auth-button').onclick = () => start()
document.querySelector('.modal-notification-window-close-button').onclick = () => closeNotification()
document.querySelector('.modal-notification-window-accept-button').onclick = () => closeNotification()
document.querySelector('.modal-notification-window-background').onclick = () => closeNotification()

document.querySelector('.back-button').onclick = () => {
    document.querySelector('.star').style.display = 'none';
    overflow = true;
    document.body.style.overflow = 'visible';
}

document.onkeydown = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        document.querySelector('.modal-notification-window-close-button').style.background = 'rgb(235, 21, 21)';
        closeNotification();
    }
    if (evt.keyCode == 13) {
        if (authCheck().includes('Логин: правильный') & authCheck().includes('пароль: неправильный')) {
            passwordInput.focus();
            if (a == 0) { a = 1 }
        } else { if (!authCheck().includes('Логин: правильный') & !authCheck().includes('пароль: правильный')) { authAttention() } }
        if (authCheck().includes('Логин: правильный') & authCheck().includes('пароль: правильный')) {
            loginInput.blur();
            passwordInput.blur();
            start();
        } else { if (a != 1) { authAttention() } else { a = 2 } }
    }
}

loginInput.onfocus = () => {
    select = 'login';
    a = 0;
}

passwordInput.onfocus = () => {
    select = 'password';
    a = 1;
}

//Star pulsing script

setInterval(() => {
    let numbers = '0123456789';
    let coefficient = 0;
    for (let i = 0; i < 10; i++) {
        coefficient = numbers[Math.floor(Math.random() * 10)];
    }
    starObject.style.transform = `scale(1.${Math.round(coefficient / 4)})`;
    starObject.style.boxShadow = `0 0 100px ${Math.pow(coefficient, 2)}px rgb(24${coefficient}, 24${coefficient}, 23${coefficient})`;
}, 300)