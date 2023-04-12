FROM python:3.9

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

RUN pip install django django-cors-headers djangorestframework gunicorn

COPY . .

EXPOSE 8000

CMD ["gunicorn", "main.wsgi:application", "0.0.0.0:8000"]