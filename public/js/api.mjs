export async function api(login, token) {
    let res = await fetch(`https://api.github.com/users/${login}? access_key=${token}`);
    let user = await res.json();
    return user;
}

