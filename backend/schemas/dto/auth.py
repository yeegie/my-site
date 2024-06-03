from pydantic import BaseModel, EmailStr, constr


class AuthDto(BaseModel):
    username: str
    password: str = constr(min_length=6, max_length=32)
