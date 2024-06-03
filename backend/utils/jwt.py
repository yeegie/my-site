from backend.config import Security
from jose import JWTError, jwt
from schemas.token import TokenSchema
from schemas.user import UserSchema
from datetime import datetime, timedelta
from typing import Optional, Union

from loguru import logger


class JWT:
    '''
    ### JWT utils.

    A class used to create and verifing jwt tokens - access, refresh.
    '''
    SECRET_KEY = Security.secret
    ALGORITHM = 'HS256'
    ACCESS_EXP = Security.access_exp_minutes
    REFRESH_EXP = Security.refresh_exp_days
    EXPIRE_FORMAT = '%Y%m%d%H%M%S'

    @classmethod
    async def create_access_token(cls, data, *, expire: Optional[int] = ACCESS_EXP) -> str:
        '''
        ### Create access jwt token, from data.

        args:
        * data - any data, for example user_id, object, schema.
        * expire: Optional[int] - expire time in minutes.
        '''
        expire_time = (datetime.now() + timedelta(minutes=expire)).strftime(cls.EXPIRE_FORMAT)

        payload = {
            'data': data,
            'exp': expire_time,
        }

        access_token = jwt.encode(
            payload,
            cls.SECRET_KEY,
            algorithm=cls.ALGORITHM
        )

        return access_token

    @classmethod
    async def create_refresh_token(cls, data, *, expire: Optional[int] = ACCESS_EXP) -> str:
        '''
        ### Create refresh jwt token, from data.

        args:
        * data - any data, for example user_id, object, schema.
        * expire: Optional[int] - expire time in days.
        '''
        expire_time = (datetime.now() + timedelta(days=expire)).strftime(cls.EXPIRE_FORMAT)

        payload = {
            'data': data,
            'exp': expire_time,
        }

        refresh_token = jwt.encode(
            payload,
            cls.SECRET_KEY,
            algorithm=cls.ALGORITHM
        )

        return refresh_token

    @classmethod
    async def create_tokens(cls, data, access_expire: Optional[int] = ACCESS_EXP, refresh_expire: Optional[int] = REFRESH_EXP) -> TokenSchema:
        '''
        ### Create a pair - access and refresh tokens.

        args:
        * data - any data, for example user_id, object, schema.
        * access_expire: Optional[int] - expire time in minutes.
        * refresh_expire: Optional[int] - expire time in days.

        return: TokenSchema
        '''
        tokens = TokenSchema(
            access_token=await cls.create_access_token(data, expire=access_expire),
            refresh_token=await cls.create_refresh_token(data, expire=refresh_expire),
        )

        return tokens

    @classmethod
    async def verify_token(cls, token: str) -> Union[dict, str]:
        '''
        ### Verify token

        If valid: return data
        If token invalid: raise
        '''
        try:
            payload = jwt.decode(token, cls.SECRET_KEY, algorithms=cls.ALGORITHM)

            expire = datetime.strptime(payload['exp'], "%Y%m%d%H%M%S")
            data = payload.get('user')

            if expire < datetime.now():
                raise JWTError('Token expired.')
            
            # EXAMPLE {'data': 1, 'exp': '20240530200551'}
            # if data is None:
            #     raise JWTError('Invalid token.')

            return data
        except JWTError as e:
            raise JWTError(f"Token verification failed: {str(e)}")
        
    @classmethod
    async def decode(cls, token: str) -> dict:
        '''
        ### Decode JWT token.
        '''
        payload = jwt.decode(token, cls.SECRET_KEY, algorithms=cls.ALGORITHM)

        return {
            'data': payload['data'],
            'exp': datetime.strptime(payload['exp'], "%Y%m%d%H%M%S"),
        }
