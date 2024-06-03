from typing import List, Optional
from tortoise.exceptions import DoesNotExist

from schemas.user import UserSchema
from schemas.dto.user import UserCreateDto

from database.models.User import User

from loguru import logger


class UserService:
    @staticmethod
    async def all() -> List[UserSchema]:
        '''### Get all Users'''
        users = await User.all()
        
        return [await users.to_schema() for users in users]
    

    @staticmethod
    async def get(id: int) -> UserSchema:
        '''### Get User by id'''
        user = await User.get_or_none(id=id)
        if user is None: raise DoesNotExist(f'pk={id} | User not found.')
        return await user.to_schema()


    # @staticmethod
    # async def create(dto: UserCreateDto) -> UserSchema:
    #     user = await User.create(
    #         username=dto.username,
    #         email=dto.email,
    #         hashed_password=User.create_password(dto.password),
    #         type=dto.type,  # WARNING
    #         refresh_token=dto.refresh_token,
    #     )
    

    @staticmethod
    async def delete(id: int) -> None:
        user = await User.get_or_none(id=id)
        if user is None: raise DoesNotExist(f'pk={id} | User not found.')
        await user.delete()

        logger.info(f'[{id}] User - DELETE')