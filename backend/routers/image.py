from fastapi import APIRouter, HTTPException, File, UploadFile

from services.image import ImageService

from database.models.Image import Image
from tortoise.exceptions import DoesNotExist
from utils.exceptions import FileNotSent

from typing import Optional


router = APIRouter()


@router.get('/')
async def get_all():
    try:
        return await ImageService.all()
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))
    

@router.get('/{file_name}')
async def get_image(file_name: str):
    try:
        return await ImageService.get(file_name)
    except FileNotFoundError as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))


@router.post('/upload', status_code=201)
async def uplaod_work_pic(work_id: Optional[str] = None, file: UploadFile = File(...)):
    try:
        return await ImageService.upload(work_id=work_id, file=file)
    except FileNotSent as ex:
        raise HTTPException(400, detail=str(ex))
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))
    finally:
        file.file.close()


@router.delete('/{id}', status_code=204)
async def delete_work_pic(id: str):
    try:
        await ImageService.delete(id)
    except DoesNotExist as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))
