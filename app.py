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

@app.route("/countries")
def countries():
	countries_sel = [Countries.country]
	countries_results = db.session.query(*countries_sel).all()

	countries_name = {}
	countries_list = []
	for result in countries_results:
		countries_list.append(result[0])
	countries_name['countries'] = countries_list

	return jsonify(countries_name)

if __name__ =="__main__":
	app.run(debug = True)