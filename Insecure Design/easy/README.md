# OWASP Top 10 CTF Challenge - Insecure Design (Easy)

# [et_tu](./et_tu)
_You as well, Brutus?_

## Flag Format
Flag format for easy challenge.  
Flag should be set as an _environment variable_: __'FLAG'__

## Setup

### Manual

- Set environment variable `'FLAG_INTERMEDIATE'` to `'Y0UCl053'` or any other 8 byte long string.
- Run the following commands with cwd as `Insecure Design/easy/et_tu` (`cd ./Insecure Design/easy/et_tu`)
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    cd ./src
    uvicorn main:app --port 2916 
    ```
- The port for the app wil be exposed at http://localhost:2916

