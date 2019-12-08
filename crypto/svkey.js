export class GenerateSignVerifyKey{
    /**
     * @constructor
     * @param algo {string} - The algorithm to use
     */
    constructor(algo){
        this.option="";
        this.sign_option="";
        this.verify_option="";
        this.algo=algo;
        this._algo=["RSASSA-PKCS1-V1_5","RSA-PSS","ECDSA","HMAC"];
        this._sign=[{
            "name":"RSASSA-PKCS1-V1_5"},
            {"name":"RSA-PSS","saltLength":32},
            {"name":"ECDSA","hash":{"name":"SHA-384"}},
            {"name":"HMAC"}];
        this._options=[{
            "name":"RSASSA-PKCS1-V1_5",
            "modulusLength": 2048,
            "publicExponent": new Uint8Array([1, 0, 1]),
            "hash": "SHA-256"
        }
            ,{
                "name":"RSA-PSS",
                "modulusLength":2048,
                "publicExponent":new Uint8Array([1,0,1]),
                "hash":"SHA-256"
            }
            ,{
                "name":"ECDSA",
                "namedCurve":"P-384"
            },{
                "name":"HMAC",
                "hash":{name:"SHA-512"}
            }];

        if(this._algo.includes(this.algo)===false){
            throw new Error('Algorithms must be '+this._algo.join(','))
        }
        this._algo.forEach((algo,index)=>{
            if(this.algo===algo){
                this.option=this._options[index];
            }
        })
    }

    /**
     *
     * Generate the key for encryption and decryption
     * A single key if the chosen algorithm is symmetric or 2 keys if it's asymmetric
     * @return {promise}
     */
    Generate(){
        let key =window.crypto.subtle.generateKey(this.option,true,["sign","verify"]);
        return key
    }
    /***
     * Sign the given text with the given key
     * @param algo {string} - The algorithm to use
     * @param text {string,text} - The text to be signed
     * @param key {CryptoKey} - The key to sign
     * @constructor
     * @return {promise}
     * */
    Sign(algo,text,key){
        if(this._algo.includes(algo)===false){
            throw new Error('Algorithms must be '+this._algo.join(','))
        }
        if(text==="" || typeof text !=="string"){
            throw new Error('Second argument of the Sign function must be the string to sign')
        }
        let enc = new TextEncoder();
        let message= enc.encode(text);
        this._algo.forEach((algo,index)=>{
            if(this.algo===algo){
                this.sign_option=this._sign[index];
            }
        });
        let signed = window.crypto.subtle.sign(this.sign_option,key,message);
        return signed
    }

    /**
     *
     * @param algo {string} - The algorithm to use
     * @param key {CryptoKey} - The public key to use
     * @param signature {ArrayBuffer} - The signature
     * @param data {string,text} - contains the data whose signature is to be verified
     * @return {promise}
     * @constructor
     */
    Verify(algo,key,signature,data){
        if(this._algo.includes(algo)===false){
            throw new Error('Algorithms must be '+this._algo.join(','))
        }
        if(data==="" || typeof data !=="string"){
            throw new Error('data must be a string or text to Verify')
        }
        let enc = new TextEncoder();
        let message = enc.encode(data)
        this._algo.forEach((algo,index)=>{
            if(this.algo===algo){
                this.verify_option=this._sign[index];
            }
        });
        let verify = window.crypto.subtle.verify(this.verify_option,key,signature,message);
        return verify
    }
}