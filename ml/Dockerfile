FROM python:3.7
WORKDIR /code
ENV FLASK_APP=ml/driver.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apt-get update
RUN apt-get -y install musl-dev gcc gfortran wget libfreetype6-dev libpng-dev libopenblas-dev libffi-dev libssl-dev
RUN pip install deeppavlov flask transformers torch
COPY dataset.json dataset.json
COPY dumb_model/rubert_sentence_embedder.json dumb_model/rubert_sentence_embedder.json
EXPOSE 5000
COPY . .
CMD ["flask", "run"]