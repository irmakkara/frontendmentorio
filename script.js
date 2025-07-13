class AdviceApp {
	constructor({ buttonId, spanAdviceId, textId, adviceUrl }) {
		this.button = document.getElementById(buttonId);		
		this.spanID = document.getElementById(spanAdviceId);
		this.text = document.getElementById(textId);
		this.url = adviceUrl;
		this.http = new HttpService();
	}

    // When the button be clicked, this will call the http service class's method called get.
	init() {
		window.addEventListener("DOMContentLoaded", () => {
			this.button.addEventListener("click", async () => {
				this.button.classList.add("disabledButton");
				this.button.disabled = true;
				try {
					const response = await this.http.get(this.url);
					if (response.status === 200 && response.data?.slip) {
						AdviceHelper.updateElement(this.spanID, response.data.slip.id);
						AdviceHelper.updateElement(this.text,"\""+ response.data.slip.advice + "\"");
					} else {						
						console.error("The API did not return valid data:", response);
					}
				} catch (error) {
					console.error("Error while getting the advice:", error);
				}
				this.button.classList.remove("disabledButton");
				this.button.disabled = false;
			});
		});
	}

}

// There is helper a method for the system.
class AdviceHelper {
	// Updates the elements text contents with the new values.
	static updateElement(element, value) { 	
		if (element) element.textContent = value;
	}
}

const app = new AdviceApp({
	buttonId: "dice_button",
	spanAdviceId: "spanAdviceID",
	textId: "adviceTextID",
	adviceUrl: "https://api.adviceslip.com/advice"
});
app.init();