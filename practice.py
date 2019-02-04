
from flask import Flask  
from flask import render_template,url_for,request,redirect
import numpy as np
import simplejson as json

app = Flask(__name__)


# print(npArray.shape)

@app.route('/',methods=['POST','GET'])
def addition():
	a=np.array([[1,2],[2,4],[3,2],[7,4],[5,6],[6,8],[8,2],[4,6]],float)
	txt=["h1","h2","h3","h4","h5","h6","h7","h8"]
	flist=[]
	for i in range(len(a)):
		l=[]
		l.append(float(a[i][0]))
		l.append(float(a[i][1]))
		l.append(txt[i])
		flist.append(l)

	data1 = json.dumps(flist)   
	return render_template("practicegraph.html",data1={"data":data1})

if __name__ == "__main__":
    app.run(debug=True)



    # https://bl.ocks.org/aleereza/d2be3d62a09360a770b79f4e5527eea8
    # https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
