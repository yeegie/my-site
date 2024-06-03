from database.models import Work

from schemas.work import WorkSchema
from schemas.dto.work import WorkCreateDto

from typing import List, Optional

from tortoise.exceptions import DoesNotExist


class WorkService:
    prefetch_list = ['category', 'stack', 'image', 'url']

    @staticmethod
    async def create(dto: WorkCreateDto) -> None:
        '''### Create Work instance'''
        work = await Work.create(
            title=dto.title,
            description_short=dto.description_short,
            description_full=dto.description_full,
            category=dto.category,
            stack=dto.stack,
            image=dto.image,
            url=dto.url,
            is_active=dto.is_active,
        )


    @staticmethod
    async def update():
        pass


    @classmethod
    async def get_all(cls, show_all: Optional[bool] = False) -> List[WorkSchema]:
        '''### Get all Work's'''
        if show_all:
            works = await Work.all().prefetch_related(*cls.prefetch_list)
        else:
            works = await Work.filter(is_active=True).prefetch_related(*cls.prefetch_list)
        
        return [await works.to_schema() for works in works]


    @staticmethod
    async def get(id: str) -> WorkSchema:
        '''### Get Work by pk'''
        work = await Work.get_or_none(id=int(id))
        if work is None:
            raise DoesNotExist(f'pk={id} | Work not found.')
        
        return await work.to_schema()
    

    @staticmethod
    async def delete(id: str) -> None:
        '''### Delete Work by pk'''
        work = await Work.get_or_none(id=id)
        if work is None: raise DoesNotExist(f'pk={id} | Work not found.')
        work.delete()


    @staticmethod
    async def toggle(id: str) -> WorkSchema:
        '''### Toggle active Work by pk'''
        work = await Work.get_or_none(id=id)
        if work is None: raise DoesNotExist(f'pk={id} | Work not found.')
        work.is_active = not work.is_active
        await work.save()

        return await work.to_schema()