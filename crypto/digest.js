export class Digest{
    /**
     * Class to use if you want to hash data
     * @constructor
     * @param {string} algo -The algorithm to be used
     * @param {string,text} text - The data to be digested
     **/
    constructor(algo,text){
        this.algo=algo;
        this.text=text;
        this._algo=["SHA-256","SHA-384","SHA-512"];

        if(this._algo.includes(this.algo)===false || this.algo===""){
            throw new Error('You must choose amongst SHA-256,SHA-384 or SHA-512 algorithms')
        }
        if(this.text==="" || this.text===null ){
            throw new Error('You must enter a text to be digest')
        }
    }
    /**
     * If you want a hexadecimal representation of the hash
     * @return {promise}
     **/
    async DigestDataInHexa(){
        const msgUint8 = new TextEncoder().encode(this.text);
        const hashBuffer = await crypto.subtle.digest(this.algo, msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    /**
     * Binary representation of the hash
     * @return {promise}
     **/
    async DigestData(){
        const encoder = new TextEncoder();
        const data = encoder.encode(this.text);
        const hash = await crypto.subtle.digest(this.algo, data);
        return hash;
    }
}
