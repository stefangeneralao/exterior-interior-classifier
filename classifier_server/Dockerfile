FROM tensorflow/tensorflow:1.14.0-py3
WORKDIR /usr/src/app
COPY . .
RUN pip3 install -r requirements.txt
EXPOSE 5000
CMD ["python3", "server.py"]
