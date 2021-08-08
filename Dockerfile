FROM tensorflow/tensorflow:latest

# manually install keras, bottle and pillow
RUN pip install -U \
    keras \
    bottle \
    pillow

# CMD ["python", "serverscript.py"]

EXPOSE 9004

WORKDIR /server/

# docker build .
# docker run --rm -d -v $(pwd):/server -p 9004:9004 [IMAGE]