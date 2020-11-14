# -*- coding: utf-8 -*-

import json
import numpy as np
from dumb_model import DumbModel

with open('dataset.json', 'r') as file:
    articles = json.load(file)

if 'embedding' in articles[0].keys():
    embeddings = np.array([np.array(a['embedding']) for a in articles])
    dm = DumbModel(embeddings=embeddings)
else:
    texts = [' '.join(a['content'].split()[:250]) for a in articles]
    dm = DumbModel(texts=texts)
    for i, a in enumerate(articles):
        a['embedding'] = dm.sent_max_embs[i].tolist()
    with open('dataset.json', 'w') as file:
        json.dump(articles, file)

while(True):
    q = input('Введите вопрос\n')
    index = dm.rank(q, 1)[0]
    print(index)
    fit = articles[index]
    print(f'[{index}] {fit["content"]}')