

import axios from 'axios';

var baseUrl ="http://localhost:8000/"




export function getCode() {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl+`getText`)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(console.log(error))
            })
    })
    
}



