from sklearn.manifold import TSNE            #tsne algorithm from scikit learn for reducing dumensions
from gensim.models import KeyedVectors
import numpy as np
import json

def reduceDim(filename):
	new_word_vectors = KeyedVectors.load(filename)
	txt=[]
	for num in range(len(new_word_vectors.index2entity)):
		txt.append(new_word_vectors.index2entity[num])
	x=new_word_vectors[new_word_vectors.index2entity]
	x_embeded=TSNE(n_components=2,perplexity=25,n_iter=2500).fit_transform(x)  #applying tsne algorithm

	flist=[]
	for i in range(len(x_embeded)):
		l=[]
		l.append(float(x_embeded[i][0]))
		l.append(float(x_embeded[i][1]))
		l.append(txt[i])
		flist.append(l)

	data1 = json.dumps(flist)           #converting in json format
	return data1
