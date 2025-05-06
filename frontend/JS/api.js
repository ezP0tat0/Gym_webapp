var defaultUrl = "https://localhost:7289/api/";

async function postData(url = "", data = {}, needAuth = true) {
    const response = await fetch(defaultUrl + url, {
        method: "POST",
        cache: "no-cache", 
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + (needAuth ? JSON.parse(sessionStorage.getItem("data")).token : null),
        },body: testJSON(data) ? data : JSON.stringify(data), 
        
    });
    console.log(response);
    if (response.status === 401 || response.status === 403) {
        logout();
    }
    try {
        return await response.json(); 
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return {}; 
    }
}
async function patchData(url = "", data = {}, needAuth = true) {
    const response = await fetch(defaultUrl + url, {
        method: "PATCH", 
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + (needAuth ? JSON.parse(sessionStorage.getItem("data")).token : null),
        },
         body: testJSON(data) ? data : JSON.stringify(data), // body data type must match "Content-Type" header
        
    });
    console.log(response);
    if (response.status === 401 || response.status === 403) {
        logout();
    }
    try {
        return await response.json();
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return {};
    }
}

async function getData(url = "", needAuth = true) {
    const response = await fetch(defaultUrl + url, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (needAuth ? JSON.parse(sessionStorage.getItem("data")).token : null),
        }, });
    if (response.status === 401 || response.status === 403) {
        logout();
    }
    return response.json();
}

function testJSON(text) {
    if (typeof text !== "string") {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}


