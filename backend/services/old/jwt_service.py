from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta

from typing import Optional

from backend.config import Security

from schemas.token import TokenSchema

from database.models import User


class JWTService:
    SECRET_KEY = Security.secret
    ALGORITHM = 'HS256'
    ACCESS_EXP = Security.access_exp_minutes
    REFRESH_EXP = Security.refresh_exp_days

    @classmethod
    def create_access_token(cls, user_id: int, expire_time: Optional[int] = ACCESS_EXP) -> str:
        '''Create access token'''
        expire = (datetime.now() + timedelta(minutes=expire_time)).strftime('%Y%m%d%H%M%S')

        data = {
            'user_id': user_id,
            'exp': expire,
        }

        return jwt.encode(data, cls.SECRET_KEY, algorithm=cls.ALGORITHM)
    

    @classmethod
    def create_refresh_token(cls, user_id: int, expire_time: Optional[int] = REFRESH_EXP) -> str:
        '''Create refresh token'''
        expire = (datetime.now() + timedelta(days=expire_time)).strftime('%Y%m%d%H%M%S')

        data = {
            'user_id': user_id,
            'exp': expire,
        }
        
        return jwt.encode(data, cls.SECRET_KEY, algorithm=cls.ALGORITHM)
    

    @classmethod
    async def create_tokens(cls, user_id: str) -> TokenSchema:
        return TokenSchema(
            access_token=cls.create_access_token(user_id),
            refresh_token=cls.create_refresh_token(user_id),
        )
    

    @classmethod
    def verify_token(cls, token: str) -> int:
        '''Verify token, return user_id'''
        payload = jwt.decode(token, cls.SECRET_KEY, algorithms=cls.ALGORITHM)
        expire = datetime.strptime(payload['exp'], '%Y%m%d%H%M%S')
        user_id = payload['user_id']

        if user_id is None:
            raise JWTError('Invalid token')

        if expire < datetime.now():
            raise JWTError('Token expired')
        
        return user_id
