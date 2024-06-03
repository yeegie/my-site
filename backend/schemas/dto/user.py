from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from database.models.dataclasses import UserType

import random


class UserCreateDto(BaseModel):
    username: Optional[str] = f'user-{random.randrange(0,9999)}'
    email: EmailStr
    password: str = constr(min_length=6, max_length=32)
    type: Optional[str] = UserType.user
    refresh_token: Optional[str] = None
