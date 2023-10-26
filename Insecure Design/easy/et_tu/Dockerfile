FROM python:3.11-alpine

WORKDIR /et_tu

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ENV FLAG_INTERMEDIATE=Y0UCl053 FLAG=NULL{'Y4Y_Y0U_W0N'}

EXPOSE 2916

COPY . .

CMD [ "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "2916" ]