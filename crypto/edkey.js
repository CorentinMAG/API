export class GenerateEncryptDecryptKey{
    /**
     * @constructor
     * @param algo {string} - The algorithm to use
     */
    constructor(algo){
        this.option="";
        this.algo=algo;
        this.enc_option="";
        this.dec_option="";
        this._algo=["RSA-OAEP","AES-CTR","AES-CBC","AES-GCM"];
        this._encryptoptions=[
            {"name":"RSA-OAEP"},
            {"name":"AES-CTR","counter":window.crypto.getRandomValues(new Uint8Array(16)),"length":64},
            {"name":"AES-CBC","iv":window.crypto.getRandomValues(new Uint8Array(16))},
            {"name":"AES-GCM","iv":window.crypto.getRandomValues(new Uint8Array(12))}
            ];
        this._options=[{
            "name":"RSA-OAEP", "modulusLength": 4096, "publicExponent": new Uint8Array([1, 0, 1]), "hash": "SHA-256"},
            {"name":"AES-CTR", "length":256},
            {"name":"AES-CBC", "length":256},
            {"name":"AES-GCM", "length":256}
            ];

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
        let key =window.crypto.subtle.generateKey(this.option,true,["encrypt","decrypt"]);
        return key
    }

    /**
     *
     * @param algo {string} - The algo to use
     * @param key {CryptoKey} - The public key
     * @param data {string,text} - The data to encrypt
     * @constructor
     * @return {promise}
     */
    Encrypt(algo,key,data){
        if(this._algo.includes(algo)===false){
            throw new Error('Algorithms must be '+this._algo.join(','))
        }
        if(data==="" || typeof data !=="string"){
            throw new Error('data argument must be string or text')
        }
        let enc = new TextEncoder();
        let message= enc.encode(data);
        this._algo.forEach((algo,index)=>{
            if(this.algo===algo){
                this.enc_option=this._encryptoptions[index];
            }
        });
        let encrypt = window.crypto.subtle.encrypt(this.enc_option,key,message);
        return encrypt
    }

    /**
     *
     * @param algo {string} - The algo to use
     * @param key {CryptoKey} - The private key to use
     * @param data {BufferSource} - The data to decrypt
     * @constructor
     * @return {promise}
     */
    Decrypt(algo,key,data){
        if(this._algo.includes(algo)===false){
            throw new Error('Algorithms must be '+this._algo.join(','))
        }
        if(typeof data !=="object"){
            throw new Error('data must be an ArrayBuffer')
        }
        let enc = new TextEncoder();
        this._algo.forEach((algo,index)=>{
            if(this.algo===algo){
                this.dec_option=this._encryptoptions[index];
            }
        });
        let decrypt = window.crypto.subtle.decrypt(this.dec_option,key,data);
        return decrypt
    }
}