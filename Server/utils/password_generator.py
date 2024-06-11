import string
import random

def generate_password(length=12, use_special_chars=False):
    chars = string.ascii_letters + string.digits
    if use_special_chars:
        chars += string.punctuation
    password = ''.join(random.choice(chars) for _ in range(length))
    return password