require('dotenv').config()

const resolve_base_url = () => {
    const base_url =  process.env.REACT_APP_BASE_URL;
    return base_url;
}
export default resolve_base_url;

// rememmber to add /api/v1 preffix 