require('dotenv').config()

const resolve_base_url = () => {
    const base_url =  process.env.REACT_APP_BASE_URL || 'https://phidiapp.herokuapp.com/api/v1';
    return base_url;
}
export default resolve_base_url;