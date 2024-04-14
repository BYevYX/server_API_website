import {api} from './api.mjs';

document.addEventListener("DOMContentLoaded", function() {

    function addElement(key, value) {
        let newDiv = document.createElement("div");
        newDiv.textContent = `${key}: ${value}`;
        document.getElementById("container").appendChild(newDiv);
    }

    async function addInfo() {
        let needed = new Set(["login", "name", "company", "blog", "location", "email", "bio"]);
        let res = await fetch('/api/env');
        let user = await res.json();
        let map = await api(user.login, user.token);
        for (let key of needed) {
            addElement(key, map[key]);
        }
    }
    
    addInfo();
});
