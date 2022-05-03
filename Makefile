lab4:
	awk -f script.awk data_lab4/data.csv 
	sqlite3 Lab4DB.db < SQLscripts.sql
