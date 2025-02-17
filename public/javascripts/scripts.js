const menuItem = document.querySelectorAll('.menu-item');
const profileInfo = document.querySelector('#profile');
const profileCard = document.querySelector('.profile-card');
const messagesNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = document.querySelectorAll('.message');
const messageSearch = document.querySelector('#messages-search')


const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span')
var root = document.querySelector(':root');

const colorPalette = document.querySelectorAll('.choose-color span');

const bg1 = document.querySelector('.bg-1');
const bg2 = document.querySelector('.bg-2');
const bg3 = document.querySelector('.bg-3');




const changeActiveItem = () => {
    menuItem.forEach(item => [
        item.classList.remove('active')
    ])
}
menuItem.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if (item.id != 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'none'
        } else {
            document.querySelector('.notifications-popup').style.display = 'block'
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})

// =============== Messages ==============
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    console.log(val);
    message.forEach(chat => {
        let name = chat.querySelectorAll('h5').textContent.toLowerCase();
        if (name.indexOf(val) != -1) {
            chat.style.display = 'flex';
        } else {
            chat.style.display = 'none';
        }
    })
}
messageSearch.addEventListener('keyup', searchMessage);
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none'
    }, 2000)
})


// ======= Theme Customization ===============
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}
const closeProfileModal = (e) => {
    if (e.target.classList.contains('profile-card')) {
        profileCard.style.display = 'none';
    }
}

const openProfileModal = () => {
    profileCard.style.display = 'grid';
}

themeModal.addEventListener('click', closeThemeModal);
profileCard.addEventListener('click', closeProfileModal);


theme.addEventListener('click', openThemeModal);
profileInfo.addEventListener('click', openProfileModal);


// font size

const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}

fontSizes.forEach(size => {


    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');

        if (size.classList.contains('font-size-1')) {
            fontSize = '10px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '5.4rem');
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '13px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '-7rem');
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('----sticky-top-left', '-2rem');
            root.style.setProperty('----sticky-top-right', '-17rem');
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('----sticky-top-left', '-5rem');
            root.style.setProperty('----sticky-top-right', '-25rem');
        } else if (size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('----sticky-top-left', '-12rem');
            root.style.setProperty('----sticky-top-right', '-35rem');
        }
        document.querySelector('html').style.fontSize = fontSize;
    })

})
//  ========== Color Pallete ==========

const changeActiveColor = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active')
    })
}

colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        changeActiveColor();

        if (color.classList.contains('color-1')) {
            primaryHue = 252;
        } else if (color.classList.contains('color-2')) {
            primaryHue = 52;
        } else if (color.classList.contains('color-3')) {
            primaryHue = 352;
        } else if (color.classList.contains('color-4')) {
            primaryHue = 152;
        } else if (color.classList.contains('color-5')) {
            primaryHue = 202;
        }
        color.classList.add('active');
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})

//=========== Theme BackGround =========
let lightColorLight;
let darkColorLight;
let whiteColorLight;

const changeBg = () => {
    root.style.setProperty('--light-color-light', lightColorLight);
    root.style.setProperty('--white-color-light', whiteColorLight);
    root.style.setProperty('--dark-color-light', darkColorLight);
}

bg2.addEventListener('click', () => {
    darkColorLight = '95%';
    whiteColorLight = '20%';
    lightColorLight = '15%';

    bg2.classList.add('active');
    bg1.classList.remove('active');
    bg3.classList.remove('active');
    changeBg();
})
bg3.addEventListener('click', () => {
    darkColorLight = '95%';
    whiteColorLight = '10%';
    lightColorLight = '0%';

    bg3.classList.add('active');
    bg1.classList.remove('active');
    bg2.classList.remove('active');
    changeBg();
})
bg1.addEventListener('click', () => {

    bg1.classList.add('active');
    bg2.classList.remove('active');
    bg3.classList.remove('active');
    window.location.reload();
})

document.querySelector('#imageBtn').addEventListener('click', function () {
    document.querySelector('#imageInput').click();
})