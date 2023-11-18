from base64 import urlsafe_b64decode
from itertools import permutations
from string import ascii_letters, digits

from Crypto.Cipher import DES
from Crypto.Util.Padding import pad, unpad


class KeyLengthException(Exception):
    '''Raised when the key length given is not equal to 8'''
    pass


class Crypto:
    des = None

    def __init__(self, key: str):
        if len(key) != 8:
            raise KeyLengthException
        key = key.encode()
        Crypto.des = DES.new(key, DES.MODE_ECB)

    @staticmethod
    def encrypt(plain_text: str):
        plain_text = plain_text.encode()
        return Crypto.des.encrypt(pad(plain_text, 8))

    @staticmethod
    def decrypt(cipher_text: bytes):
        return unpad(Crypto.des.decrypt(cipher_text), 8).decode()


def crack(first_4: str, plain_text: str, encrypted: bytes, to_decrypt: bytes):
    chars = ascii_letters + digits
    for j in set(permutations(chars, 4)):
        key = first_4 + "".join(j)
        Crypto(key)
        if Crypto.encrypt(plain_text) == encrypted:
            print("KEY:", key)
            print(Crypto.decrypt(to_decrypt))
            return Crypto.decrypt(to_decrypt)


if __name__ == "__main__":
    base64_encrypted = "tBHmiyi_Pps="
    base64_to_decrypt = "F9nUpEt33e44UvgxvYyPqA=="

    first_4 = "Y0UC"
    plain_text = "asdf1@A"
    encrypted = urlsafe_b64decode(base64_encrypted)
    to_decrypt = urlsafe_b64decode(base64_to_decrypt)
    crack(first_4, plain_text, encrypted, to_decrypt)