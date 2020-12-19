class Token
{
    isValid(token)
    {
        const payload = this.payload(token);

        if(payload){
            return payload.iss == "http://localhost:8000/api/login" || "http://localhost:8000/api/register"? true : false;
        }else{

            return false;
        }

    }

    payload(token)
    {
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    decode(payload){
        return JSON.parse(atob(payload))
    }
}

export default Token = new Token()