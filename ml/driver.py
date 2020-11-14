# -*- coding: utf-8 -*-

import json
from flask import Flask, request
import numpy as np
from dumb_model import DumbModel


app = Flask('TylkoJedno')


with open('ml/dataset.json', 'r') as file:
    articles = json.load(file)

if 'embedding' in articles[0].keys():
    embeddings = np.array([np.array(a['embedding']) for a in articles])
    dm = DumbModel(embeddings=embeddings)
else:
    texts = [' '.join(a['content'].split()[:250]) for a in articles]
    dm = DumbModel(texts=texts)
    for i, a in enumerate(articles):
        a['embedding'] = dm.sent_max_embs[i].tolist()
    with open('ml/dataset.json', 'w') as file:
        json.dump(articles, file)

@app.route('/ask')
def ask():
    q = request.args.get('question')
    print(type(q))
    print(q)
    answer = articles[dm.rank(q, 1)[0]]['content']
    print(answer)
    return answer