import os
import sqlalchemy
import numpy as np
import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import create_engine , func
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
	# countries_list = []
	for result in countries_results:
		countries_name[result[0]] = result[1]
		# countries_list.append(countries_name)

	return jsonify([countries_name])

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
		Happiness_year.Region,
	]

	year_results = db.session.query(*year_sel).all()




	happiness_year_data_list = []
	for result in year_results:
		happiness_year_data = {}
		happiness_year_data['Country']= result[1]
		happiness_year_data['Code'] = result[11]
		happiness_year_data['Region'] = result[14]
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

@app.route("/region/<year>")
def region_happiness(year):
	years ={
	'2015': Happiness_2015,
	'2016': Happiness_2016,
	'2017': Happiness_2017,
	}
	Happiness_year = years.get(year)

	avg_region_results = db.session.query(
		func.avg(Happiness_year.HappinessScore),
		Happiness_year.Region
		).group_by(
		Happiness_year.Region
		).all()

	avg_region_Happiness ={}
	for result in avg_region_results:
		avg_region_Happiness[result[1]] = result[0]

	return(jsonify(avg_region_Happiness))
		
@app.route("/test")
def test():
	

	test_data = [
	["Date","Campaign Domain","Total Sessions","Mobile Sessions","Desktop Sessions","Mobile Sessions %","Distinct IPs",
	"Distinct Mobile IPs","Distinct Desktop IPs","Distinct Mobile IPs %","Searches","Clicks","Estimated GrossRevenue",
	"Revenue Per Session","Revenue Per Search","Revenue Per IP","Revenue Per Click","Clicks Per Session %"],
	["2015-12-08","openmail.com",15834,4477,11356,28.27,12021,3430,8591,28.53,16907,524,288.45,0.02,0.02,0.02,0.55,3.31],
	["2015-12-07","openmail.com",217559,61523,156036,28.28,165173,47131,118041,28.53,232307,7201,31895.98,0.15,0.14,0.19,4.43,3.31],
	["2015-12-06","openmail.com",201890,57092,144797,28.28,153276,43737,109539,28.53,215575,6683,8438.28,0.04,0.04,0.06,1.26,3.31],
	["2015-12-05","openmail.com",11491,3249,8241,28.27,8724,2489,6234,28.53,12269,380,837.1,0.07,0.07,0.1,2.2,3.31],
	["2015-12-04","openmail.com",644322,182207,462115,28.28,489174,139585,349589,28.53,687999,21328,24539.44,0.04,0.04,0.05,1.15,3.31],
	["2015-12-03","openmail.com",114580,32402,82178,28.28,86990,24822,62167,28.53,122347,3792,2036.99,0.02,0.02,0.02,0.54,3.31],
	["2015-12-02","openmail.com",718986,203321,515665,28.28,545860,155760,390099,28.53,767724,23800,94094.46,0.13,0.12,0.17,3.95,3.31]
	]

	return(jsonify(test_data))

if __name__ =="__main__":
	app.run(debug = True)