
import numpy as np
from flask import Flask  
from flask import render_template,url_for,request,redirect
from sklearn.manifold import TSNE
from gensim.models import KeyedVectors
import output
import json

def filehandle(Data):
	data=Data.readlines()
	a=[]
	for line in data:
		b=[float(val) for val in line.split()]
		a.append(np.array(b))
	npArray=np.array(a)
	return npArray

# creates a Flask application, named app
app = Flask(__name__)

# a route where we will display a welcome message via an HTML template
# @app.route('/')
# def hello():  
#     #return "hello brothers"
#     return render_template('base_template.html')

# run the application
@app.route('/add',methods = ['POST', 'GET'])
def addition():
	if request.method == 'POST':
		s = request.files['file']
		# if not request_file:
	 #    	return"No file"

		# file_contents = request_file.stream.read().decode("utf-8")

	 #    # result = transform(file_contents)
		# print(file_contents)

		# ip=request.form
		# data=filehandle(request_file)
		# finalsum=output.addition(data)
		# l=request_file.readlines()
		# nparray = np.array([[4,4],[7,4],[7,4.01],[7,6],[4,2],[1,6]],float)
		# lst=["h1","h2","h3","h4","h5","jk"]
		
		s='data/word2vec_nhtsa_ws-10_vec-300.txt'
		new_word_vectors = KeyedVectors.load(s)
		txt=[]
		for num in range(len(new_word_vectors.index2entity)):
			txt.append(new_word_vectors.index2entity[num])
		x=new_word_vectors[new_word_vectors.index2entity]
		x_embeded=TSNE(n_components=2,perplexity=25,n_iter=2500).fit_transform(x)

		flist=[]
		for i in range(len(x_embeded)):
			l=[]
			l.append(float(x_embeded[i][0]))
			l.append(float(x_embeded[i][1]))
			l.append(txt[i])
			flist.append(l)
		# a=[{"dat":flist}]
		data1 = json.dumps(flist)
		return render_template("inputfront.html",data1={"data":data1})
	return render_template("inputfront.html",data1=None)




if __name__ == "__main__":
    app.run(debug=True)
