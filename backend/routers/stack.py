from fastapi import APIRouter, HTTPException
from schemas.dto.stack import StackCreateDto
from tortoise.exceptions import DoesNotExist
from services.stack import StackService
from typing import Optional


router = APIRouter()


@router.get('/')
async def get_all():
    try:
        return await StackService.all()
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))


@router.post('/', status_code=201)
async def create(dto: StackCreateDto, work_id: Optional[str] = None):
    try:
        await StackService.create(work_id=work_id, dto=dto)
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))


@router.delete('/{id}', status_code=204)
async def delete(id: str):
    try:
        await StackService.delete(id)
    except DoesNotExist as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))
