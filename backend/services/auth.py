from schemas.dto.user import UserCreateDto

from schemas.auth import AuthSchema
from schemas.token import TokenSchema, TokenWithDataSchema

from database.models import User
from tortoise.exceptions import DoesNotExist, IntegrityError

from utils.jwt import JWT
from jose import JWTError

from loguru import logger


class AuthService:
    @staticmethod
    async def register(dto: UserCreateDto):
        '''
        ### Register new User without tokens.
        '''
        user = await User.get_or_none(email=dto.email)
        if user is not None: raise IntegrityError(f'Email {dto.email} already exists.')

        user = await User.create(
            username=dto.username,
            email=dto.email,
            hashed_password=User.create_password(dto.password),
            type=dto.type,  # WARNING
        )

        return await user.to_schema()
    
    @staticmethod
    async def login(email: str, password: str) -> TokenWithDataSchema:
        '''
        ### Email and password pair check.
        '''
        user = await User.get_or_none(email=email)
        if user is None: raise DoesNotExist(f'User with email {email} does not exists.')
        if user.verify_password(password):
            tokens = await JWT.create_tokens(user.id)

            user.refresh_token = tokens.refresh_token
            await user.save()

            return TokenWithDataSchema(
                tokens=tokens,
                user=await user.to_schema()
            )
        else:
            raise ValueError('Email or password is incorrect.')

    @staticmethod
    async def refresh(refresh_token: str) -> TokenWithDataSchema:  # НЕТУ ОБНОВЛЕНИЯ В USER.REFRESH_TOKEN
        '''
        ### Refresh access_token by refresh_token.

        args:
        * refresh_token: str

        return AuthSchema(access_token, refresh_token) 
        '''
        try:
            data = await JWT.verify_token(refresh_token)
            logger.debug(data)
        except JWTError as ex:
            raise JWTError(str(ex))
        
        return TokenWithDataSchema(
            tokens=TokenSchema(
                access_token=await JWT.create_access_token(data),
                refresh_token=refresh_token,
            ),
            user=await (await User.get(data)).to_schema()
        )
    
        # Recreate refresh token
        # tokens = JWT.create_tokens(data)
        # return TokenSchema(
        #     access_token=tokens.access_token,
        #     refresh_token=tokens.refresh_token,
        # )

    @staticmethod
    async def check(access_token: str):
        '''
        ### Check access_token
        
        If valid: return data
        If token invalid: raise
        '''
        try:
            return await JWT.verify_token(access_token)
        except JWTError as ex:
            raise JWTError(str(ex))
        
    @staticmethod
    async def decode(token: str):
        '''
        ### Decode JWT token.
        '''
        try:
            return await JWT.decode(token)
        except Exception as ex:
            raise Exception(str(ex))
