function scrollToSection(sectionId) {
    let section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function setToCookies() {

    var randomUserData = getRandomUserDataFromCookies();

    let fullName = document.querySelector('input[name="fullName"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let subject = document.querySelector('input[name="subject"]').value;

    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);

    let cookieLength = getCookiesLength();
    let objectsInCookies = cookieLength / 3;

    document.cookie = "fullName" + (objectsInCookies + 1) + "=" + encodeURIComponent(fullName) + "; expires=" + now.toUTCString();
    document.cookie = "email" + (objectsInCookies + 1) + "=" + encodeURIComponent(email) + "; expires=" + now.toUTCString();
    document.cookie = "subject" + (objectsInCookies + 1)  + "=" + encodeURIComponent(subject) + "; expires=" + now.toUTCString();

    if (randomUserData) {
        alert("You are secret Santa to\n" + randomUserData);
    } else {
        alert("Unfortunately, there are no users for secret santa yet! We will send you the user data soon!");
    }
}

function getRandomUserDataFromCookies() {
    let allCookies = document.cookie.split(';');
    console.log(allCookies);
    setTimeout(() => {
        
    }, 5000);
    if (getCookiesLength() == 0) {
        return null;
    }

    let randomCookie = Math.floor(Math.random() * (getCookiesLength() / 3));

    let output = '';

    const attributes = ['Full Name', 'Email', 'Subject'];

    for (let i = randomCookie * 3, j = 0; i < randomCookie * 3 + 3; i++) {
        output += attributes[j] + ': ' + decodeURIComponent(allCookies[i]).split('=')[1] + '\n';
        j++;
    }

    return output;
}

function deleteCookies() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    console.log(cookies);
    console.log(`cookies length: ${getCookiesLength()}`);
}

function getCookiesLength() { 
    var cookieString = document.cookie; 
    var cookies = cookieString.split(';');
    if (cookies == '')
    {
        return 0;
    } 
    return cookies.length; 
  } 