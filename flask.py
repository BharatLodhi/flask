

from flask import Flask  
from flask import render_template,url_for,request,redirect
import output

# creates a Flask application, named app
app = Flask(__name__)

# a route where we will display a welcome message via an HTML template
@app.route('/')
def hello():  
    #return "hello brothers"
    return render_template('new.html')

# run the application
@app.route('/add',methods = ['POST', 'GET'])
def addition():
   if request.method == 'POST':
      ip=request.form
      finalsum=output.addition(ip)
      return render_template("new.html",finalsum=finalsum)

if __name__ == "__main__":
    app.run(debug=True,port=5006)
