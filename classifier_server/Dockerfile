FROM tensorflow/tensorflow:1.14.0-py3
WORKDIR /usr/src/app
COPY . .
RUN pip3 install -r requirements.txt
EXPOSE 3002
CMD ["python3", "server.py"]