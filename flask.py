import numpy as np
from flask import Flask  
from flask import render_template,url_for,request,redirect,flash
import os
from werkzeug import secure_filename
import using_umap as ump 
import using_sklearnTsne as sktsne 

# creates a Flask application, named app
app = Flask(__name__)
app.secret_key = 'random string'

UPLOAD_FOLDER = 'C:/Users/LOB4KOR/bharat/uploadfolder'
ALLOWED_EXTENSIONS = set(['txt'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


# def filehandle(Data):
# 	data=Data.readlines()
# 	a=[]
# 	for line in data:
# 		b=[float(val) for val in line.split()]
# 		a.append(np.array(b))
# 	npArray=np.array(a)
# 	return npArray

@app.route('/plot',methods = ['POST', 'GET'])
def addition():
	if request.method == 'POST':
		# check if the post request has the file part
		if 'file' not in request.files:
			flash('No file part')
			return render_template("inputfront.html",data1=None)
		file = request.files['file']
		# if user does not select file, browser also
        # submit an empty part without filename
		if file.filename == '':
			flash('No selected file')
			return render_template("inputfront.html",data1=None)

		if file and allowed_file(file.filename):
		#            filename = secure_filename(file.filename)
			filename = file.filename
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

			filepath=os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
			data1=ump.reduceDim(filepath)
			os.remove(filepath)
			return render_template("inputfront.html",data1={"data":data1})
	return render_template("inputfront.html",data1=None)



# run the application
if __name__ == "__main__":
    app.run(debug=True)
