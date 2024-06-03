from pydantic import BaseModel, EmailStr, constr
from typing import Optional


class UserSchema(BaseModel):
    id: int
    username: str
    email: EmailStr
    hashed_password: str = constr(min_length=6, max_length=32)
    type: str
    refresh_token: Optional[str] = None
