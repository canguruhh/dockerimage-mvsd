FROM ubuntu

RUN apt-get update && apt-get install -y unzip

# Add application files
COPY ../mvs /var/mvs

WORKDIR /var/mvs

RUN sh /var/mvs/mvs-install.sh
ADD ../mvs.conf /root/.metaverse/mvs-test.conf

EXPOSE 8820

CMD [  "sh", "-c", "/var/mvs/mvsd -t"]

