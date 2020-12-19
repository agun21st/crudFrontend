import Token from './Token';
import AppStorage from './AppStorage';

class User
{
    responseAfterLogin(res)
    {
        const access_token = res.token;
        const username = res.user.name;
        const role = res.user.role;

        if(Token.isValid(access_token))
        {
            AppStorage.store(access_token, username, role);
        }
    }

    hasToken()
    {
        const storeToken = localStorage.getItem('hashjwttempkey');

        if(storeToken)
        {
            return Token.isValid(storeToken)? true : false
        }
        return false;
    }

    loggedIn()
    {
        return this.hasToken();
    }

    logout()
    {
        AppStorage.clear();
    }

    name()
    {
        if(this.loggedIn())
        {
            return localStorage.getItem('accountname');
        }
    }
    role()
    {
        if(this.loggedIn())
        {
            let getRole = localStorage.getItem('IP_1**_1**_1**_2**');
            let before = getRole.replace("IpTrackingOfThis","")
            let after = before.replace("FromThisComputer","")
            return after
        }
    }

    id()
    {
        if(this.loggedIn())
        {
            const payload =  Token.payload(localStorage.getItem('hashjwttempkey'));
            return payload.sub;
        }
        return false;
    }
    getToken(){
        return localStorage.getItem('hashjwttempkey');
    }
}

export default User = new User();