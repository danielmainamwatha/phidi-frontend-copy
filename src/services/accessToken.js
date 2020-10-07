const accessTokenConfig = () => {
    const localStorage = window.localStorage;
    const accessToken = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    return config;
}

export default accessTokenConfig;