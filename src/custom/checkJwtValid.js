
// function to parse checkJwtValid, and return the item required
const parseJwt = (token) =>{
    try {
        // decode a base64 string
        return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
        console.error(error); 
        return null; 
    }
}

export const checkJwtValid = (token)=>{
    if(!token) return false; 
    const decodedToken = parseJwt(token) ;
    if(!decodedToken || !decodedToken.exp){
        return false; 
    }
    return decodedToken.exp >= (Date.now()/1000); 
}