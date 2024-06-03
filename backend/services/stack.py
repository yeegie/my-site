from typing import List, Optional
from tortoise.exceptions import DoesNotExist

from schemas.stack import StackSchema
from schemas.dto.stack import StackCreateDto

from database.models.Stack import Stack
from database.models.Work import Work

from loguru import logger


class StackService:
    @staticmethod
    async def all() -> List[StackSchema]:
        '''### Get all Stacks'''
        stacks = await Stack.all()
        
        return [await stacks.to_schema() for stacks in stacks]


    @staticmethod
    async def create(dto: StackCreateDto, work_id: Optional[str] = None) -> StackSchema:
        stack = await Stack.create(
            title=dto.title,
            gradient=dto.gradient,
        )

        if work_id is not None:
            work = await Work.get_or_none(id=work_id)
            if work is None: raise DoesNotExist(f'pk={work_id} | Work not found.')

            stack.work = work
            await stack.save()

        return await stack.to_schema()
    

    async def delete(id: int) -> None:
        stack = await Stack.get_or_none(id=id)
        if stack is None: raise DoesNotExist(f'pk={id} | Stack not found.')
        await stack.delete()

        logger.info(f'[{id}] Stack - DELETE')