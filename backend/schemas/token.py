from pydantic import BaseModel
from .user import UserSchema


class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = 'bearer'


class TokenWithDataSchema(BaseModel):
    tokens: TokenSchema
    user: UserSchema
