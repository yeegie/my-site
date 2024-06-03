from pydantic import BaseModel
from .user import UserSchema
from .token import TokenSchema


class AuthSchema(BaseModel):
    user: UserSchema
    tokens: TokenSchema
