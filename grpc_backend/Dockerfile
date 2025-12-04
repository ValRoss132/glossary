FROM python:3.11-slim

WORKDIR /usr/src/glossary

ENV PYTHONPATH=/usr/src/glossary:$PYTHONPATH

COPY grpc_backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY grpc_backend/app ./app
COPY grpc_backend/proto ./proto

COPY common ./common
COPY data ./data

EXPOSE 6000

CMD ["python", "app/server.py"]