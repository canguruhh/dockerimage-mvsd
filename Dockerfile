FROM ubuntu

# Add application files
COPY mvs /var/mvs

RUN useradd -m -s /bin/bash mvs
USER mvs

WORKDIR /var/mvs

RUN sh /var/mvs/mvs-install.sh
ADD mvs.conf /home/mvs/.metaverse/mvs.conf
ADD mvs.conf /home/mvs/.metaverse/mvs-test.conf

EXPOSE 8820

CMD [  "sh", "-c", "/var/mvs/mvsd ${ENVIRONMENT}"]

