from flask import Blueprint, request, jsonify, send_from_directory, current_app
import os
from openai import OpenAI
import requests
from .ml_models import process_wound_image  # Sample ML

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return jsonify({
        'message': 'Medi-AI Suite Backend API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'health': '/api/health',
            'wound_detection': '/api/ml/wound',
            'medicine_scan': '/api/ml/medicine',
            'chat': '/api/chat',
            'location': '/api/location',
            'nearby_hospitals': '/api/location/hospitals',
            'nearby_pharmacies': '/api/location/pharmacies'
        }
    })

@main.route('/favicon.ico')
def favicon():
    return '', 204  # Return empty response with 204 No Content

@main.route('/api/ml/wound', methods=['POST'])
def ml_wound():
    data = request.json
    image_url = data.get('imageUrl')
    # Process with ML
    result = process_wound_image(image_url)
    return jsonify(result)

@main.route('/api/ml/medicine', methods=['POST'])
def ml_medicine():
    data = request.json
    barcode = data.get('barcode')
    # Process medicine identification
    result = {
        'name': 'Sample Medicine',
        'dosage': '500mg',
        'instructions': 'Take with food',
        'side_effects': ['Nausea', 'Headache']
    }
    return jsonify(result)

@main.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    
    try:
        # Initialize OpenAI client with API key
        client = OpenAI(api_key=current_app.config['OPENAI_API_KEY'])
        
        # Call OpenAI API with new syntax
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful medical AI assistant. Provide accurate, safe medical information and always recommend consulting healthcare professionals."},
                {"role": "user", "content": message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        
        result = {
            'response': ai_response,
            'confidence': 0.9,
            'timestamp': '2024-01-01T00:00:00Z',
            'model': 'gpt-3.5-turbo'
        }
        
    except Exception as e:
        # Fallback response if OpenAI API fails
        # Provide a helpful fallback message for common medical questions
        fallback_responses = {
            'cold': 'Common cold symptoms include: runny or stuffy nose, sore throat, cough, congestion, slight body aches, mild headache, sneezing, low-grade fever, and general malaise. Rest, stay hydrated, and consider over-the-counter medications. However, please consult with a healthcare professional for proper diagnosis and treatment.',
            'fever': 'Fever is generally a temperature above 100.4°F (38°C). It can be caused by various conditions including infections. Stay hydrated, rest, and use fever-reducing medications if recommended. Seek medical attention if fever persists for more than 3 days or exceeds 103°F (39.4°C).',
            'headache': 'Headaches can have many causes. Stay hydrated, rest in a quiet dark room, and consider over-the-counter pain relievers. If headaches are severe, persistent, or accompanied by other symptoms, please consult a healthcare professional.',
        }
        
        # Try to match keywords for fallback response
        response_text = None
        for keyword, response in fallback_responses.items():
            if keyword in message.lower():
                response_text = response
                break
        
        if not response_text:
            response_text = f'I apologize, but the AI service is temporarily unavailable. Your question was: "{message}". For medical advice and information, please consult with a qualified healthcare professional who can provide personalized guidance based on your specific situation.'
        
        result = {
            'response': response_text,
            'confidence': 0.7,
            'note': 'This is a fallback response. The AI service is temporarily unavailable.',
            'timestamp': '2024-01-01T00:00:00Z'
        }
    
    return jsonify(result)

@main.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'version': '1.0.0'})

@main.route('/api/location', methods=['POST'])
def get_location_info():
    """Get location information based on coordinates"""
    data = request.json
    lat = data.get('latitude')
    lng = data.get('longitude')
    
    if not lat or not lng:
        return jsonify({'error': 'Latitude and longitude are required'}), 400
    
    try:
        # Use Google Geocoding API to get location details
        geocoding_url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={current_app.config['GOOGLE_MAPS_API_KEY']}"
        response = requests.get(geocoding_url)
        geocoding_data = response.json()
        
        if geocoding_data['status'] == 'OK':
            result = geocoding_data['results'][0]
            return jsonify({
                'address': result['formatted_address'],
                'location_type': result['types'],
                'place_id': result['place_id'],
                'coordinates': {'lat': lat, 'lng': lng}
            })
        else:
            return jsonify({'error': 'Unable to get location information'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main.route('/api/location/hospitals', methods=['POST'])
def get_nearby_hospitals():
    """Get nearby hospitals based on coordinates"""
    data = request.json
    lat = data.get('latitude')
    lng = data.get('longitude')
    radius = data.get('radius', 5000)  # Default 5km radius
    
    if not lat or not lng:
        return jsonify({'error': 'Latitude and longitude are required'}), 400
    
    try:
        # Use Google Places API to find nearby hospitals
        places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&type=hospital&key={current_app.config['GOOGLE_MAPS_API_KEY']}"
        response = requests.get(places_url)
        places_data = response.json()
        
        if places_data['status'] == 'OK':
            hospitals = []
            for place in places_data['results']:
                hospitals.append({
                    'name': place['name'],
                    'address': place.get('vicinity', 'Address not available'),
                    'rating': place.get('rating', 'No rating'),
                    'place_id': place['place_id'],
                    'coordinates': place['geometry']['location']
                })
            
            return jsonify({
                'hospitals': hospitals,
                'count': len(hospitals),
                'search_radius': radius
            })
        else:
            return jsonify({'error': 'Unable to find nearby hospitals'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main.route('/api/location/pharmacies', methods=['POST'])
def get_nearby_pharmacies():
    """Get nearby pharmacies based on coordinates"""
    data = request.json
    lat = data.get('latitude')
    lng = data.get('longitude')
    radius = data.get('radius', 3000)  # Default 3km radius
    
    if not lat or not lng:
        return jsonify({'error': 'Latitude and longitude are required'}), 400
    
    try:
        # Use Google Places API to find nearby pharmacies
        places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&type=pharmacy&key={current_app.config['GOOGLE_MAPS_API_KEY']}"
        response = requests.get(places_url)
        places_data = response.json()
        
        if places_data['status'] == 'OK':
            pharmacies = []
            for place in places_data['results']:
                pharmacies.append({
                    'name': place['name'],
                    'address': place.get('vicinity', 'Address not available'),
                    'rating': place.get('rating', 'No rating'),
                    'place_id': place['place_id'],
                    'coordinates': place['geometry']['location']
                })
            
            return jsonify({
                'pharmacies': pharmacies,
                'count': len(pharmacies),
                'search_radius': radius
            })
        else:
            return jsonify({'error': 'Unable to find nearby pharmacies'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500
