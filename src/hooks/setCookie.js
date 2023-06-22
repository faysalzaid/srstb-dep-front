import Cookie from 'js-cookie'


const setCookie = (cookiename, usrin) => {
    return Cookie.set(cookiename, usrin, {
        expires: 7,
        sameSite: 'Lax',
        // secure: false,

    })
}


export default setCookie