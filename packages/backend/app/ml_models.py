def process_wound_image(image_url):
    # Dummy logic: simulate segmentation/classification
    # In real: load model = tf.keras.models.load_model('models/wound_model.h5')
    # result = model.predict(preprocess_image(image_url))
    return {
        'wound_size': 5.2,  # cm^2
        'infection_score': 0.3,  # 0-1 scale
        'abnormality': 'Minor infection detected',
        'recommendations': [
            'Clean the wound with antiseptic',
            'Apply antibiotic ointment',
            'Monitor for signs of worsening infection'
        ],
        'severity': 'low',
        'confidence': 0.85
    }

def process_medicine_barcode(barcode):
    # Dummy logic: simulate medicine identification
    # In real: query medicine database or use ML model
    return {
        'name': 'Aspirin',
        'dosage': '500mg',
        'manufacturer': 'Generic Pharma',
        'expiry_date': '2025-12-31',
        'instructions': 'Take with food, once daily',
        'side_effects': ['Nausea', 'Headache', 'Stomach upset'],
        'interactions': ['Warfarin', 'Ibuprofen'],
        'warnings': ['Do not exceed recommended dosage']
    }
