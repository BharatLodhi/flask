import numpy as np
from flask import Flask  
from flask import render_template,url_for,request,redirect,flash
import os
from werkzeug import secure_filename
import using_umap as ump 
import using_sklearnTsne as sktsne 
import time

# creates a Flask application, named app
app = Flask(__name__)
app.secret_key = 'random string'

UPLOAD_FOLDER = 'C:/Users/LOB4KOR/bharat/uploadfolder'
ALLOWED_EXTENSIONS = set(['txt'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/plot',methods = ['POST', 'GET'])
def selectumaptsne():
  if request.method=='POST':
    select=request.form['selected']
    if(select=="Umap"):
      return redirect(url_for('using_Umap'))
    else:
      return redirect(url_for('using_Tsne'))
  return render_template("comman.html")


@app.route('/plotUmap',methods = ['POST', 'GET'])
def using_Umap():
  if request.method == 'POST':
    # check if the post request has the file part
    if 'file' not in request.files:
      flash('No file part')
      return render_template("umap.html",data1=None)
    file = request.files['file']
    # if user does not select file, browser also
        # submit an empty part without filename
    if file.filename == '':
      flash('No selected file')
      return render_template("umap.html",data1=None)
    mndist=0.1
    neighbours=15
    s=request.form
    if s['mndist']!='':
      mndist=float(s['mndist'])
    if s['neighbours']!='':
      neighbours=int(s['neighbours'])
    # return render_template("inputfront.html",data1=None,mndist=mndist,neighbours=neighbours)
    if file and allowed_file(file.filename):
    #            filename = secure_filename(file.filename)
      filename = file.filename
      file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

      filepath=os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
      time1=time.time()
      data1=ump.reduceDim(filepath,mndist,neighbours)
      timeTaken=round(time.time()-time1,3);
      os.remove(filepath)
      return render_template("umap.html",data1={"data":data1},timeTaken=timeTaken)
  return render_template("umap.html",data1=None)

@app.route('/plotTsne',methods = ['POST', 'GET'])
def using_Tsne():
  if request.method == 'POST':
    # check if the post request has the file part
    if 'file' not in request.files:
      flash('No file part')
      return render_template("tsne.html",data1=None)
    file = request.files['file']
    # if user does not select file, browser also
        # submit an empty part without filename
    if file.filename == '':
      flash('No selected file')
      return render_template("tsne.html",data1=None)
    iterations=1000
    perplexity=30
    s=request.form
    if s['iterations']!='':
      iterations=int(s['iterations'])
    if s['perplexity']!='':
      perplexity=int(s['perplexity'])
    # return render_template("inputfront.html",data1=None,mndist=mndist,neighbours=neighbours)
    if file and allowed_file(file.filename):
    #            filename = secure_filename(file.filename)
      filename = file.filename
      file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

      filepath=os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
      time1=time.time()
      data1=sktsne.reduceDim(filepath,Perplexity=perplexity,iterations=iterations)
      timeTaken=round(time.time()-time1,3);
      os.remove(filepath)
      return render_template("tsne.html",data1={"data":data1},timeTaken=timeTaken)
  return render_template("tsne.html",data1=None)



# run the application
if __name__ == "__main__":
    app.run(debug=True)
