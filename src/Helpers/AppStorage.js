class AppStorage
{
    storeToken(token)
    {
        localStorage.setItem('hashjwttempkey',token)
    }
    storeUser(user)
    {
        localStorage.setItem('accountname',user)
    }
    storeUserRole(role)
    {
        let setRole = 'IpTrackingOfThis'+role+'FromThisComputer'
        localStorage.setItem('IP_1**_1**_1**_2**',setRole)
    }
    store(token, user, role)
    {
        this.storeToken(token);
        this.storeUser(user);
        this.storeUserRole(role);
    }

    clear()
    {
        localStorage.removeItem('hashjwttempkey');
        localStorage.removeItem('accountname');
        localStorage.removeItem('IP_1**_1**_1**_2**');
    }

    getToken()
    {
        localStorage.getItem('hashjwttempkey');

    }
}

export default AppStorage = new AppStorage();