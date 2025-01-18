from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
from datetime import datetime
from flask import send_file
import io
import os

app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',  # Replace with your MySQL password
    'database': 'lor_db'
}

def get_db_connection():
    return pymysql.connect(**db_config)

@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        # Get form data
        data = request.form

        # Get files
        transcript = request.files['transcript']
        cv = request.files['cv']
        photo = request.files['photo']

        # Connect to database
        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert into database
        query = """
        INSERT INTO lor_requests (
            email, program, universities, deadline,
            first_name, middle_name, last_name, contact_number, gender,
            role, years_known, courses_taught, enrollment_batch, program_enrolled, passed_year,
            final_percentage, tentative_ranking, final_year_project,
            other_research, publications, extracurricular, professional_experience,
            strong_points, weak_points,
            transcript_file, transcript_filename,
            cv_file, cv_filename,
            photo_file, photo_filename
        ) VALUES (
            %s, %s, %s, %s,
            %s, %s, %s, %s, %s,
            %s, %s, %s, %s, %s, %s,
            %s, %s, %s,
            %s, %s, %s, %s,
            %s, %s,
            %s, %s,
            %s, %s,
            %s, %s
        )
        """

        values = (
            data.get('email'), data.get('program'), data.get('universities'), data.get('deadline'),
            data.get('first_name'), data.get('middle_name'), data.get('last_name'),
            data.get('contact_number'), data.get('gender'),
            data.get('role'), data.get('years_known'), data.get('courses_taught'),
            data.get('enrollment_batch'), data.get('program_enrolled'), data.get('passed_year'),
            data.get('final_percentage'), data.get('tentative_ranking'),
            data.get('final_year_project'),
            data.get('other_research'), data.get('publications'),
            data.get('extracurricular'), data.get('professional_experience'),
            data.get('strong_points'), data.get('weak_points'),
            transcript.read(), transcript.filename,
            cv.read(), cv.filename,
            photo.read(), photo.filename
        )

        cursor.execute(query, values)
        conn.commit()

        # Close database connection
        cursor.close()
        conn.close()

        return jsonify({
            'status': 'success',
            'message': 'Form submitted successfully'
        }), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'An error occurred while submitting the form'
        }), 500

@app.route('/download/<int:id>/<file_type>', methods=['GET'])
def download_file(id, file_type):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Get the file and filename based on type
        if file_type == 'transcript':
            query = "SELECT transcript_file, transcript_filename FROM lor_requests WHERE id = %s"
        elif file_type == 'cv':
            query = "SELECT cv_file, cv_filename FROM lor_requests WHERE id = %s"
        elif file_type == 'photo':
            query = "SELECT photo_file, photo_filename FROM lor_requests WHERE id = %s"
        else:
            return jsonify({'error': 'Invalid file type'}), 400

        cursor.execute(query, (id,))
        result = cursor.fetchone()

        if result is None:
            return jsonify({'error': 'File not found'}), 404

        file_data, filename = result

        # Create a file-like object in memory
        file_stream = io.BytesIO(file_data)

        # Get file extension
        file_extension = os.path.splitext(filename)[1]

        # Set appropriate MIME type
        if file_extension.lower() in ['.pdf']:
            mimetype = 'application/pdf'
        elif file_extension.lower() in ['.doc', '.docx']:
            mimetype = 'application/msword'
        elif file_extension.lower() in ['.jpg', '.jpeg', '.png']:
            mimetype = f'image/{file_extension[1:].lower()}'
        else:
            mimetype = 'application/octet-stream'

        cursor.close()
        conn.close()

        # Send file to browser
        return send_file(
            file_stream,
            download_name=filename,
            mimetype=mimetype,
            as_attachment=True
        )

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to download file'}), 500
if __name__ == '__main__':
    app.run(debug=True, port=5000)