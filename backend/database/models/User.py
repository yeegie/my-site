from tortoise import Model, fields
from .dataclasses import UserType
from schemas.user import UserSchema

import random

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Model):
    username = fields.CharField(max_length=64, default=f'user-{random.randrange(0,9999)}', unique=True)
    email = fields.CharField(max_length=255, unique=True)
    hashed_password = fields.CharField(max_length=128)
    type = fields.CharField(max_length=16, default=UserType.user, validators=[UserType.validator])

    refresh_token = fields.TextField(null=True)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.hashed_password)
    
    @classmethod
    def create_password(cls, password: str) -> str:
        return pwd_context.hash(password)

    async def to_schema(self) -> UserSchema:
        return UserSchema(
            id=self.id,
            username=self.username,
            email=self.email,
            hashed_password=self.hashed_password,
            type=self.type,
            refresh_token=self.refresh_token,
        )