//u7SSUfvUS5dG3LIm3IdqyJRJg5joacRQKTFs3Ogi
postData = async (url = '') => {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'owner': 'x8874kVwx5EqCdd4oE15f265T4kjsdgcCJoKrayX'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const login = async () => {
    postData("https://m413.joss-coupet.eu/products")
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
            if (data.success) {
                console.log("called")
                res = `
                <div style="width: 90%; text-align: right;" >
                    Number of products: ${data.data.products.length}
                </div>
                `;
                for (let i = 0; i < data.data.products.length; i++) {
                    content = JSON.parse(data.data.products[i].content)
                    res = res + `
                        <div id="product" class="product">
                            <img src="${data.data.products[i].image}" style="width:100px; height:auto;">
                            <div style="margin-left: 10px;">
                                <h3>${content.name}</h3>
                                <p>Owner: ${data.data.products[i].owner}</p>
                                <p>ID: ${data.data.products[i]._id}</p>
                            </div>
                        </div>
                    `
                }
                console.log(res)
                let contentHtml = document.getElementById("content");
                contentHtml.innerHTML = res;
            }
        });
}

login()