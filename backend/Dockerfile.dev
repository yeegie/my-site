FROM python:3.11

WORKDIR /app

COPY /backend/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt && \
    pip install envparse

COPY /backend/ ./

CMD ["python", "main.py"]