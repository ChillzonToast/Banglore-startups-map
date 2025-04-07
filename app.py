from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create', methods=['POST'])
def create():
    try:
        new_company = request.get_json()
        
        with open('static/companies.json', 'r') as f:
            companies = json.load(f)
            
        companies.append(new_company)
        
        with open('static/companies.json', 'w') as f:
            json.dump(companies, f, indent=4)
            
        return {"message": "Company added successfully"}, 200
        
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True)
