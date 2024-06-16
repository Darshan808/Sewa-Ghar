from flask import Flask, request, jsonify
import pickle
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.environ['API_KEY'])

app = Flask(__name__)

# Load the model
try:
    with open('gemini_model.pkl', 'rb') as f:
        model = pickle.load(f)
    print(f"Model loaded successfully. Type: {type(model)}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# If model is None, try to create a new one
if model is None:
    try:
        model = genai.GenerativeModel('gemini-pro')
        print(f"New model created. Type: {type(model)}")
    except Exception as e:
        print(f"Error creating new model: {e}")

fixed_description = '''
Our project aims to become a go-to hub for finding reliable professionals in your area for all your needs, including home services, appliance and electronics repairs, beauty services, and more at the click of a button.

Imagine a scenario where a tap breaks in your room or your air conditioner malfunctions. Typically, finding a plumber or an AC repair technician would involve asking neighbors or searching through directories. However, our proposed app streamlines this process by connecting users directly with service providers with just a few clicks. Users simply post a request for the in-home services they require with a description, location, preferred price quotation, and relevant images. Registered and verified local professionals in the relevant field are notified of this request, which they can accept or counter with upmost ease. This concept not only enhances convenience for users but also provides a platform for local service providers to expand their reach and grow their businesses.

By leveraging technology to facilitate these connections, our project not only addresses practical challenges faced by individuals but also contributes to the growth of the local economy. Through efficient service delivery and increased accessibility, we envision our project making a positive impact on both businesses and consumers in Nepal. With this innovative idea, Our project aims to create more job opportunities by connecting local service providers with users, thus fostering economic growth and employment
Our project aims to become a go-to hub for finding reliable professionals in your area for all your needs, including home services, appliance and electronics repairs, beauty services, and more at the click of a button.


Imagine a scenario where a tap breaks in your room or your air conditioner malfunctions. Typically, finding a plumber or an AC repair technician would involve asking neighbors or searching through directories. However, our proposed app streamlines this process by connecting users directly with service providers with just a few clicks. Users simply post a request for the in-home services they require with a description, location, preferred price quotation, and relevant images. Registered and verified local professionals in the relevant field are notified of this request, which they can accept or counter with upmost ease. This concept not only enhances convenience for users but also provides a platform for local service providers to expand their reach and grow their businesses.

By leveraging technology to facilitate these connections, our project not only addresses practical challenges faced by individuals but also contributes to the growth of the local economy. Through efficient service delivery and increased accessibility, we envision our project making a positive impact on both businesses and consumers in Nepal. With this innovative idea, Our project aims to create more job opportunities by connecting local service providers with users, thus fostering economic growth and employment .

The listed services in the apps are (electrical, plumbing, carpenter, painter, home salon, makeup, ac repairs, shift home, construction, house cleaning, pest control, laundry, gardening, house help, handyman) and if the user asks for the services other than this you can reply them to go to custom services and add the services as they like.

If you talk about the app, we have different services that are listed as i mentioned earlier. And user can choose the service they want and fill up the description and location and the price and images can also be attached threre and they want to pay for the service. And the service provider will get the notification and they can accept or counter the request with the price they want to charge for the service. And the user can choose the service provider they want to get the service from. And the user can also rate the service provider after the service is done. And the user can also request for the custom services. And the user can also see the working hours of the service provider. And the user can also see the reviews of the service provider. And the user can also see the services provided by the service provider. And the user can also see the location of the service provider. And the user can also see the price of the service provider. And the user can also see the rating of the service provider. And the user can also see the contact number of the service provider. 
And if the user asks weird questions then reply them using your common sense. But you should give the answer in a single sentence as a normal chatbot does.

And also remember to address the solution of the users by giving advice that they can find the solution of theirt problem in SewaGhar. If the solution are not listed there then they can also request for custom solutions.

Based upon the context above only give the answer to the point do not try to repeat the things that I told you earlier just act like a real chatbot that gives the answer to the point for question below:
Remember do not say you don't have access to information, your whole dictionary and the entire corpus of information is the context that I provided you earlier so just act like a chatbot.
'''

@app.route('/chatbot', methods=['POST'])

@app.route('/chatbot', methods=['POST'])
def generate_response():
    if request.method == 'POST':
        try:
            data = request.get_json()
            if 'prompt' not in data:
                return jsonify({'error': 'No prompt provided'}), 400

            prompt = data['prompt']
            prompt_with_desc = f"{fixed_description} {prompt}".strip()

            if model is None:
                return jsonify({'error': 'Model not available'}), 500

            response = model.generate_content(prompt_with_desc)

            # Extract text from response
            if response.parts:
                text = response.parts[0].text
            else:
                text = "Sorry, I couldn't generate a response."

            return jsonify({'response': text})

        except Exception as e:
            return jsonify({'error': str(e)}), 500


    if request.method == 'POST':
        try:
            data = request.get_json()
            if 'prompt' not in data:
                return jsonify({'error': 'No prompt provided'}), 400

            prompt = data['prompt']
            prompt_with_desc = f"{fixed_description} {prompt}".strip()

            if model is None:
                return jsonify({'error': 'Model not available'}), 500

            response = model.generate_content(prompt_with_desc)

            return jsonify({'response': response.text})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


    #curl -X POST http://127.0.0.1:5000/chatbot \
    #  -H "Content-Type: application/json" \
    #  -d '{"prompt": "I need a plumber"}'