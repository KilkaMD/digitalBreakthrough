import json
from dumb_model import DumbModel

with open('dataset.json', 'r') as file:
    articles = json.load(file)

texts = [' '.join(a['content'].split()[:250]) for a in articles]
dm = DumbModel(texts)

q = input('Введите вопрос')
print(articles[dm.rank(q, 1)[0]])