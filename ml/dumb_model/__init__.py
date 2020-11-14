from deeppavlov.core.common.file import read_json
from deeppavlov import build_model, configs
import json
from scipy.spatial.distance import cosine


DUMB_MODEL_CONFIG_PATH = 'dumb_model/rubert_sentence_embedder.json'

class DumbModel:
    def __init__(self, texts):
        self.m = build_model(DUMB_MODEL_CONFIG_PATH)
        self.sent_max_embs, _, _ = self.m(texts)
        
    def embed(self, text):
        sent_max_embs, _, _ = self.m([text])
        return sent_max_embs[0]
    
    def rank(self, text, top_n=5):
        emb = self.embed(text)
        return sorted([(i, cosine(emb, e)) for i, e in enumerate(self.sent_max_embs)], key=lambda e: e[1])[:top_n]
