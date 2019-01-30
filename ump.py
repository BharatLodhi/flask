import umap
from gensim.models import KeyedVectors
import numpy as np
import json

def reduceDim(filename):
	new_word_vectors = KeyedVectors.load(filename)                                        #loading vectors from vector file
	txt=[]
	for num in range(len(new_word_vectors.index2entity)):
		txt.append(new_word_vectors.index2entity[num])
	x=new_word_vectors[new_word_vectors.index2entity]
	x_embeded=umap.UMAP(n_neighbors=5,min_dist=0.03,metric='correlation').fit_transform(x)  #applying umap algorithm for reducing dimension

	flist=[]
	for i in range(len(x_embeded)):
		l=[]
		l.append(float(x_embeded[i][0]))
		l.append(float(x_embeded[i][1]))
		l.append(txt[i])
		flist.append(l)

	data1 = json.dumps(flist)           #converting in json format
	return data1
