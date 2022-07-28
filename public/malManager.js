const randomstring = require("randomstring");
const crypto = require("crypto");
const base64url = require("base64url");
const fetch = require("node-fetch");

const malConfig = {
    client_id: "0f3400fb91b7e7517cf4086aa70b60e4",
    client_secret: "a212566260fb929e3dc80f5b4fb384f5e702ba67df11cd6a2e41472d76572bbe",
    base_auth_url : "https://myanimelist.net/v1/oauth2/authorize",
    base_token_url: "https://myanimelist.net/v1/oauth2/token",
    user_code: "def502007a8dc934d22c12e4319b9cdae973c784ca2d368bdab600eea4d90884b71ddccc4b9f9ad9d9f8b61a44a226abf0d20110ee7651b27898c160a22834b42924cc6ad2df264742c1c3f1ce9cce4730bb071e20112af22482ebd3d41e8e77ca3dccfd3b7437926bb694ccf8894d1db654d2eb2c2bad045116ecb91128fc66154ead589a26a0e5496ac04cdec37e0666467a676ba88f60a4f3166db9c8577a6a63ca67d6d3538392b99760f62c9156b04e426375196d8241b1abd89d87cf51aca73f99d2ed6498df7a3568de4cc5f9d2fb0f9bdf53b97ca6040bc3dc4226d407f684cc27a5a5f472b8d4ce7ee38d57c2b5913b68b41d5345ee6bfebab0df12f63bb2381ef2b5ed32af9eae7d390a5d9786383101e0f23943f80f05b4f56744c713d978dac305eff2b8ff12a6737b6cb51a77f23e8ef1a6c4d4812538d6be40a8a30493a28e085567e6dce61b714f50d039c08ce9e27872e18c60b323e85a88d117be382157860802912a503c906cf100ab27d64d9efdb4b1844cb611f7593676d1bf6f5aa5961686c0e481abcdf61669c22dc3",
    redirect_url_auth : "https://animanga-series-visualizer.web.app/",
}
const clientConfig = {
    code_verifier: "04voN2ypUPxaZD22EBokgZY9bMI7IFV8C2BQossWCjQ"
};

function generateCode() {
    return base64url.fromBase64(crypto
        .createHash("sha256")
        .update(randomstring.generate(128))
        .digest("base64"));
}

function generateAuthUrl(){
    let code_challenge = generateCode()
    return `${malConfig.base_auth_url}?response_type=code&client_id=${malConfig.client_id}&code_challenge=${code_challenge}&state=RequestID42&redirect_uri=${clientConfig.redirect_url_auth}`;
}

function getAccessToken() {
    let httpFetchRequest = ` HTTP/1.1 Host: server.example.com Content-Type: application/x-www-form-urlencoded`
    let urlArgumentString = `client_id=${malConfig.client_id}
        &client_secret=${malConfig.client_secret}
        &grant_type=authorization_code
        &code=${malConfig.user_code}
        &code_verifier=${clientConfig.code_verifier}`

    let data = {
        grant_type:"authentication_code",
        code_verifier:clientConfig.code_verifier,
        code:malConfig.user_code,
        client_secret:malConfig.client_secret,
        client_id:malConfig.client_id
    }
    let header_data = {
        "grant_type":"authentication_code",
        "Host": "server.example.com",
        "Authorization": "Basic exampleEXAMPLEeXaMpLeExAmPlE",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    // let headers = new Headers(header_data);

    let options = {
        method: 'POST',
        body: data,
        headers: header_data,
    }
    console.log(options)
    fetch(`${malConfig.base_token_url}`, options).then(async res => {
        console.log(res);
        console.log(await res.json())
    })
    .catch(err => console.log(err));
}
getAccessToken()
// console.log(generateAuthUrl())