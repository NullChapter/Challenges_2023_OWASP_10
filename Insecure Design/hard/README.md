# OWASP Top 10 CTF Challenge - Insecure Design (Hard)
Description of the hard challenge goes here.

# [et_tu](./et_tu)
_You as well, Brutus?_

## Flag Format
Flag format for hard challenge.  
Flag should be set as an _environment variable_: __'FLAG'__ _("NULL{Y4Y_Y0U_W0N}")_

## Setup
### Manual

- Set environment variable `'FLAG_INTERMEDIATE'` to `'Y0UCl053'` or any other 8 byte long string.
- Run the following commands with cwd as `Insecure Design/easy/et_tu` (`cd ./Insecure Design/easy/et_tu`)
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    uvicorn src.main:app --host 0.0.0.0 --port 2916 
    ```
- The port for the app wil be exposed at http://localhost:2916

