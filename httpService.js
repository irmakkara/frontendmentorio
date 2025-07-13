/**
 * @class HttpService
 * A simple service class to send HTTP requests.
 */

// -- HTTP Request and Response -- 
class ApiRequest{
    constructor(url, method = HttpMethods.GET, headers = {}, body = null){
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = body;
    }
}

class ApiResponse{
    constructor(status, data){
        this.status = status;
        this.data = data;
    }
}
// -- HTTP Request and Response END --

// -- HTTP Methods --
class HttpMethods{
    static GET = "GET";
    static POST = "POST";
    static DELETE = "DELETE";
    static PUT = "PUT";
}
// -- HTTP Methods END --

// HTTP Service Class --
class HttpService{
    async send(apiRequest) {
		const options = {
			method: apiRequest.method,
			headers: apiRequest.headers,
		};

        // // DELETE requests usually work with only the url and ID, no body is required.
		if (apiRequest.body && [HttpMethods.POST, HttpMethods.PUT].includes(apiRequest.method)) {
			options.body = JSON.stringify(apiRequest.body);
			options.headers['Content-Type'] = 'application/json';
		}

		const response = await fetch(apiRequest.url, options);
		const data = await response.json();
		return new ApiResponse(response.status, data);
	}

    // get method for http service
	async get(url, headers = {}) {
		const request = new ApiRequest(url, HttpMethods.GET, headers);
		return this.send(request);
	}

    // post method for http service
    async post(url, body, headers = {}) {
	    const request = new ApiRequest(url, HttpMethods.POST, headers, body);
	    return this.send(request);
    }

    // put method for http service
    async put(url, body, headers = {}) {
        const request = new ApiRequest(url, HttpMethods.PUT, headers, body);
        return this.send(request);
    }

    // delete method for http service
    async delete(url, headers = {}) {
        const request = new ApiRequest(url, HttpMethods.DELETE, headers);
        return this.send(request);
    }
}
// HTTP Service Class END --
