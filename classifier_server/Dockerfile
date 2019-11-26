FROM python:3.5-alpine
WORKDIR /usr/src/app
COPY . .
RUN pip install --upgrade https://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-1.14.0-py3-none-any.whl
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["npm", "start"]