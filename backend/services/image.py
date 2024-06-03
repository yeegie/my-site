from fastapi import UploadFile
from fastapi.responses import FileResponse
from uuid import uuid4
import os

from typing import List, Optional

from tortoise.exceptions import DoesNotExist

from database.models.Image import Image
from database.models.Work import Work

from schemas.image import ImageSchema
from loguru import logger

from utils.exceptions import FileNotSent


class ImageService:
    _avaiable_image_types = [
        'jpg',
        'jpeg',
        'png',
        'webp',
    ]

    async def all() -> List[ImageSchema]:
        '''### Get all Images'''
        image = await Image.all().prefetch_related('work')
        
        return [await image.to_schema() for image in image]
    

    async def get(file_name: str) -> FileResponse:
        file_path = os.path.join('uploads/', file_name)
        if not os.path.isfile(file_path): raise FileNotFoundError(f'File {file_path} not found')
        return FileResponse(file_path)


    @classmethod
    async def upload(cls, file: UploadFile, work_id: Optional[str] = None) -> ImageSchema:
        if not file: raise FileNotSent()

        contents = file.file.read()

        file_ext = file.filename.split('.')[1].lower()
        if file_ext not in cls._avaiable_image_types: raise ValueError(f'File must be {cls._avaiable_image_types}')

        file_name = f'{file.filename.split(".")[0]}-{str(uuid4()).split("-")[0]}.{file_ext}'.lower()
        save_path = f'uploads/{file_name}'

        with open(save_path, 'wb') as file:
            file.write(contents)


        image = await Image.create(
            file_name=file_name,
            full_path=f'image/{file_name}',
        )

        if work_id is not None:
            work = await Work.get_or_none(id=work_id)
            if work is None: raise DoesNotExist(f'pk={work_id} | Work not found.')

            image.work = work
            await image.save()

        return await image.to_schema()
    

    async def delete(id: int) -> None:
        image = await Image.get_or_none(id=id)
        if image is None: raise DoesNotExist(f'pk={id} | Image record not found.')
        await image.delete()

        file_exists = os.path.isfile(image.full_path)
        if file_exists is False:
            logger.warning(f'Image record deleted but file not found to path {image.full_path}')
            return None
            # raise FileNotFoundError(f'No such file to path {image.full_path}')
        os.remove(image.full_path)

        logger.info(f'DELETE {image.full_path}')