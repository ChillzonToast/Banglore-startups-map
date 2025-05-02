from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from flask import redirect, make_response
import bcrypt

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Use environment variable for DB URL
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Company model
class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    icon = db.Column(db.String(500))
    color = db.Column(db.String(500))
    thumb = db.Column(db.String(500))
    linkedin = db.Column(db.String(200))
    website = db.Column(db.String(200))
    desc = db.Column(db.Text)
    category = db.Column(db.String(100))
    valuation_amount = db.Column(db.String(20))
    valuation_unit = db.Column(db.String(20))
    employees = db.Column(db.Integer)
    openings = db.Column(db.Integer)
    founders = db.relationship('Founder', backref='company', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'icon': self.icon,
            'color':self.color,
            'thumb': self.thumb,
            'linkedin': self.linkedin,
            'website': self.website,
            'desc': self.desc,
            'category': self.category,
            'valuation_amount': self.valuation_amount,
            'valuation_unit': self.valuation_unit,
            'employees': self.employees,
            'openings': self.openings,
            'founders': [founder.to_dict() for founder in self.founders]
        }

class Founder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    name = db.Column(db.String(100))
    role = db.Column(db.String(100))
    linkedin = db.Column(db.String(200))
    x_twitter = db.Column(db.String(200))
    pfp = db.Column(db.String(500))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'linkedin': self.linkedin,
            'x_twitter':self.x_twitter,
            'pfp': self.pfp
        }

def isAdmin(pwd):
    if pwd==None:
        return False
    return bcrypt.checkpw(pwd.encode('utf-8'),os.environ.get("ADMIN_PWD_HASHED").encode('utf-8'))

@app.route('/')
def index():
    companies = Company.query.all()
    companies_json = [company.to_dict() for company in companies]
    return render_template('index.html', companies=companies_json)

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/create', methods=['GET','POST'])
def create():
    if not isAdmin(request.cookies.get('password')):
        return redirect('/admin?redirect=/cleardb')
    try:
        data = request.get_json()
        new_company = Company(
            name=data.get('name'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            icon=data.get('icon'),
            color=data.get('color'),
            thumb=data.get('thumb'),
            linkedin=data.get('linkedin'),
            website=data.get('website'),
            desc=data.get('desc'),
            category=data.get('category'),
            valuation_amount=data.get('company-details', {}).get('valuation', [None])[0],
            valuation_unit=data.get('company-details', {}).get('valuation', [None, None])[1],
            employees=data.get('company-details', {}).get('employees'),
            openings=data.get('company-details', {}).get('openings')
        )
        db.session.add(new_company)
        db.session.flush()

        for founder_data in data.get('founders', []):
            founder = Founder(
                company_id=new_company.id,
                name=founder_data.get('name'),
                role=founder_data.get('role'),
                linkedin=founder_data.get('linkedin'),
                x_twitter=founder_data.get('x_twitter'),
                pfp=founder_data.get('pfp')
            )
            db.session.add(founder)

        db.session.commit()
        return jsonify({"message": "Company added successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route('/resetdb')
def resetdb():
    if not isAdmin(request.cookies.get('password')):
        return redirect('/admin?redirect=/resetdb')
    try:
        # Drop all tables
        db.drop_all()
        # Recreate all tables
        db.create_all()
        return "Database reset: all tables dropped and recreated."
    except Exception as e:
        db.session.rollback()
        return f"Error resetting database: {str(e)}"


@app.route('/cleardb')
def cleardb():
    if not isAdmin(request.cookies.get('password')):
        return redirect('/admin?redirect=/cleardb')
    try:
        # Delete all records from child table (Founder) first to maintain referential integrity
        Founder.query.delete()
        # Delete all records from parent table (Company)
        Company.query.delete()
        db.session.commit()
        return "Database cleared successfully!"
    except Exception as e:
        db.session.rollback()
        return f"Error clearing database: {str(e)}"

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'GET':
        return render_template('admin.html')
    elif request.method == 'POST':
        password = request.form.get('password')
        if isAdmin(password):
            redirect_url = request.args.get('redirect', '/')
        else :
            redirect_url = "/admin?redirect="+request.args.get('redirect', '/')
        response = make_response(redirect(redirect_url))
        response.set_cookie('password', password)
        return response