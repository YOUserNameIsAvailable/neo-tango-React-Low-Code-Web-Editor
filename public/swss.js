self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                console.log(event.request.url);
                // Check if the requested file is a JSON file
                if (event.request.url.endsWith('.json')) {

                    // return response.clone().json().then(json => {
                    //     // Modify the JSON content (for example, add a new property 'modified' to the JSON)

                    //     console.log("before:", json);
                    //     const modifiedJson = { ...json, modified: true };
                    //     console.log("after:", json);

                    //     // Create a new response with modified JSON content
                    //     return new Response(JSON.stringify(modifiedJson), {
                    //         status: response.status,
                    //         statusText: response.statusText,
                    //         headers: response.headers,
                    //     });
                    // });
                    // console.log("got json file", event.request.url);
                    return response;
                } else {
                    // console.log("Not a JSON file. URL:", event.request.url, response);
                    return response;
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            })
    );
});
