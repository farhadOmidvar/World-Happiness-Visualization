import os
import sqlalchemy
import numpy as np
import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from flask import Flask, jsonify, render_template


app = Flask(__name__)

#############################################
# Database Setup
#############################################

app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/db/world_happiness.sqlite"
db = SQLAlchemy(app)

Base = automap_base()

Base.prepare(db.engine,reflect=True)


Happiness_2015 = Base.classes.happiness_2015
Happiness_2016 = Base.classes.happiness_2016
Happiness_2017 = Base.classes.happiness_2017
Countries = Base.classes.countries

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/years")
def years():
	return jsonify(['2015','2016','2017'])

@app.route("/countries")
def countries():
	countries_sel = [Countries.country,Countries.code]
	countries_results = db.session.query(*countries_sel).all()

	countries_name = {}
	countries_list = []
	for result in countries_results:
		countries_name[result[0]] = result[1]
		countries_list.append(countries_name)

	return jsonify({"Data" : countries_list})

@app.route("/<year>")
def countries_happiness_year(year):
	years ={
	'2015': Happiness_2015,
	'2016': Happiness_2016,
	'2017': Happiness_2017,
	}
	Happiness_year = years.get(year)

	year_sel = [
		Happiness_year.country_id,
		Happiness_year.Country,
		Happiness_year.HappinessRank,
		Happiness_year.HappinessScore,
		Happiness_year.Economy_GDPperCapita,
		Happiness_year.Family,
		Happiness_year.Health_LifeExpectancy,
		Happiness_year.Freedom,
		Happiness_year.Trust_GovernmentCorruption,
		Happiness_year.Generosity,
		Happiness_year.DystopiaResidual,
		Happiness_year.Code,
		Happiness_year.Latitude,
		Happiness_year.Longitude,
	]

	year_results = db.session.query(*year_sel).all()




	happiness_year_data_list = []
	for result in year_results:
		happiness_year_data = {}
		happiness_year_data['Country']= result[1]
		happiness_year_data['Code'] = result[11]
		happiness_year_data['country_id'] = result[0]
		happiness_year_data['HappinessRank'] = result[2]
		happiness_year_data['HappinessScore'] = result[3]
		happiness_year_data['Economy_GDPperCapita'] = result[4]
		happiness_year_data['Family'] = result[5]
		happiness_year_data['Health_LifeExpectancy'] = result[6]
		happiness_year_data['Freedom'] = result[7]
		happiness_year_data['Trust_GovernmentCorruption'] = result[8]
		happiness_year_data['Generosity'] = result[9]
		happiness_year_data['DystopiaResidual'] = result[10]
		happiness_year_data['Latitude'] = result[12]
		happiness_year_data['Longitude'] = result[13]
		happiness_year_data_list.append(happiness_year_data)
	
	
	return jsonify(happiness_year_data_list)

	

@app.route("/<year>/<country>")
def countries_happiness(year,country):
	years ={
	'2015': Happiness_2015,
	'2016': Happiness_2016,
	'2017': Happiness_2017,
	}
	Happiness_year = years.get(year)

	sel = [
		Happiness_year.country_id,
		Happiness_year.Country,
		Happiness_year.HappinessRank,
		Happiness_year.HappinessScore,
		Happiness_year.Economy_GDPperCapita,
		Happiness_year.Family,
		Happiness_year.Health_LifeExpectancy,
		Happiness_year.Freedom,
		Happiness_year.Trust_GovernmentCorruption,
		Happiness_year.Generosity,
		Happiness_year.DystopiaResidual,
		Happiness_year.Code,
		Happiness_year.Latitude,
		Happiness_year.Longitude,
	]

	results = db.session.query(*sel).filter(Happiness_year.Country == country).all()

	happiness_data = {}
	for result in results:
		happiness_data['year'] = year
		happiness_data['country_id'] = result[0]
		happiness_data['Country'] = result[1]
		happiness_data['Code'] = result[11]
		happiness_data['HappinessRank'] = result[2]
		happiness_data['HappinessScore'] = result[3]
		happiness_data['Economy_GDPperCapita'] = result[4]
		happiness_data['Family'] = result[5]
		happiness_data['Health_LifeExpectancy'] = result[6]
		happiness_data['Freedom'] = result[7]
		happiness_data['Trust_GovernmentCorruption'] = result[8]
		happiness_data['Generosity'] = result[9]
		happiness_data['DystopiaResidual'] = result[10]
		happiness_data['Latitude'] = result[12]
		happiness_data['Longitude'] = result[13]

	return jsonify(happiness_data)


if __name__ =="__main__":
	app.run(debug = True)