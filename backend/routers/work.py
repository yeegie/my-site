from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from schemas.work import WorkSchema
from schemas.dto.work import WorkCreateDto

from tortoise.exceptions import DoesNotExist, ValidationError

from services.work import WorkService

from loguru import logger

from typing import Optional, Annotated


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')


@router.post('/', status_code=201)
async def create(dto: WorkCreateDto):
    try:
        await WorkService.create(dto)
    except Exception as ex:
        logger.error(str(ex))


@router.patch('/{id}')
async def update(id: str, user_data):
    pass


@router.get('/')
async def get_all_avaiable():
    try:
        works = await WorkService.get_all()
        return works
    except Exception as ex:
        logger.error(f'[500] {str(ex)}')
        raise HTTPException(500, detail=str(ex))


@router.get('/all')
async def get_all(access_token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        works = await WorkService.get_all(show_all=True)
        return works
    except Exception as ex:
        logger.error(f'[500] {str(ex)}')
        raise HTTPException(500, detail=str(ex))


@router.get('/{id}')
async def get(id: str):
    '''Get Work by pk'''
    try:
        user = await WorkService.get(id)
        return user
    except DoesNotExist as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        logger.error(f'[500] {str(ex)}')
        raise HTTPException(500, detail=str(ex))


@router.delete('/{id}', status_code=204)
async def delete(id: str):
    try:
        await WorkService.delete(id)
    except DoesNotExist as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        logger.error(f'[500] {str(ex)}')
        raise HTTPException(500, detail=str(ex))
    

@router.post('/toggle/{id}')
async def toggle(id: str):
    try:
        return await WorkService.toggle(id)
    except DoesNotExist as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        logger.error(f'[500] {str(ex)}')
        raise HTTPException(500, detail=str(ex))
