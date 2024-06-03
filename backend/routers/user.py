from fastapi import APIRouter, HTTPException
from tortoise.exceptions import DoesNotExist

from schemas.user import UserSchema
from schemas.dto.user import UserCreateDto

from services.user import UserService

from loguru import logger


router = APIRouter()


# @router.post('/', status_code=201)
# async def create(dto: UserCreateDto) -> UserSchema:
#     try:
#         return await UserService.create(dto)
#     except Exception as ex:
#         logger.error(f'[500] {str(ex)}')
#         raise HTTPException(500, detail=str(ex))


@router.get('/{id}')
async def get(id: int):
    try:
        user = await UserService.get(id)
    except DoesNotExist as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        logger.error(f'[500] {str(ex)}')
        raise HTTPException(500, detail=str(ex))


@router.get('/')
async def all():
    try:
        return await UserService.all()
    except Exception as ex:
        logger.error(f'[500] {str(ex)}')
        raise HTTPException(500, detail=str(ex))