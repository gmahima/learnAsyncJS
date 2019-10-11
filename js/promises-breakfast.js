
let order = true;


const breakfastPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        if(order) {
            resolve('order made');
        }
        else{
            reject(Error('something went wrong'));
        }
    },5000);

})
breakfastPromise.then(val => console.log(val)).catch(err => console.log(err));