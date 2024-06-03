from tortoise import Model, fields
from schemas.work import WorkSchema


class Work(Model):
    id = fields.IntField(pk=True)

    title = fields.CharField(max_length=32)
    description_short = fields.CharField(max_length=128, null=True)
    description_full = fields.TextField(null=True)

    is_active = fields.BooleanField(default=False)


    async def to_schema(self) -> WorkSchema:
        '''### Make tortoise model to pydantic WorkSchema'''
        return WorkSchema(
            id=self.id,
            title=self.title,
            description_short=self.description_short,
            description_full=self.description_full,
            category=[await category.to_schema() for category in await self.category.all()],
            stack=[await stack.to_schema() for stack in await self.stack.all()],
            image=[await image.to_schema() for image in await self.image.all()],
            url=[await url.to_schema() for url in await self.url.all()],
            is_active=self.is_active,
        )
